//SPDX-License-Identifier: Unlicensed
pragma solidity 0.8.13;

import "@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol";

/// @title Moves OpenZeppelin's ECDSA implementation into a separate library to save
///        code size in the main contract.
library ECDSABridge {
  function recover(bytes32 hash, bytes memory signature) internal pure returns (address) {
    return ECDSAUpgradeable.recover(hash, signature);
  }
}
