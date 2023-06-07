const { expect } = require('chai');
const { ethers, waffle } = require('hardhat');
const { deployMockContract } = waffle;

describe('GM721', () => {
  let GM721;
  let gM721;
  let owner;
  const collectionName = 'CollectionName';
  const collectionSymbol = 'CollectionSymbol';

  beforeEach(async () => {
    [owner] = await ethers.getSigners();

    GM721 = await ethers.getContractFactory('TestGM721', owner);
    gM721 = await GM721.deploy(collectionName, collectionSymbol);
    await gM721.deployed();
  });

  describe('constructor', async () => {
    it('Should set collection name', async () => {
      expect(await gM721.name()).to.be.equal(collectionName);
    });
    it('Should set collection symbol', async () => {
      expect(await gM721.symbol()).to.be.equal(collectionSymbol);
    });
  });

  describe('totalSupply', async () => {
    it('Should start at 0', async () => {
      const totalSupply = await gM721.totalSupply();

      expect(totalSupply).to.be.equal(0);
    });
  });
  describe('_batchMint', async () => {
    it('Should execute _beforeBatchMint', async () => {
      expect(await gM721.beforeBatchMintExecuted()).to.be.false;
      await gM721.batchMint(owner.address, [1, 2, 3]);
      expect(await gM721.beforeBatchMintExecuted()).to.be.true;
    });
    it('Should increment the supply', async () => {
      const tokensToMint = [1, 2, 3];
      await gM721.batchMint(owner.address, tokensToMint);
      expect(await gM721.totalSupply()).to.be.equal(tokensToMint.length);
    });

    // TODO: Check if call _safeMint of openzeppelin 721
    it('Should do a batch mint', async () => {
      const tokensToMint = [1, 2, 3];
      await gM721.batchMint(owner.address, tokensToMint);
      expect(await gM721.totalSupply()).to.be.equal(tokensToMint.length);
      expect(await gM721.balanceOf(owner.address)).to.be.equal(tokensToMint.length);
      for (let i = 0; i < tokensToMint.length; i++) {
        expect(await gM721.ownerOf(tokensToMint[i])).to.be.equal(owner.address);
      }
    });
  });

  describe('burn', async () => {
    // TODO: Check if call _burn of openzeppelin 721
    it('Should burn', async () => {
      await gM721.batchMint(owner.address, [1, 2]);
      await gM721.burn(1);
      expect(await gM721.balanceOf(owner.address)).to.be.equal(1);
      expect(await gM721.ownerOf(2)).to.be.equal(owner.address);
    });
    it('Should reduce the supply', async () => {
      await gM721.batchMint(owner.address, [1, 2, 3]);
      await gM721.burn(1);
      expect(await gM721.totalSupply()).to.be.equal(2);
    });
  });

  describe('_increment', async () => {
    it('Should increment', async () => {
      expect(await gM721.increment(1)).to.be.equal(2);
      expect(await gM721.increment(10)).to.be.equal(11);
      expect(await gM721.increment(45)).to.be.equal(46);
    });
  });

  // TODO: Complete this method tests
  describe('_checkERC721Compatibility', async () => {
    it('Should accept addresses that are not contracts', async () => {
      await expect(
        gM721.checkERC721Compatibility(ethers.constants.AddressZero, owner.address, 1, ethers.utils.toUtf8Bytes('')),
      ).to.not.reverted;
    });
    it("Shouldn't accept contracts that are not ERC721Receiver implementer", async () => {
      const response = gM721.checkERC721Compatibility(
        ethers.constants.AddressZero,
        gM721.address, // <- a contract address
        1,
        ethers.utils.toUtf8Bytes(''),
      );
      await expect(response).to.revertedWith('TransferIsNotSupported');
    });
    it('Should accept contracts that are ERC721Receiver implementer', async () => {
      const ERC721Receiver = await ethers.getContractFactory('TestERC721Receiver', owner);
      const eRC721Receiver = await ERC721Receiver.deploy();
      await eRC721Receiver.deployed();

      await expect(
        gM721.checkERC721Compatibility(
          ethers.constants.AddressZero,
          eRC721Receiver.address,
          1,
          ethers.utils.toUtf8Bytes(''),
        ),
      ).to.not.reverted;
    });
    it("Shouldn't accept contracts that are not ERC721Receiver implementer with custom message", async () => {
      const ERC721Receiver = await ethers.getContractFactory('TestERC721Receiver', owner);
      const eRC721Receiver = await ERC721Receiver.deploy();
      await eRC721Receiver.deployed();

      const CUSTOM_MSG = 'Custom error message';
      const mockContract = await deployMockContract(
        owner,
        eRC721Receiver.interface.format(ethers.utils.FormatTypes.json),
      );
      await mockContract.mock.onERC721Received.revertsWithReason(CUSTOM_MSG);

      await expect(
        gM721.checkERC721Compatibility(
          ethers.constants.AddressZero,
          mockContract.address,
          1,
          ethers.utils.toUtf8Bytes(''),
        ),
      ).to.revertedWith(CUSTOM_MSG);
    });
  });
});
