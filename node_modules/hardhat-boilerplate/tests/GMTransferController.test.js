const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('GMTransferController', () => {
  let GMTranferController;
  let gMTransferController;
  let owner;

  beforeEach(async () => {
    [owner] = await ethers.getSigners();

    GMTranferController = await ethers.getContractFactory('GMTransferController', owner);
    gMTransferController = await GMTranferController.deploy();
    await gMTransferController.deployed();
  });

  describe('canTokenBeTransferred', async () => {
    it('Should not be reverted by default', async () => {
      await expect(
        gMTransferController.canTokenBeTransferred(gMTransferController.address, gMTransferController.address, 1),
      ).to.be.not.reverted;
    });
  });
  describe('bypassTokenId', async () => {
    it('Should not be reverted by default', async () => {
      await expect(gMTransferController.bypassTokenId(gMTransferController.address, 1)).to.be.not.reverted;
    });
  });
  describe('removeBypassTokenId', async () => {
    it('Should not be reverted by default', async () => {
      await expect(gMTransferController.removeBypassTokenId(gMTransferController.address, 1)).to.be.not.reverted;
    });
  });
  describe('supportsInterface', async () => {
    it('Should supports IGMTransferController', async () => {
      expect(await gMTransferController.supportsInterface('0x8dbb1a13')).to.be.true;
    });
  });
});
