// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '../../contracts/GM2981.sol';

contract TestGM2981 is GM2981 {
  bool public beforeRoyaltyInfo = true;

  constructor(address royaltyAddress_, uint16 royaltyPercentage_) GM2981(royaltyAddress_, royaltyPercentage_) {}

  function setRoyaltyAddress(address newRoyaltyAddress) external {
    _royaltyAddress = newRoyaltyAddress;
  }

  function setBeforeRoyaltyInfoToFalse() public {
    beforeRoyaltyInfo = false;
  }

  function royaltyAddress() public view returns (address) {
    return _royaltyAddress;
  }

  function royaltyPercentage() public view returns (uint16) {
    return _royaltyPercentage;
  }

  function calculatePercentage(uint256 value, uint16 percent) public pure returns (uint256) {
    return super._calculatePercentage(value, percent);
  }

  function _beforeRoyaltyInfo(uint256 tokenId) internal view override(GM2981) {
    super._beforeRoyaltyInfo(tokenId);
    require(beforeRoyaltyInfo, 'executed');
  }
}
