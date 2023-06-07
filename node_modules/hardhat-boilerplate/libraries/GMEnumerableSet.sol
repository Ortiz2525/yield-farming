// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

library GMEnumerableSet {
  struct StringSet {
    string[] _values;
    mapping(string => uint256) _indexes;
  }

  function add(StringSet storage set, string memory value) internal returns (bool) {
    if (!contains(set, value)) {
      set._values.push(value);
      set._indexes[value] = set._values.length;
      return true;
    } else {
      return false;
    }
  }

  function remove(StringSet storage set, string memory value) internal returns (bool) {
    uint256 valueIndex = set._indexes[value];

    if (valueIndex != 0) {
      uint256 toDeleteIndex = valueIndex - 1;
      uint256 lastIndex = set._values.length - 1;

      if (lastIndex != toDeleteIndex) {
        string memory lastvalue = set._values[lastIndex];

        set._values[toDeleteIndex] = lastvalue;
        set._indexes[lastvalue] = valueIndex; // Replace lastvalue's index to valueIndex
      }

      set._values.pop();

      delete set._indexes[value];

      return true;
    } else {
      return false;
    }
  }

  function contains(StringSet storage set, string memory value) internal view returns (bool) {
    return set._indexes[value] != 0;
  }

  function length(StringSet storage set) internal view returns (uint256) {
    return set._values.length;
  }

  function at(StringSet storage set, uint256 index) internal view returns (string memory) {
    return set._values[index];
  }

  function values(StringSet storage set) internal view returns (string[] memory) {
    return set._values;
  }
}
