// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '../../contracts/GMVRFConsumer.sol';

contract TestGMVRFConsumer is GMVRFConsumer {
  constructor(
    uint64 chainLinkSubsId_,
    address vrfCoordinator,
    bytes32 chainLinkKeyHash_
  ) GMVRFConsumer(chainLinkSubsId_, vrfCoordinator, chainLinkKeyHash_) {}

  function getChainLinkSubsId() external view returns (uint256) {
    return _chainLinkSubsId;
  }

  function getVRFCoordinator() external view returns (address) {
    return vrfCoordinatorAddress;
  }

  function getChainLinkKeyHash() external view returns (bytes32) {
    return _chainLinkKeyHash;
  }

  function getChainLinkSeedNumber() external view returns (uint256) {
    return _chainLinkSeedNumber;
  }

  function publicFulfillRandomWords(uint256 subId, uint256[] memory randomWords) public {
    super.fulfillRandomWords(subId, randomWords);
  }
}
