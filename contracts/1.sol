// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "hardhat/console.sol";

contract YieldFarming is Ownable {
    // token addresses
    IERC20 public stakingToken;
    IERC20 public rewardToken1;
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
    
    mapping(address => uint256) public stakedBalances;
    mapping(address => uint256) public lastRewardBlockNumbers;
    mapping(address => uint256) public rewardDebt;
    mapping(address => UserInfo) public userInfo;
    mapping(address => uint256[]) private depositTimestamps;
    mapping(address => uint256[]) private depositAmounts;

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
        lastRewardBlock = block.number;
    }
    function pendingReward(address _user) public view returns (uint256, uint256) {
        uint256 blockNumber = block.number;
        UserInfo storage user = userInfo[_user];
        uint256 _accRewardPerShare = accRewardPerShare;
        uint256 StakingSupply = stakingToken.balanceOf(address(this));
        if (block.number > lastRewardBlock && StakingSupply != 0) {
            uint256 multiplier = blockNumber-lastRewardBlock;
            uint256 Reward1 = multiplier.mul(reward1PerBlock);
            _accRewardPerShare = _accRewardPerShare.add(Reward1.mul(1e12).div(StakingSupply));
        }
        return user.amount.mul(_accRewardPerShare).div(1e12).sub(user.rewardDebt);
    }
}