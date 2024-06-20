//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol';
import '@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol';

contract MockVRFCoordinator is ERC721Holder {
  uint256 internal counter = 0;

  bytes32 public _requestKeyHash;
  uint64 public _requestSubId;
  uint16 public _requestConfirmations;
  uint32 public _requestCallbackGaslimit;
  uint32 public _requestRandomWords;

  function requestRandomWords(
    bytes32 keyHash,
    uint64 subId,
    uint16 confirmations,
    uint32 callbackGaslimit,
    uint32 requestWords
  ) external returns (uint256 requestId) {
    _requestKeyHash = keyHash;
    _requestSubId = subId;
    _requestConfirmations = confirmations;
    _requestCallbackGaslimit = callbackGaslimit;
    _requestRandomWords = requestWords;

    VRFConsumerBaseV2 consumer = VRFConsumerBaseV2(msg.sender);
    uint256[] memory randomWords = new uint256[](1);
    randomWords[0] = 98399823935488628972230378827222374215765577672212663180424154115781686135530;
    requestId = 62008730210478174097590008995962041607952919859365870387093827414333776231451;
    consumer.rawFulfillRandomWords(requestId, randomWords);
    counter += 1;
  }
}
