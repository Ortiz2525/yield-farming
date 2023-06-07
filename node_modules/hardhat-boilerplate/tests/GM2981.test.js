const { expect } = require('chai');
const { ethers } = require('hardhat');
describe('GM2981', () => {
  let GM2981;
  let gM2981;
  let owner;
  let otherAccount;
  let royaltyPercentage = 85;

  beforeEach(async () => {
    [owner, otherAccount] = await ethers.getSigners();

    GM2981 = await ethers.getContractFactory('TestGM2981', owner);
    gM2981 = await GM2981.deploy(owner.address, royaltyPercentage);
    await gM2981.deployed();
  });

  describe('constructor', async () => {
    it('Should set the royalty address', async () => {
      expect(await gM2981.royaltyAddress()).to.be.equal(owner.address);
    });
    it('Should set the royalty percentage', async () => {
      expect(await gM2981.royaltyPercentage()).to.be.equal(royaltyPercentage);
    });
  });
  describe('royaltyInfo', async () => {
    it('Should returns receiver', async () => {
      const royaltyInfo = await gM2981.royaltyInfo(1, 1);
      expect(royaltyInfo.receiver).to.be.equal(owner.address);
    });
    it('Should returns the royalty amount', async () => {
      const royaltyInfo = await gM2981.royaltyInfo(1, 1000);
      expect(royaltyInfo.royaltyAmount).to.be.equal(85);
    });
  });

  describe('_royaltyAddress', async () => {
    it('Should returns new address if it is updated', async () => {
      let royaltyInfo = await gM2981.royaltyInfo(1, 1);
      expect(royaltyInfo.receiver).to.be.equal(owner.address);

      await gM2981.setRoyaltyAddress(otherAccount.address);
      royaltyInfo = await gM2981.royaltyInfo(1, 1);
      expect(royaltyInfo.receiver).to.be.equal(otherAccount.address);
    });
    it('Should returns the royalty amount', async () => {
      const royaltyInfo = await gM2981.royaltyInfo(1, 1000);
      expect(royaltyInfo.royaltyAmount).to.be.equal(85);
    });
  });

  describe('_beforeRoyaltyInfo', async () => {
    // TODO: Check if is called in royalty info without override to get 100% coverage
    it('Should be executed in royalty info', async () => {
      await gM2981.setBeforeRoyaltyInfoToFalse();
      await expect(gM2981.royaltyInfo(1, 1)).to.be.revertedWith('executed');
    });
  });

  describe('supportsInterface', async () => {
    it('Should support IERC2981 for royalty standard', async () => {
      const iERC2981InterfaceID = '0x2a55205a';

      expect(await gM2981.supportsInterface(iERC2981InterfaceID)).to.be.true;
    });
  });

  describe('_calculatePercentage', async () => {
    it('Should calculate percentage', async () => {
      expect(await gM2981.calculatePercentage(1000, royaltyPercentage)).to.be.equal(85);
      expect(await gM2981.calculatePercentage(10000, royaltyPercentage)).to.be.equal(850);
      expect(await gM2981.calculatePercentage(100000, royaltyPercentage)).to.be.equal(8500);
      expect(await gM2981.calculatePercentage(100000, 20)).to.be.equal(2000);
    });
  });
});
