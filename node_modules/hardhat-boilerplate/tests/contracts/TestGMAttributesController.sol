// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '../../contracts/GMAttributesController.sol';
import '../../libraries/DynamicMetadata.sol';

contract TestGMAttributesController is GMAttributesController {
  using DynamicMetadata for Attribute[];
  Attribute[] _dynamicAttributes;

  function appendDynamicAttributes(Attribute[] calldata attributes) external {
    for (uint256 i = 0; i < attributes.length; i++) {
      _dynamicAttributes.push(attributes[i]);
    }
  }

  function getDynamicAttributes(address, uint256) external view override returns (Attribute[] memory attributes) {
    return _dynamicAttributes;
  }
}
