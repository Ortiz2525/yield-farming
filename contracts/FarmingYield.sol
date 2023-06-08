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
    IERC20 public rewardToken2;

    // fee percent
    uint256 public depositFee;
    uint256 public treasuryFee;
    //  total Staked amount
    uint256 public totalStaked;
    // staker can withdraw after locked period
    uint256 public lockPeriod = 30 days;
    //reward tokens created per block
    uint256 public reward1PerBlock;
    uint256 public reward2PerBlock;
    // uint256 public stakingReward;
    // depositFee will be send to treasury address.

    uint256 public lastRewardBlock;
    uint256 public accRewardPerShare;
    address public treasury;
    struct UserInfo {
        uint256 amount; // How many staking tokens the user has provided.
        uint256 rewardDebt; // Reward debt.
    }
    
    mapping(address => UserInfo) public userInfo;
    mapping(address => uint256) public lastBlockTimeStamp;
    
    event Deposit(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);
    event Claim(address indexed user, uint256 amount);

    constructor(
        IERC20 _stakingToken,
        ERC20Mock _rewardToken1,
        IERC20 _rewardToken2,
        uint256 _depositFee,
        uint256 _treasuryFee,
        address _treasury,
        uint256 _reward1PerBlock,
        uint256 _reward2PerBlock
    ) {
        stakingToken = _stakingToken;
        rewardToken1 = _rewardToken1;
        rewardToken2 = _rewardToken2;
        depositFee = _depositFee;
        treasuryFee = _treasuryFee;
        treasury = _treasury;
        reward1PerBlock = _reward1PerBlock;
        reward2PerBlock = _reward2PerBlock;
        lastRewardBlock = block.number;
        accRewardPerShare = 0;
    }
    // function pendingReward(address _user) public view returns (uint256, uint256) {
    //     uint256 blockNumber = block.number;
    //     UserInfo storage user = userInfo[_user];
    //     uint256 _accRewardPerShare = accRewardPerShare;
    //     uint256 StakingSupply = stakingToken.balanceOf(address(this));

    //     if (block.number > lastRewardBlock && StakingSupply != 0) 
    //     {
    //         uint256 multiplier = blockNumber.sub(lastRewardBlock);
    //         uint256 Reward1 =multiplier.mul(reward1PerBlock);
    //         _accRewardPerShare = _accRewardPerShare.add(Reward1.mul(1e12).div(StakingSupply));
    //     }

    //     return (user.amount.mul(_accRewardPerShare).div(1e12).sub(user.rewardDebt),
    //     user.amount.mul(_accRewardPerShare).div(1e12).sub(user.rewardDebt));
    // }

    function pendingReward(address _user) public view returns (uint256) {
        UserInfo storage user = userInfo[_user];
        return user.amount.mul(accRewardPerShare).div(1e12).sub(user.rewardDebt);
    }


    function update() public {
        if (block.number <= lastRewardBlock) return;
        uint256 StakingSupply = stakingToken.balanceOf(address(this));
        if (StakingSupply == 0) {
            lastRewardBlock = block.number;
            return;
        }
        uint256 multiplier = block.number.sub(lastRewardBlock);
        uint256 Reward1 = multiplier.mul(reward1PerBlock);
//        sushi.mint(devaddr, sushiReward.div(10));
        rewardToken1.mint(address(this), Reward1);
        accRewardPerShare = accRewardPerShare.add(Reward1.mul(1e12).div(StakingSupply));
        lastRewardBlock = block.number;
    }

    function deposit(uint256 amount) public {
        require(amount > 0, "Amount must be greater than 0");
        UserInfo storage user = userInfo[msg.sender];
        update();
        if (user.amount > 0) {
            uint256 pending = pendingReward(msg.sender);                
                //send pending amount
            rewardToken1.transfer(msg.sender, pending);
        }
        
        uint256 fee = (amount * depositFee) / 100;
        uint256 netAmount = amount - fee;
        stakingToken.transferFrom(msg.sender, address(this), netAmount);
        stakingToken.transfer(treasury, fee);

        user.amount = user.amount.add(netAmount);
        // depositTimestamps[msg.sender].push(block.timestamp);
        // depositAmounts[msg.sender].push(netAmount);
        user.rewardDebt = user.amount.mul(accRewardPerShare).div(1e12);
        lastBlockTimeStamp[msg.sender]=block.timestamp;
        emit Deposit(msg.sender, netAmount);
    }

    function withdraw(uint256 amount) public {
        require(amount > 0, "Amount must be greater than 0");
        UserInfo storage user = userInfo[msg.sender];
        require((block.timestamp - lastBlockTimeStamp[msg.sender]) >= 30 days ,"lock_period time");
        update();
        uint256 pending = pendingReward(msg.sender);       
            //send pending amount
        rewardToken1.transfer(msg.sender, pending);

        user.amount = user.amount.sub(amount);
        user.rewardDebt = user.amount.mul(accRewardPerShare).div(1e12);
        stakingToken.transfer(msg.sender, amount);
        emit Withdraw(msg.sender, amount);
    }

    function claim() public {
        UserInfo storage user = userInfo[msg.sender];    
        update();
        uint256 pending = pendingReward(msg.sender);       
            //send pending amount
        rewardToken1.transfer(msg.sender, pending);

        user.rewardDebt = user.amount.mul(accRewardPerShare).div(1e12);
        emit Claim(msg.sender, pending);
    }
}