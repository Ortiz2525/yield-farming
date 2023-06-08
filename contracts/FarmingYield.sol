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

    struct UserInfo {
        uint256 amount; // How many staking tokens the user has provided.
        // Reward debt.
        uint256 reward1Debt;
        uint256 reward2Debt;
    }

    mapping(address => UserInfo) public userInfo;
    mapping(address => uint256) public lastBlockTimeStamp;

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
        uint256 _reward2PerBlock
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
    }

    function pendingReward(
        address _user
    ) public view returns (uint256, uint256) {
        UserInfo storage user = userInfo[_user];
        return (
            user.amount.mul(accReward1PerShare).div(1e12).sub(user.reward1Debt),
            user.amount.mul(accReward2PerShare).div(1e12).sub(user.reward2Debt)
        );
    }

    function update() public {
        uint256 StakingSupply = stakingToken.balanceOf(address(this));

        if (StakingSupply == 0) {
            lastRewardBlock = block.number;
            return;
        }
        uint256 multiplier = block.number.sub(lastRewardBlock);
        uint256 Reward1 = multiplier.mul(reward1PerBlock);
        uint256 Reward2 = multiplier.mul(reward2PerBlock);

        rewardToken1.mint(address(this), Reward1);
        rewardToken2.mint(address(this), Reward2);
        accReward1PerShare = accReward1PerShare.add(
            Reward1.mul(1e12).div(StakingSupply)
        );
        accReward2PerShare = accReward2PerShare.add(
            Reward2.mul(1e12).div(StakingSupply)
        );
        lastRewardBlock = block.number;
    }

    function deposit(uint256 amount) public {
        require(amount > 0, "Amount must be greater than 0");
        UserInfo storage user = userInfo[msg.sender];
        update();
        if (user.amount > 0) {
            (uint256 pendingReward1, uint256 pendingReward2) = pendingReward(
                msg.sender
            );
            rewardToken1.transfer(treasury, pendingReward1.mul(10).div(100));
            rewardToken2.transfer(treasury, pendingReward2.mul(10).div(100));
            rewardToken1.transfer(
                msg.sender,
                pendingReward1.sub(pendingReward1.mul(10).div(100))
            );
            rewardToken2.transfer(
                msg.sender,
                pendingReward2.sub(pendingReward2.mul(10).div(100))
            );
        }

        uint256 fee = (amount * depositFee) / 100;
        uint256 netAmount = amount - fee;
        stakingToken.transferFrom(msg.sender, address(this), amount);

        stakingToken.transfer(treasury, fee);

        user.amount = user.amount.add(netAmount);
        user.reward1Debt = user.amount.mul(accReward1PerShare).div(1e12);
        user.reward2Debt = user.amount.mul(accReward2PerShare).div(1e12);
        lastBlockTimeStamp[msg.sender] = block.timestamp;
        emit Deposit(msg.sender, netAmount);
    }

    function withdraw(uint256 amount) public {
        require(amount > 0, "Amount must be greater than 0");
        UserInfo storage user = userInfo[msg.sender];
        require(
            (block.timestamp - lastBlockTimeStamp[msg.sender]) >= 30 days,
            "Can not withdraw in lock_period time"
        );
        update();
        (uint256 pendingReward1, uint256 pendingReward2) = pendingReward(
            msg.sender
        );
        rewardToken1.transfer(treasury, pendingReward1.mul(10).div(100));
        rewardToken2.transfer(treasury, pendingReward2.mul(10).div(100));
        
        rewardToken1.transfer(
            msg.sender,
            pendingReward1.sub(pendingReward1.mul(10).div(100))
        );
        rewardToken2.transfer(
            msg.sender,
            pendingReward2.sub(pendingReward2.mul(10).div(100))
        );

        user.amount = user.amount.sub(amount);
        user.reward1Debt = user.amount.mul(accReward1PerShare).div(1e12);
        user.reward2Debt = user.amount.mul(accReward2PerShare).div(1e12);
        stakingToken.transfer(msg.sender, amount);
        emit Withdraw(msg.sender, amount);
    }

    function claim() public {
        UserInfo storage user = userInfo[msg.sender];
        update();
        (uint256 pendingReward1, uint256 pendingReward2) = pendingReward(
            msg.sender
        );
        //send pending amount
        rewardToken1.transfer(treasury, pendingReward1.mul(10).div(100));
        rewardToken2.transfer(treasury, pendingReward2.mul(10).div(100));
        rewardToken1.transfer(
            msg.sender,
            pendingReward1.sub(pendingReward1.mul(10).div(100))
        );
        rewardToken2.transfer(
            msg.sender,
            pendingReward2.sub(pendingReward2.mul(10).div(100))
        );

        user.reward1Debt = user.amount.mul(accReward1PerShare).div(1e12);
        user.reward2Debt = user.amount.mul(accReward2PerShare).div(1e12);
        emit Claim(msg.sender, pendingReward1, pendingReward2);
    }
}
