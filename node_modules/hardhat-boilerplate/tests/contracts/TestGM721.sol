// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '../../contracts/GM721.sol';

contract TestGM721 is GM721 {
  bool public beforeBatchMintExecuted = false;

  constructor(string memory collectionName, string memory collectionSymbol) GM721(collectionName, collectionSymbol) {}

  function batchMint(address to, uint256[] calldata tokenIds) external {
    super._batchMint(to, tokenIds);
  }

  function increment(uint256 i) public pure returns (uint256) {
    return super._increment(i);
  }

  function _beforeBatchMint(address to, uint256[] calldata tokenIds) internal override(GM721) {
    beforeBatchMintExecuted = true;
    super._beforeBatchMint(to, tokenIds);
  }

  function checkERC721Compatibility(
    address from,
    address to,
    uint256 tokenId,
    bytes memory _data
  ) public returns (bool) {
    return super._checkERC721Compatibility(from, to, tokenId, _data);
  }
}
