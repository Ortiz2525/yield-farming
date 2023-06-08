const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('GMVRFConsumer', () => {
  let GMVRFConsumer;
  let gMVRFConsumer;
  let MockedVRFCoord;
  let mockedVRFCoord;
  let owner;
  const MOCK_SUBSCRIPTION_ID = 2222;
  const MOCK_KHASH = '0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc';

  beforeEach(async () => {
    [owner] = await ethers.getSigners();

    MockedVRFCoord = await ethers.getContractFactory('MockVRFCoordinator', owner);
    mockedVRFCoord = await MockedVRFCoord.deploy();
    await mockedVRFCoord.deployed();

    GMVRFConsumer = await ethers.getContractFactory('TestGMVRFConsumer', owner);
    gMVRFConsumer = await GMVRFConsumer.deploy(MOCK_SUBSCRIPTION_ID, mockedVRFCoord.address, MOCK_KHASH);

    await gMVRFConsumer.deployed();
  });

  describe('constructor', async () => {
    it('Should set vrfCoordinatorAddress with passed parameter', async () => {
      expect(await gMVRFConsumer.getVRFCoordinator()).to.be.equal(mockedVRFCoord.address);
    });
    it('Should set _chainLinkKeyHash with passed parameter', async () => {
      expect(await gMVRFConsumer.getChainLinkKeyHash()).to.be.equal(MOCK_KHASH);
    });
    it('Should set _chainLinkSubsId with passed parameter', async () => {
      expect(await gMVRFConsumer.getChainLinkSubsId()).to.be.equal(MOCK_SUBSCRIPTION_ID);
    });
  });
  describe('requestRandomWords', async () => {
    it('Should call coordinator with constructor parameters', async () => {
      await gMVRFConsumer.requestRandomWords();
      expect(await mockedVRFCoord._requestKeyHash()).to.be.equal(MOCK_KHASH);
      expect(await mockedVRFCoord._requestSubId()).to.be.equal(MOCK_SUBSCRIPTION_ID);
      expect(await mockedVRFCoord._requestConfirmations()).to.be.equal(3);
      expect(await mockedVRFCoord._requestCallbackGaslimit()).to.be.equal(100000);
      expect(await mockedVRFCoord._requestRandomWords()).to.be.equal(1);
    });
    it('Should be reverted if seedNumber was already set', async () => {
      await gMVRFConsumer.requestRandomWords();
      await expect(gMVRFConsumer.requestRandomWords()).to.be.revertedWith('SeedNumberShouldntBeSet()');
    });
  });
  describe('fulfillRandomWords', async () => {
    it('Should set _chainlinkSeedNumber and emits a SeedNumberAssigned event when is called', async () => {
      const randomWords = [15698, 96587, 56886];
      expect(await gMVRFConsumer.publicFulfillRandomWords(1, randomWords)).to.emit('SeedNumberAssigned');
      expect(await gMVRFConsumer.getChainLinkSeedNumber()).to.be.equal(randomWords[0]);
    });
  });
});
