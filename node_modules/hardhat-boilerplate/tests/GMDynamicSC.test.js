const { expect } = require('chai');
const { ethers, waffle } = require('hardhat');
const { deployMockContract } = waffle;
const utils = require('./utils');
describe('GMDynamicSC', () => {
  let GMDynamicSC;
  let gMDynamicSC;
  let GMAttributesController;
  let gMAttributesController;
  let GMTransferController;
  let gMTransferController;
  let owner;
  let otherAccount;
  const defaultBaseURI = 'ipfs://default-folder/';
  const defaultImageURL = 'ipfs://default/image/path/';
  const collectionDescription = 'Collection description';

  const baseAttributes = [
    {
      displayType: '',
      traitType: 'Stamina',
      value: '1.4',
    },
    {
      displayType: '',
      traitType: 'Personality',
      value: 'Sad',
    },
  ];
  const dynamicAttributes = [
    {
      displayType: '',
      traitType: 'Strength',
      value: '5',
    },
    {
      displayType: '',
      traitType: 'Health',
      value: '20',
    },
  ];

  beforeEach(async () => {
    [owner, otherAccount] = await ethers.getSigners();

    const DynamicMetadata = await ethers.getContractFactory('DynamicMetadata', owner);
    const dynamicMetadata = await DynamicMetadata.deploy();
    await dynamicMetadata.deployed();

    GMDynamicSC = await ethers.getContractFactory('TestGMDynamicSC', {
      signer: owner,
      libraries: {
        DynamicMetadata: dynamicMetadata.address,
      },
    });
    gMDynamicSC = await GMDynamicSC.deploy(defaultBaseURI, collectionDescription);
    await gMDynamicSC.deployed();
  });

  describe('Default behavior', async () => {
    describe('setBaseAttributes', () => {
      it('Should be set base attributes', async () => {
        await gMDynamicSC.setBaseAttributes(1, baseAttributes);
        expect(true).to.be.true;
      });
      it('Should be reverted if base attributes is set twice', async () => {
        await gMDynamicSC.setBaseAttributes(1, baseAttributes);
        await expect(gMDynamicSC.setBaseAttributes(1, baseAttributes)).to.be.revertedWith('AlreadyHaveBaseAttributes');
        expect(true).to.be.true;
      });
    });

    describe('addPropertiesToMetadata', () => {
      describe('setAdditionalProperties', () => {
        it('Should be reverted if base attributes was not set before', async () => {
          await expect(gMDynamicSC.setImagePath(1, '')).to.be.revertedWith('CannotSetImageWithoutBaseAttributes');
        });
        it('Should be set image path to token if it has base attributes', async () => {
          await gMDynamicSC.setBaseAttributes(1, baseAttributes);
          await expect(gMDynamicSC.setImagePath(1, '')).to.not.be.reverted;
        });
      });
    });

    describe('getDynamicSCAddresses', () => {
      it('Should returns an array with two zero addresses', async () => {
        expect(await gMDynamicSC.getDynamicSCAddresses()).to.have.same.members([
          ethers.constants.AddressZero,
          ethers.constants.AddressZero,
        ]);
      });
    });
    describe('canTokenBeTransferred', () => {
      it('Should returns true by default', async () => {
        expect(await gMDynamicSC.canTokenBeTransferred(gMDynamicSC.address, 1)).to.be.true;
      });
    });
    describe('tokenURI', () => {
      it('Should returns the default baseURI with the tokenId passed by param', async () => {
        expect(await gMDynamicSC.tokenURI(1)).to.be.equal(defaultBaseURI + 1);
      });
      it('Should returns the default baseURI with the tokenId passed by param if base attributes was set', async () => {
        await gMDynamicSC.setBaseAttributes(1, baseAttributes);
        expect(await gMDynamicSC.tokenURI(1)).to.be.equal(defaultBaseURI + 1);
      });
      it('Should returns the default baseURI with the tokenId passed by param if base attributes and imagePath for that token was set', async () => {
        await gMDynamicSC.setBaseAttributes(1, baseAttributes);
        await gMDynamicSC.setImagePath(1, '');

        expect(await gMDynamicSC.tokenURI(1)).to.be.equal(defaultBaseURI + 1);
      });
    });
    describe('transferBlockedToken', () => {
      it('Should be reverted if pass invalid address', async () => {
        await expect(gMDynamicSC.transferBlockedToken(ethers.constants.AddressZero, 1)).to.be.revertedWith(
          'ZeroAddressNotSupported',
        );
      });
      it('Should be reverted by default', async () => {
        await expect(gMDynamicSC.transferBlockedToken(otherAccount.address, 1)).to.be.revertedWith(
          'MethodNotSupported',
        );
      });
    });
    describe('setAttributesControllerSC', () => {
      let contractERC165WithoutIGMController;

      beforeEach(async () => {
        const TestContractERC165WithoutIGMController = await ethers.getContractFactory('ERC721', owner);
        contractERC165WithoutIGMController = await deployMockContract(
          owner,
          TestContractERC165WithoutIGMController.interface.format(ethers.utils.FormatTypes.json),
        );
        await contractERC165WithoutIGMController.mock.supportsInterface.returns(false);

        GMAttributesController = await ethers.getContractFactory('GMAttributesController', owner);
        gMAttributesController = await GMAttributesController.deploy();
        await gMAttributesController.deployed();
      });
      it('Should be reverted if defaultImageURL was not set', async () => {
        await expect(gMDynamicSC.setAttributesControllerSC(gMAttributesController.address)).to.be.revertedWith(
          'DefaultImagePathRequired',
        );
      });
      it('Should be reverted if passed address is not valid', async () => {
        gMDynamicSC.setDefaultImageURL(defaultImageURL);
        await expect(gMDynamicSC.setAttributesControllerSC(ethers.constants.AddressZero)).to.be.revertedWith(
          'ZeroAddressNotSupported',
        );
      });
      it('Should be reverted if passed contract that not implements IERC165', async () => {
        gMDynamicSC.setDefaultImageURL(defaultImageURL);
        await expect(gMDynamicSC.setAttributesControllerSC(gMDynamicSC.address)).to.be.revertedWith(
          "function selector was not recognized and there's no fallback function",
        );
      });
      it('Should be reverted if passed contract that implements IERC165 but not IGMAttributesController', async () => {
        gMDynamicSC.setDefaultImageURL(defaultImageURL);
        await expect(
          gMDynamicSC.setAttributesControllerSC(contractERC165WithoutIGMController.address),
        ).to.be.revertedWith('InterfaceIsNotImplemented');
      });
      it('Should set attributes controller address', async () => {
        gMDynamicSC.setDefaultImageURL(defaultImageURL);
        await gMDynamicSC.setAttributesControllerSC(gMAttributesController.address);
        expect(await gMDynamicSC.getDynamicSCAddresses()).to.have.same.members([
          gMAttributesController.address,
          ethers.constants.AddressZero,
        ]);
      });
    });

    describe('setTransferControllerSC', () => {
      let contractERC165WithoutIGMController;

      before(async () => {
        const TestContractERC165WithoutIGMController = await ethers.getContractFactory('ERC721', owner);
        contractERC165WithoutIGMController = await deployMockContract(
          owner,
          TestContractERC165WithoutIGMController.interface.format(ethers.utils.FormatTypes.json),
        );
        await contractERC165WithoutIGMController.mock.supportsInterface.returns(false);

        GMTransferController = await ethers.getContractFactory('GMTransferController', owner);
        gMTransferController = await GMTransferController.deploy();
        await gMTransferController.deployed();
      });
      it('Should be reverted if passed address is not valid', async () => {
        await expect(gMDynamicSC.setTransferControllerSC(ethers.constants.AddressZero)).to.be.revertedWith(
          'ZeroAddressNotSupported',
        );
      });
      it('Should be reverted if passed contract that not implements IERC165', async () => {
        await expect(gMDynamicSC.setTransferControllerSC(gMDynamicSC.address)).to.be.revertedWith(
          "function selector was not recognized and there's no fallback function",
        );
      });
      it('Should be reverted if passed contract that implements IERC165 but not IGMAttributesController', async () => {
        await expect(
          gMDynamicSC.setTransferControllerSC(contractERC165WithoutIGMController.address),
        ).to.be.revertedWith('InterfaceIsNotImplemented');
      });
      it('Should set attributes controller address', async () => {
        await gMDynamicSC.setTransferControllerSC(gMTransferController.address);
        expect(await gMDynamicSC.getDynamicSCAddresses()).to.have.same.members([
          ethers.constants.AddressZero,
          gMTransferController.address,
        ]);
      });
    });
  });

  describe('Dynamic behavior', async () => {
    describe('canTokenBeTransferred', () => {
      it('Should returns true through GMTransferController', async () => {
        expect(await gMDynamicSC.canTokenBeTransferred(gMDynamicSC.address, 1)).to.be.true;
      });
    });
    describe('tokenURI', () => {
      beforeEach(async () => {
        GMAttributesController = await ethers.getContractFactory('TestGMAttributesController', owner);
        gMAttributesController = await GMAttributesController.deploy();
        await gMDynamicSC.setDefaultImageURL(defaultImageURL);
        await gMDynamicSC.setAttributesControllerSC(gMAttributesController.address);
      });

      it('Should returns base64 tokenURI with only base attributes', async () => {
        const metadata = {
          description: collectionDescription,
          image: defaultImageURL + 1,
          name: '#1',
          attributes: baseAttributes,
        };
        await gMDynamicSC.setBaseAttributes(1, baseAttributes);
        expect(utils.metadataToString(metadata)).to.be.equal(
          utils.base64URIToJSONString(await gMDynamicSC.tokenURI(1)),
        );
      });

      it('Should returns base64 tokenURI with base and dynamic attributes', async () => {
        const metadata = {
          description: collectionDescription,
          image: defaultImageURL + 1,
          name: '#1',
          attributes: baseAttributes.concat(dynamicAttributes),
        };
        await gMDynamicSC.setBaseAttributes(1, baseAttributes);
        await gMAttributesController.appendDynamicAttributes(dynamicAttributes);
        expect(utils.metadataToString(metadata)).to.be.equal(
          utils.base64URIToJSONString(await gMDynamicSC.tokenURI(1)),
        );
      });

      it('Should returns base64 tokenURI with base and dynamic attributes, also new imagePath', async () => {
        const customImagePath = 'ipfs://custom/image/path/1';
        const metadata = {
          description: collectionDescription,
          image: customImagePath,
          name: '#1',
          attributes: baseAttributes.concat(dynamicAttributes),
        };
        await gMDynamicSC.setBaseAttributes(1, baseAttributes);
        await gMAttributesController.appendDynamicAttributes(dynamicAttributes);
        await gMDynamicSC.setImagePath(1, customImagePath);
        expect(utils.metadataToString(metadata)).to.be.equal(
          utils.base64URIToJSONString(await gMDynamicSC.tokenURI(1)),
        );
      });
    });
    describe('transferBlockedToken', () => {
      beforeEach(async () => {
        GMTransferController = await ethers.getContractFactory('GMTransferController', owner);
        gMTransferController = await deployMockContract(
          owner,
          GMTransferController.interface.format(ethers.utils.FormatTypes.json),
        );
        await gMTransferController.mock.supportsInterface.returns(true);
        await gMTransferController.mock.canTokenBeTransferred
          .withArgs(gMDynamicSC.address, otherAccount.address, 1)
          .returns(false);
        await gMTransferController.mock.canTokenBeTransferred
          .withArgs(gMDynamicSC.address, otherAccount.address, 2)
          .returns(true);
        await gMTransferController.mock.bypassTokenId.returns();
        await gMTransferController.mock.removeBypassTokenId.returns();
        await gMDynamicSC.setTransferControllerSC(gMTransferController.address);
      });
      it('Should return false if transfer is blocked', async () => {
        expect(await gMDynamicSC.canTokenBeTransferred(otherAccount.address, 1)).to.be.false;
      });
      it('Should return true if transfer is blocked', async () => {
        expect(await gMDynamicSC.canTokenBeTransferred(otherAccount.address, 2)).to.true;
      });

      it('Should transfer token is not blocked', async () => {
        await gMDynamicSC.transferBlockedToken(otherAccount.address, 2);
        expect(await gMDynamicSC.wasTransferred(otherAccount.address, 2)).to.be.true;
      });
    });
  });
});
