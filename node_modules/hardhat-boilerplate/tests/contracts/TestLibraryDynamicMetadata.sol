// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '../../libraries/DynamicMetadata.sol';

contract TestLibraryDynamicMetadata {
  Attribute[] private baseAttributes;

  //INFO: we need this getter because can't get a public
  //varible array directly from ethers we must to specify an index
  function getBaseAttributes() external view returns (Attribute[] memory) {
    return baseAttributes;
  }

  function toBytes(Attribute calldata attribute) public pure returns (bytes memory) {
    return DynamicMetadata.toBytes(attribute);
  }

  function concatDynamicAttributes(Attribute[] calldata baseAttributes_, Attribute[] calldata dynamicAttributes)
    public
    pure
    returns (Attribute[] memory)
  {
    return DynamicMetadata.concatDynamicAttributes(baseAttributes_, dynamicAttributes);
  }

  function appendBaseAttributes(Attribute[] calldata newBaseAttributes) public {
    DynamicMetadata.appendBaseAttributes(baseAttributes, newBaseAttributes);
  }

  function mapToBytes(Attribute[] calldata attributesToMap) public pure returns (bytes memory) {
    return DynamicMetadata.mapToBytes(attributesToMap);
  }

  function toBase64URI(Metadata calldata metadata) public pure returns (string memory) {
    return DynamicMetadata.toBase64URI(metadata);
  }

  function keyValueToJsonInBytes(string calldata key, string calldata value) public pure returns (bytes memory) {
    return DynamicMetadata.keyValueToJsonInBytes(key, value);
  }
}
