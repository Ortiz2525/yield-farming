// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import './GMEnumerableSet.sol';

library GMEnumerableMap {
  using GMEnumerableSet for GMEnumerableSet.StringSet;

  struct BytesToStringMap {
    GMEnumerableSet.StringSet _keys;
    mapping(string => string) _values;
  }

  function set(
    BytesToStringMap storage map,
    string memory key,
    string memory value
  ) internal returns (bool) {
    map._values[key] = value;
    return map._keys.add(key);
  }

  function remove(BytesToStringMap storage map, string memory key) internal returns (bool) {
    delete map._values[key];
    return map._keys.remove(key);
  }

  function contains(BytesToStringMap storage map, string memory key) internal view returns (bool) {
    return map._keys.contains(key);
  }

  function length(BytesToStringMap storage map) internal view returns (uint256) {
    return map._keys.length();
  }

  function at(BytesToStringMap storage map, uint256 index) internal view returns (string memory, string memory) {
    string memory key = map._keys.at(index);
    return (key, map._values[key]);
  }
}
