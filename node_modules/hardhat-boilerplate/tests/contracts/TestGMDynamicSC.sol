// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '../../contracts/GMDynamicSC.sol';

contract TestGMDynamicSC is GMDynamicSC {
  mapping(address => mapping(uint256 => bool)) _transfers;

  constructor(string memory baseURI, string memory description) GMDynamicSC(baseURI, description) {}

  function canTokenBeTransferred(address to, uint256 tokenId) public view returns (bool) {
    return sCBehavior.canTokenBeTransferred(to, tokenId);
  }

  function setImagePath(uint256 tokenId, string memory newImageURL) public {
    _setImagePath(tokenId, newImageURL);
  }

  function tokenURI(uint256 tokenId) public view returns (string memory) {
    return sCBehavior.getTokenURI(tokenId);
  }

  function _transferBlockedToken(address to, uint256 tokenId) internal override {
    _transfers[to][tokenId] = true;
    super._transferBlockedToken(to, tokenId);
  }

  function getRoyaltiesData() public view virtual returns (Royalty memory) {
    return super._getRoyaltiesData();
  }

  function wasTransferred(address to, uint256 tokenId) external view returns (bool) {
    return _transfers[to][tokenId];
  }

  function setBaseAttributes(uint256 tokenId, Attribute[] memory newBaseAttributes) public {
    _setBaseAttributes(tokenId, newBaseAttributes);
  }

  function setDefaultImageURL(string calldata newDefaultImageURL) public {
    _defaultImagePath = newDefaultImageURL;
  }

  function setAttributesControllerSC(address newAttributesControllerSC) public {
    _setAttributesControllerSC(newAttributesControllerSC);
  }

  function setTransferControllerSC(address newTransferControllerSC) public {
    _setTransferControllerSC(newTransferControllerSC);
  }

  function _beforeSetTransferControllerSC(address addr) internal override {
    super._beforeSetTransferControllerSC(addr);
  }
}
