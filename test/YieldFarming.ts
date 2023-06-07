import { ethers } from "hardhat";
import { expect } from "chai";
import { Contract, Signer } from "ethers";

describe("YieldFarming", () => {
  let stakingToken: Contract;
  let rewardToken1: Contract;
  let rewardToken2: Contract;
  let yieldFarming: Contract;
  let owner: Signer;
  let user1: Signer;
  let user2: Signer;
  let treasury: Signer;

  beforeEach(async () => {
    const ERC20 = await ethers.getContractFactory("ERC20Mock");
    const YieldFarming = await ethers.getContractFactory("YieldFarming");

    [owner, user1, user2, treasury] = await ethers.getSigners();

    stakingToken = await ERC20.deploy("Staking Token", "STK");
    rewardToken1 = await ERC20.deploy("Reward Token 1", "RWD1");
    rewardToken2 = await ERC20.deploy("Reward Token 2", "RWD2");

    yieldFarming = await YieldFarming.deploy(
      stakingToken.address,
      rewardToken1.address,
      rewardToken2.address,
      1, // depositFee
      1, // treasuryFee
      await treasury.getAddress(),
      100, // reward1PerBlock
      200 // reward2PerBlock
    );

    await stakingToken.mint(await user1.getAddress(), ethers.utils.parseEther("1000"));
    await stakingToken.mint(await user2.getAddress(), ethers.utils.parseEther("1000"));

    await rewardToken1.mint(yieldFarming.address, ethers.utils.parseEther("1000000"));
    await rewardToken2.mint(yieldFarming.address, ethers.utils.parseEther("1000000"));

    await stakingToken.connect(user1).approve(yieldFarming.address, ethers.utils.parseEther("1000"));
    await stakingToken.connect(user2).approve(yieldFarming.address, ethers.utils.parseEther("1000"));
  });

  it("should allow users to deposit and withdraw", async () => {
    await yieldFarming.connect(user1).deposit(ethers.utils.parseEther("100"));
    expect(await stakingToken.balanceOf(await user1.getAddress())).to.equal(ethers.utils.parseEther("900"));

    await ethers.provider.send("evm_increaseTime", [30 * 24 * 60 * 60]); // Increase time by 30 days
    await ethers.provider.send("evm_mine", []);

    await yieldFarming.connect(user1).withdraw(ethers.utils.parseEther("99"));
    expect(await stakingToken.balanceOf(await user1.getAddress())).to.equal(ethers.utils.parseEther("999"));
  });

  it("should distribute rewards correctly", async () => {
    await yieldFarming.connect(user1).deposit(ethers.utils.parseEther("100"));
    await yieldFarming.connect(user2).deposit(ethers.utils.parseEther("200"));

    await ethers.provider.send("evm_increaseTime", [30 * 24 * 60 * 60]); // Increase time by 30 days
    await ethers.provider.send("evm_mine", []);

    await yieldFarming.connect(user1).claim();
    await yieldFarming.connect(user2).claim();

    expect(await rewardToken1.balanceOf(await user1.getAddress())).to.be.equal(ethers.BigNumber.from("267300"));
    expect(await rewardToken2.balanceOf(await user1.getAddress())).to.be.equal(ethers.BigNumber.from("534600"));

    expect(await rewardToken1.balanceOf(await user2.getAddress())).to.be.equal(ethers.BigNumber.from("554400"));
    expect(await rewardToken2.balanceOf(await user2.getAddress())).to.be.equal(ethers.BigNumber.from("1108800"));
  });
  it("should allow user to withdraw only withdrawal amount", async () => {
    await yieldFarming.connect(user1).deposit(ethers.utils.parseEther("100"));

    await ethers.provider.send("evm_increaseTime", [15 * 24 * 60 * 60]); // Increase time by 30 days
    await ethers.provider.send("evm_mine", []);

    await yieldFarming.connect(user1).deposit(ethers.utils.parseEther("50"));
    
    await ethers.provider.send("evm_increaseTime", [20 * 24 * 60 * 60]); // Increase time by 30 days
    await ethers.provider.send("evm_mine", []);
    await expect(yieldFarming.connect(user1).withdraw(ethers.utils.parseEther("150"))).to.be.revertedWith("Amount must be less than or equal to withdrawal Amount");
  });
  it("Deposit amount and withdraw amount should be greater than 0", async() => {
    await expect(yieldFarming.connect(user1).deposit(ethers.utils.parseEther("0"))).to.be.revertedWith("Amount must be greater than 0");
    await yieldFarming.connect(user1).deposit(ethers.utils.parseEther("100"));
    await expect(yieldFarming.connect(user1).withdraw(ethers.utils.parseEther("0"))).to.be.revertedWith("Amount must be greater than 0");
  });
});