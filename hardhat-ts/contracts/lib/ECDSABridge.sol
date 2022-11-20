//SPDX-License-Identifier: Unlicensed
pragma solidity 0.8.13;

import "@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol";

import "hardhat/console.sol";

/// @title Moves OpenZeppelin's ECDSA implementation into a separate library to save
///        code size in the main contract.
library ECDSABridge {
  using ECDSAUpgradeable for bytes32;

  function recover(bytes32 hash, bytes memory signature) internal view returns (address) {
    console.log("recover hash");
    console.logBytes(abi.encodePacked((hash)));
    console.log("hash.toEthSignedMessageHash()");
    console.logBytes(abi.encodePacked(hash.toEthSignedMessageHash()));
    return hash.recover(signature);
  }
}
