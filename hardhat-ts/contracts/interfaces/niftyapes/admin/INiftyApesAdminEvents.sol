//SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

/// @title Events emmited for admin changes in the contract.
interface INiftyApesAdminEvents {
    /// @notice Emmited when a new addest and its corresponding asset are added to nifty apes allow list
    /// @param asset The asset being added to the allow list
    /// @param cAsset The address of the corresponding compound token
    event NewAssetListed(address asset, address cAsset);

    /// @notice Emmited when the protocol interest fee is updated.
    ///         Interest is charged per second on a loan.
    ///         This is the fee that the protocol charges for facilitating the loan
    /// @param oldProtocolInterestBps The old value denominated in tokens per second
    /// @param newProtocolInterestBps The new value denominated in tokens per second
    event ProtocolInterestBpsUpdated(uint96 oldProtocolInterestBps, uint96 newProtocolInterestBps);

    /// @notice Emmited when the premium that a lender is charged for refinancing a loan is changed
    /// @param oldPremiumLenderBps The old basis points denominated in parts of 10_000
    /// @param newPremiumLenderBps The new basis points denominated in parts of 10_000
    event RefinancePremiumLenderBpsUpdated(uint16 oldPremiumLenderBps, uint16 newPremiumLenderBps);

    /// @notice Emmited when the premium that a lender is charged for refinancing a loan is changed
    /// @param oldPremiumProtocolBps The old basis points denominated in parts of 10_000
    /// @param newPremiumProtocolBps The new basis points denominated in parts of 10_000
    event RefinancePremiumProtocolBpsUpdated(
        uint16 oldPremiumProtocolBps,
        uint16 newPremiumProtocolBps
    );

    /// @notice Emmited when the bps of reveneue sent to the Regen Collective is changed
    /// @param oldRegenCollectiveBpsOfRevenue The old basis points denominated in parts of 10_000
    /// @param newRegenCollectiveBpsOfRevenue The new basis points denominated in parts of 10_000
    event RegenCollectiveBpsOfRevenueUpdated(
        uint16 oldRegenCollectiveBpsOfRevenue,
        uint16 newRegenCollectiveBpsOfRevenue
    );

    /// @notice Emmited when the address for the Regen Collective is changed
    /// @param newRegenCollectiveAddress The new address of the Regen Collective
    event RegenCollectiveAddressUpdated(
        address newRegenCollectiveAddress
    ); 
} 