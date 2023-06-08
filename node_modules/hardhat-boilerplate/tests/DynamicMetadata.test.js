const { expect } = require('chai');
const { ethers } = require('hardhat');
const utils = require('./utils');

describe('DynamicMetadata', () => {
  let DynamicMetadata;
  let dynamicMetadata;
  let TestLibraryDynamicMetadata;
  let testLibraryDynamicMetadata;
  let owner;

  beforeEach(async () => {
    [owner] = await ethers.getSigners();

    DynamicMetadata = await ethers.getContractFactory('DynamicMetadata', owner);
    dynamicMetadata = await DynamicMetadata.deploy();
    await dynamicMetadata.deployed();

    TestLibraryDynamicMetadata = await ethers.getContractFactory('TestLibraryDynamicMetadata', {
      signer: owner,
      libraries: {
        DynamicMetadata: dynamicMetadata.address,
      },
    });
    testLibraryDynamicMetadata = await TestLibraryDynamicMetadata.deploy();
    await testLibraryDynamicMetadata.deployed();
  });

  describe('keyValueToJsonInBytes', () => {
    it('Should map a key and value to JSON format in bytes', async function () {
      const keyValueBytes = await testLibraryDynamicMetadata.keyValueToJsonInBytes('key', 'value');
      const keyValueStr = ethers.utils.toUtf8String(keyValueBytes);
      expect(keyValueStr).to.equal('"key":"value"');
    });
  });

  describe('toBytes', () => {
    it('Should map complete attribute struct to JSON in bytes', async () => {
      const attribute = {
        displayType: 'a',
        traitType: 'b',
        value: 'c',
      };
      const attributesInBytes = await testLibraryDynamicMetadata.toBytes(attribute);
      const attributesInJSON = ethers.utils.toUtf8String(attributesInBytes);
      expect(attributesInJSON).to.be.equal(utils.attributeToJSON(attribute));
    });

    it('Should map partial attribute struct to JSON in bytes', async () => {
      const attribute = {
        displayType: '',
        traitType: 'a',
        value: 'b',
      };
      const attributesInBytes = await testLibraryDynamicMetadata.toBytes(attribute);
      const attributesInJSON = ethers.utils.toUtf8String(attributesInBytes);
      expect(attributesInJSON).to.be.equal(utils.attributeToJSON(attribute));
    });
  });

  describe('concatDynamicAttributes', () => {
    it('Should concat two arrays of attributes', async () => {
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
          displayType: 'boost_number',
          traitType: 'Aqua Power',
          value: '40',
        },
        {
          displayType: 'boost_percentage',
          traitType: 'Stamina Increase',
          value: '10',
        },
      ];

      const concatenatedAttributes = await testLibraryDynamicMetadata.concatDynamicAttributes(
        baseAttributes,
        dynamicAttributes,
      );
      expect(concatenatedAttributes).to.eql(
        utils.transformToAssociativeArray(baseAttributes.concat(dynamicAttributes)),
      );
    });
  });

  describe('appendBaseAttributes', () => {
    it('Should append passed array to baseAttributes', async () => {
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

      let currentBaseAttributes = await testLibraryDynamicMetadata.getBaseAttributes();
      expect(currentBaseAttributes.length).to.be.equal(0);

      await testLibraryDynamicMetadata.appendBaseAttributes(baseAttributes);
      currentBaseAttributes = await testLibraryDynamicMetadata.getBaseAttributes();
      expect(currentBaseAttributes.length).to.be.equal(2);

      expect(currentBaseAttributes).to.eql(utils.transformToAssociativeArray(baseAttributes));
    });
  });

  describe('mapToBytes', () => {
    it('Should append passed array to baseAttributes', async () => {
      const attributes = [
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

      const attributesInBytes = await testLibraryDynamicMetadata.mapToBytes(attributes);
      const attributesInString = ethers.utils.toUtf8String(attributesInBytes);

      expect(attributesInString).to.be.equal(utils.attributesToString(attributes));
    });
  });

  describe('toBase64', () => {
    it('Should convert to base64 the metadata passed without royalty included by param', async () => {
      const royalty = {
        recipientAddress: ethers.constants.AddressZero,
        feePercentage: '0',
      };
      const attributes = [
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

      const metadata = {
        description: 'description',
        image: 'image',
        name: 'name',
        attributes,
        royalty,
      };

      const URIInBase64 = await testLibraryDynamicMetadata.toBase64URI(metadata);

      const metadataString = utils.base64URIToJSONString(URIInBase64);

      expect(metadataString).to.be.equal(utils.metadataToString(metadata));
    });
    it('Should convert to base64 the metadata passed with royalty included by param', async () => {
      const royalty = {
        recipientAddress: owner.address,
        feePercentage: '100',
      };
      // const attributes = [
      //   {
      //     displayType: '',
      //     traitType: 'Stamina',
      //     value: '1.4',
      //   },
      //   {
      //     displayType: '',
      //     traitType: 'Personality',
      //     value: 'Sad',
      //   },
      // ];

      const metadata = {
        description: 'description',
        name: 'name',
        image: 'image',
        attributes: [],
        royalty,
      };

      console.log('====ANTES');
      const URIInBase64 = await testLibraryDynamicMetadata.toBase64URI(metadata);
      console.log('====DESPUES');
      const metadataString = utils.base64URIToJSONString(URIInBase64);
      expect(metadataString).to.be.equal(utils.metadataToString(metadata));
    });
  });
});
