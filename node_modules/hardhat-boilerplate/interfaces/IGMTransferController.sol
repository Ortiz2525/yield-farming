// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/utils/introspection/IERC165.sol';
import '../libraries/DynamicMetadata.sol';

interface IGMTransferController is IERC165 {
  function canTokenBeTransferred(
    address collectionAddress,
    address from,
    uint256 tokenId
  ) external view returns (bool);

  function bypassTokenId(address collectionAddress, uint256 tokenId) external view;

  function removeBypassTokenId(address collectionAddress, uint256 tokenId) external view;
}
