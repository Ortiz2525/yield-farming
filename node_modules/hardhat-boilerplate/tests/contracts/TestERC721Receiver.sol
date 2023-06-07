// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol';

contract TestERC721Receiver is IERC721Receiver {
    function onERC721Received(address, address, uint256, bytes calldata) public pure returns (bytes4) {
      return bytes4(0);
    }
}
