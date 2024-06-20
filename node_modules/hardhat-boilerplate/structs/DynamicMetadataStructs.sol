// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
struct Attribute {
  string displayType;
  string traitType;
  string value;
}

struct Royalty {
  address recipientAddress;
  uint16 feePercentage; // INFO: Use two decimal => 100 = 1%
}

struct Metadata {
  string description;
  string image;
  string name;
  Attribute[] attributes;
  Royalty royalty;
}

struct SCBehavior {
  function(uint256) internal view returns (string memory) getTokenURI;
  function(address, uint256) internal view returns (bool) canTokenBeTransferred;
  function(address, uint256) internal transferBlockedToken;
}
