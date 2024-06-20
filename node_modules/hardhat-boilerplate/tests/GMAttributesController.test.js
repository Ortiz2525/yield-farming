const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('GMAttributesController', () => {
  let GMAttributesController;
  let gMAttributesController;
  let owner;

  beforeEach(async () => {
    [owner] = await ethers.getSigners();

    GMAttributesController = await ethers.getContractFactory('GMAttributesController', owner);
    gMAttributesController = await GMAttributesController.deploy();
    await gMAttributesController.deployed();
  });
  describe('getDynamicAttributes', async () => {
    it('Should return an empty array by default', async () => {
      const result = await gMAttributesController.getDynamicAttributes(gMAttributesController.address, 1);
      expect(result.length).to.be.equal(0);
    });
  });

  describe('supportsInterface', async () => {
    it('Should supports IGMAttributesController', async () => {
      expect(await gMAttributesController.supportsInterface('0x87103861')).to.be.true;
    });
  });
});
