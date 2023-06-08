// SPDX-License-Identifier: MIT
// GM2 Contracts (last updated v0.0.1)
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/utils/introspection/ERC165.sol';
import '../interfaces/IGMTransferController.sol';

contract GMTransferController is ERC165, IGMTransferController {
  function canTokenBeTransferred(
    address collectionAddress,
    address from,
    uint256 tokenId
  ) external view virtual returns (bool) {}

  function bypassTokenId(address collectionAddress, uint256 tokenId) external view virtual {}

  function removeBypassTokenId(address collectionAddress, uint256 tokenId) external view virtual {}

  function supportsInterface(bytes4 interfaceId) public view virtual override(ERC165, IERC165) returns (bool) {
    return interfaceId == type(IGMTransferController).interfaceId || super.supportsInterface(interfaceId);
  }
}
