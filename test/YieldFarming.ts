import { ethers } from "hardhat";
import { expect } from "chai";
import { Contract, Signer } from "ethers";

describe("FarmingYield", () => {
  let FarmingYield: Contract;
  let ERC20Mock: Contract;
  let stakingToken: Contract;
  let rewardToken1: Contract;
  let rewardToken2: Contract;
  let owner: Signer;
  let addr1: Signer;
  let addr2: Signer;
  let treasury: Signer;

  beforeEach(async () => {
    [owner, addr1, addr2, treasury] = await ethers.getSigners();

    const ERC20MockFactory = await ethers.getContractFactory("ERC20Mock");
    stakingToken = await ERC20MockFactory.deploy("Staking Token", "STK");
    rewardToken1 = await ERC20MockFactory.deploy("Reward Token 1", "RT1");
    rewardToken2 = await ERC20MockFactory.deploy("Reward Token 2", "RT2");

    const FarmingYieldFactory = await ethers.getContractFactory("FarmingYield");
    FarmingYield = await FarmingYieldFactory.deploy(
      stakingToken.address,
      rewardToken1.address,
      rewardToken2.address,
      1, // depositFeePercent
      await treasury.getAddress(), // treasury
      1000, // reward1PerBlock
      2000 // reward2PerBlock
    );
  });

  describe("Deployment", () => {
    it("Should set the correct staking token", async () => {
      expect(await FarmingYield.stakingToken()).to.equal(stakingToken.address);
    });

    it("Should set the correct reward tokens", async () => {
      expect(await FarmingYield.rewardToken1()).to.equal(rewardToken1.address);
      expect(await FarmingYield.rewardToken2()).to.equal(rewardToken2.address);
    });
  });

  describe("Deposit", () => {
    it("Deposit amount should be greater than 0", async() => {
      await expect(FarmingYield.connect(addr1).deposit(0)).to.be.revertedWith("Amount must be greater than 0");
    });

    it("Should deposit staking tokens", async () => {
      // Mint some staking tokens for addr1
      await stakingToken.connect(owner).mint(await addr1.getAddress(), 1000);

      // Approve FarmingYield contract to spend addr1's staking tokens
      await stakingToken.connect(addr1).approve(FarmingYield.address, 1000);

      // Deposit staking tokens
      await FarmingYield.connect(addr1).deposit(1000);

      // Check if the deposit was successful
      const userInfo = await FarmingYield.userInfo(await addr1.getAddress());
      expect(userInfo.amount).to.equal(990); // 1000 - 1% deposit fee
    });
    it("get Reward tokens from deposit", async () => {
      // Mint some staking tokens for addr1
      await stakingToken.connect(owner).mint(await addr1.getAddress(), 2020);
      // Approve FarmingYield contract to spend addr1's staking tokens
      await stakingToken.connect(addr1).approve(FarmingYield.address, 2020);
      // Deposit staking tokens
      await FarmingYield.connect(addr1).deposit(1010);
      
      await ethers.provider.send("evm_increaseTime", [30 * 24 * 60 * 60]);
      await ethers.provider.send("evm_mine",[]);
      //2 blocks are minted

      await FarmingYield.connect(addr1).deposit(1010);
      // Check if the deposit was successful
      const userInfo = await FarmingYield.userInfo(await addr1.getAddress());
      //console.log(await rewardToken1.balanceOf(await addr1.getAddress()));
      
      //amount of rewardtoken1 based on share from staking amount in 90% total reward token.
      await expect (await rewardToken1.balanceOf(await addr1.getAddress())).to.be.equal(ethers.BigNumber.from("1800")); // ({blockpass = 2}*1000)*90/100
      
      //amount of rewardtoken1 in treasure. (10%)
      await expect (await rewardToken1.balanceOf(await treasury.getAddress())).to.be.equal(ethers.BigNumber.from("200"));
      expect(userInfo.amount).to.equal(2000); //  2020 - fee
    });
  });


  describe("Withdraw", () => {
    beforeEach(async () => {
      // Mint some staking tokens for addr1 and deposit them
      await stakingToken.connect(owner).mint(await addr1.getAddress(), 1000);
      await stakingToken.connect(addr1).approve(FarmingYield.address, 1000);
      await FarmingYield.connect(addr1).deposit(1000);
    });
    it("Deposit amount should be greater than 0", async() => {
      await expect(FarmingYield.connect(addr1).withdraw(0)).to.be.revertedWith("Amount must be greater than 0");
    });

    it("Should not withdraw staking tokens in lock period", async () => {
      await expect(FarmingYield.connect(addr1).withdraw(500)).to.be.revertedWith("Can not withdraw in lock_period time");
    });

    it("Should withdraw staking tokens after lock period", async () => {
      // Increase time to pass the lock period
      await ethers.provider.send("evm_increaseTime", [30 * 24 * 60 * 60]);
      await ethers.provider.send("evm_mine",[]);
  
      // Withdraw staking tokens
      await FarmingYield.connect(addr1).withdraw(500);
  
      // Check if the withdraw was successful
      const userInfo = await FarmingYield.userInfo(await addr1.getAddress());
      expect(userInfo.amount).to.equal(490); // 990 - 500
    });
  
    it("Should emit Withdraw event", async () => {
      // Increase time to pass the lock period
      await ethers.provider.send("evm_increaseTime", [30 * 24 * 60 * 60]);
      await ethers.provider.send("evm_mine", []);
  
      // Check if the Withdraw event is emitted
      await expect(FarmingYield.connect(addr1).withdraw(500))
        .to.emit(FarmingYield, "Withdraw")
        .withArgs(await addr1.getAddress(), 500);
    });
  
    // Add more tests for withdraw here
  });
  
  describe("Claim", () => {
    beforeEach(async () => {
      // Mint some staking tokens for addr1 and deposit them
      await stakingToken.connect(owner).mint(await addr1.getAddress(), 1010);
      await stakingToken.connect(addr1).approve(FarmingYield.address, 1010);
      await FarmingYield.connect(addr1).deposit(1010);
    });
  
    it("Should claim pending rewards", async () => {
      // Increase time to generate some rewards
      await ethers.provider.send("evm_increaseTime", [1000]);
      await ethers.provider.send("evm_mine", []);
  
      // Claim rewards
      await FarmingYield.connect(addr1).claim();
  
      // Check if the claim was successful
      const reward1Balance = await rewardToken1.balanceOf(await addr1.getAddress());
      const reward2Balance = await rewardToken2.balanceOf(await addr1.getAddress());
      expect(reward1Balance).to.be.gt(0);
      expect(reward2Balance).to.be.gt(0);
    });
  
    it("Should emit Claim event", async () => {
      // Increase time to generate some rewards
      await ethers.provider.send("evm_increaseTime", [1000]);
      await ethers.provider.send("evm_mine", []);
      await ethers.provider.send("evm_mine", []);
      await ethers.provider.send("evm_mine", []);
      // 4 blocks are minted
        
      // Check if the Claim event is emitted
      await expect(FarmingYield.connect(addr1).claim())
        .to.emit(FarmingYield, "Claim")
       .withArgs(await addr1.getAddress(), 4000, 8000); //blockpass = s4
    });
  });

});