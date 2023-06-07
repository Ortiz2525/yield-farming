// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract YieldFarming is Ownable {
    IERC20 public stakingToken;
    IERC20 public rewardToken1;
    IERC20 public rewardToken2;
    uint256 public depositFee;
    uint256 public treasuryFee;
    uint256 public totalStaked;
    uint256 public lockPeriod = 30 days;
    uint256 public reward1PerBlock;
    uint256 public reward2PerBlock;
    uint256 public stakingReward;
    mapping(address => uint256) public stakedBalances;
    mapping(address => uint256) public lastRewardBlockNumbers;
    mapping(address => uint256[]) private depositTimestamps;
    mapping(address => uint256[]) private depositAmounts;
    address public treasury;

    event Deposit(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);
    event Claim(address indexed user, uint256 amount);

    constructor(
        IERC20 _stakingToken,
        IERC20 _rewardToken1,
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
        stakingReward = 0;
    }

    function pendingReward(address user) public view returns (uint256, uint256) {
        uint256 blockNumber = block.number;
        uint256 rewardAmount1 = (stakedBalances[user] * (blockNumber - lastRewardBlockNumbers[user]) * reward1PerBlock) / 1e18;
        uint256 rewardAmount2 = (stakedBalances[user] * (blockNumber - lastRewardBlockNumbers[user]) * reward2PerBlock) / 1e18;
        return (rewardAmount1, rewardAmount2);
    }

    function getLockedAmount(address staker) public view returns (uint256) {
        uint256 lockedAmount = 0;
        for (uint256 i = 0; i < depositTimestamps[staker].length; i++) {
            uint256 elapsedTime = block.timestamp - depositTimestamps[staker][i];
            if (elapsedTime < lockPeriod)
                lockedAmount += depositAmounts[staker][i];
        }
        return lockedAmount;
    }

    function deposit(uint256 amount) public {
        require(amount > 0, "Amount must be greater than 0");
        uint256 fee = (amount * depositFee) / 100;
        uint256 netAmount = amount - fee;
        stakingToken.transferFrom(msg.sender, address(this), amount);
        
        stakingToken.transfer(treasury, fee);
        stakedBalances[msg.sender] += netAmount;
        depositTimestamps[msg.sender].push(block.timestamp);
        depositAmounts[msg.sender].push(netAmount);
        totalStaked += netAmount;
        console.log(totalStaked);
        emit Deposit(msg.sender, amount);
    }

    function withdraw(uint256 amount) public {
        require(amount > 0, "Amount must be greater than 0");
        uint256 withdrawalAmount=stakedBalances[msg.sender]-getLockedAmount(msg.sender);
        require(amount <= withdrawalAmount, "Amount must be less than or equal to withdrawal Amount");
        (uint256 reward1, uint256 reward2) = pendingReward(msg.sender);
        
        stakedBalances[msg.sender] -= amount;
        lastRewardBlockNumbers[msg.sender] = block.timestamp;
        totalStaked -= amount;
        stakingToken.transfer(msg.sender, amount);
        rewardToken1.transfer(msg.sender, reward1);
        rewardToken2.transfer(msg.sender, reward2);
        emit Withdraw(msg.sender, amount);
    }

    function claim() public {
        (uint256 reward1, uint256 reward2) = pendingReward(msg.sender);
        console.log(reward1, reward2);
        lastRewardBlockNumbers[msg.sender] = block.timestamp;
        rewardToken1.transfer(msg.sender, reward1);
        rewardToken2.transfer(msg.sender, reward2);
        emit Claim(msg.sender, reward1 + reward2);
    }
     function distributionProfit(uint256 income) public onlyOwner {
        uint256 treasuryReward = income * 10 / 100;
        stakingToken.transfer(treasury, treasuryReward);
        stakingReward += (income - treasuryReward); 
     }

    //  function setTreasury(address _treasury) public onlyOwner {
    //      treasury = _treasury;
    //  }

    // function setDepositFee(uint256 _depositFee) public onlyOwner {
    //     depositFee = _depositFee;
    // }

    // function setTreasuryFee(uint256 _treasuryFee) public onlyOwner {
    //     treasuryFee = _treasuryFee;
    // }

    // function setReward1PerBlock(uint256 _reward1PerBlock) public onlyOwner {
    //     reward1PerBlock = _reward1PerBlock;
    // }

    // function setReward2PerBlock(uint256 _reward2PerBlock) public onlyOwner {
    //     reward2PerBlock = _reward2PerBlock;
    // }

    // function getTreasuryBalance() public view returns (uint256) {
    //     return stakingToken.balanceOf(treasury);
    // }


}