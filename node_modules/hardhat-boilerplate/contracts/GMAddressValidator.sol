// SPDX-License-Identifier: MIT
// GM2 Contracts (last updated v0.0.1)
pragma solidity ^0.8.9;

import '../errors/AddressValidatorErrors.sol';
import '@openzeppelin/contracts/interfaces/IERC165.sol';

abstract contract GMAddressValidator {
  modifier onlyNotZeroAddress(address addr) {
    if (addr == address(0)) {
      revert ZeroAddressNotSupported();
    }
    _;
  }

  modifier onlyIfSupports(address addr, bytes4 interfaceId) {
    if (IERC165(addr).supportsInterface(interfaceId) == false) {
      revert InterfaceIsNotImplemented(addr, interfaceId);
    }
    _;
  }
}
