// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "hardhat/console.sol";
import "./ERC20Mock.sol";

contract FarmingYield is Ownable {
    using SafeMath for uint256;
    // token addresses
    IERC20 public stakingToken;
    ERC20Mock public rewardToken1;
    ERC20Mock public rewardToken2;

    // fee percent
    uint256 public depositFee;
    //  total Staked amount
    uint256 public totalStaked;
    // staker can withdraw after locked period
    uint256 public lockPeriod = 30 days;
    //reward tokens created per block
    uint256 public reward1PerBlock;
    uint256 public reward2PerBlock;
    // depositFee will be send to treasury address.
    address public treasury;

    uint256 public lastRewardBlock;
    uint256 public accReward1PerShare;
    uint256 public accReward2PerShare;

    struct FundInfo {
        uint256 amount;
        uint256 timestamps;
    }

    struct UserInfo {
        uint256 amount; // How many staking tokens the user has provided.
        // Reward debt.
        uint256 reward1Debt;
        uint256 reward2Debt;
        FundInfo[] fundInfo;
    }

    mapping(address => UserInfo) public userInfo;
    event Deposit(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);
    event Claim(address indexed user, uint256 amount1, uint256 amount2);

    constructor(
        IERC20 _stakingToken,
        ERC20Mock _rewardToken1,
        ERC20Mock _rewardToken2,
        uint256 _depositFee,
        address _treasury,
        uint256 _reward1PerBlock,
        uint256 _reward2PerBlock,
        uint256 _lockPeriod
    ) {
        stakingToken = _stakingToken;
        rewardToken1 = _rewardToken1;
        rewardToken2 = _rewardToken2;
        depositFee = _depositFee;
        treasury = _treasury;
        reward1PerBlock = _reward1PerBlock;
        reward2PerBlock = _reward2PerBlock;
        lastRewardBlock = block.number;
        accReward1PerShare = 0;
        lockPeriod = _lockPeriod;
    }

    function optimize(address _user) public {
        UserInfo storage user = userInfo[_user];
        uint256 unlockedAmount = 0;
        uint256 lockIndex = user.fundInfo.length;
        if (lockIndex <= 1) return;
        uint256 i;
        for (i = 0; i < user.fundInfo.length; i++) {
            uint256 elapsedTime = block.timestamp - user.fundInfo[i].timestamps;
            if (elapsedTime < lockPeriod) {
                lockIndex = i;
                break;
            } else {
                unlockedAmount += user.fundInfo[i].amount;
            }
        }
        if (lockIndex <= 1) return;
        user.fundInfo[0].amount = unlockedAmount;
        uint256 length = user.fundInfo.length;
        for (i = length - 1; i >= lockIndex; i--) {
            user.fundInfo[i - lockIndex + 1].amount = user.fundInfo[i].amount;
            user.fundInfo[i - lockIndex + 1].timestamps = user
                .fundInfo[i]
                .timestamps;
        }
        for (i = 1; i < lockIndex; i++) user.fundInfo.pop();
    }

    function update() public {
        uint256 stakingSupply = stakingToken.balanceOf(address(this));

        if (stakingSupply == 0) {
            lastRewardBlock = block.number;
            return;
        }
        uint256 multiplier = block.number - lastRewardBlock;
        uint256 reward1 = multiplier * reward1PerBlock;
        uint256 reward2 = multiplier * reward2PerBlock;

        rewardToken1.mint(address(this), reward1);
        rewardToken2.mint(address(this), reward2);
        accReward1PerShare =
            accReward1PerShare +
            (reward1 * 1e12) /
            stakingSupply;
        accReward2PerShare =
            accReward2PerShare +
            (reward2 * 1e12) /
            stakingSupply;
        lastRewardBlock = block.number;
    }

    function deposit(uint256 amount) public {
        require(amount > 0, "Amount must be greater than 0");
        UserInfo storage user = userInfo[msg.sender];
        optimize(msg.sender);

        update();

        if (user.amount > 0) {
            (uint256 pendingReward1, uint256 pendingReward2) = pendingReward(
                msg.sender
            );
            rewardToken1.transfer(treasury, (pendingReward1 * 10) / 100);
            rewardToken2.transfer(treasury, (pendingReward2 * 10) / 100);
            rewardToken1.transfer(
                msg.sender,
                pendingReward1 - (pendingReward1 * 10) / 100
            );
            rewardToken2.transfer(
                msg.sender,
                pendingReward2 - (pendingReward2 * 10) / 100
            );
        }

        uint256 fee = (amount * depositFee) / 100;
        uint256 netAmount = amount - fee;
        stakingToken.transferFrom(msg.sender, address(this), amount);

        stakingToken.transfer(treasury, fee);

        user.amount = user.amount + netAmount;
        user.reward1Debt = (user.amount * accReward1PerShare) / 1e12;
        user.reward2Debt = (user.amount * accReward2PerShare) / 1e12;
        user.fundInfo.push(FundInfo(netAmount, block.timestamp));
        emit Deposit(msg.sender, netAmount);
    }

    function withdraw(uint256 amount) public {
        require(amount > 0, "Amount must be greater than 0");
        UserInfo storage user = userInfo[msg.sender];
        optimize(msg.sender);
        (, uint withdrawableAmount) = getFundInfo(msg.sender);
        require(
            amount <= withdrawableAmount,
            "Amount must be less than withdrawable amount"
        );

        update();
        (uint256 pendingReward1, uint256 pendingReward2) = pendingReward(
            msg.sender
        );
        rewardToken1.transfer(treasury, (pendingReward1 * 10) / 100);
        rewardToken2.transfer(treasury, (pendingReward2 * 10) / 100);
        rewardToken1.transfer(
            msg.sender,
            pendingReward1 - (pendingReward1 * 10) / 100
        );
        rewardToken2.transfer(
            msg.sender,
            pendingReward2 - (pendingReward2 * 10) / 100
        );

        user.amount = user.amount - amount;
        user.reward1Debt = (user.amount * accReward1PerShare) / 1e12;
        user.reward2Debt = (user.amount * accReward2PerShare) / 1e12;
        stakingToken.transfer(msg.sender, amount);
        user.fundInfo[0].amount -= amount;
        emit Withdraw(msg.sender, amount);
    }

    function claim() public {
        UserInfo storage user = userInfo[msg.sender];
        optimize(msg.sender);
        update();
        (uint256 pendingReward1, uint256 pendingReward2) = pendingReward(
            msg.sender
        );
        //send pending amount
        rewardToken1.transfer(treasury, (pendingReward1 * 10) / 100);
        rewardToken2.transfer(treasury, (pendingReward2 * 10) / 100);
        pendingReward1 = pendingReward1 - (pendingReward1 * 10) / 100;
        pendingReward2 = pendingReward2 - (pendingReward2 * 10) / 100;
        rewardToken1.transfer(msg.sender, pendingReward1);
        rewardToken2.transfer(msg.sender, pendingReward2);

        user.reward1Debt = (user.amount * accReward1PerShare) / 1e12;
        user.reward2Debt = (user.amount * accReward2PerShare) / 1e12;
        emit Claim(msg.sender, pendingReward1, pendingReward2);
    }

    function getFundInfo(address _user) public view returns (uint256, uint256) {
        UserInfo storage user = userInfo[_user];
        uint256 lockedAmount = 0;
        for (uint256 i = 0; i < user.fundInfo.length; i++) {
            uint256 elapsedTime = block.timestamp - user.fundInfo[i].timestamps;
            if (elapsedTime < lockPeriod)
                lockedAmount += user.fundInfo[i].amount;
        }
        return (lockedAmount, user.amount - lockedAmount);
    }

    function pendingReward(
        address _user
    ) public view returns (uint256, uint256) {
        UserInfo storage user = userInfo[_user];
        return (
            (user.amount * accReward1PerShare) / 1e12 - user.reward1Debt,
            (user.amount * accReward2PerShare) / 1e12 - user.reward2Debt
        );
    }
}
