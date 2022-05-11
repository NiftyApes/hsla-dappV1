//SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

/// @title Events emmited for changes in liquidity
interface ILiquidityEvents {
    /// @notice Emmited when a liquidity provider adds a token to the protocol.
    /// @param liquidityProvider The address of the liquidity provider adding funds
    /// @param asset The address of the token being added
    /// @param tokenAmount The amount of tokens that have been added to be protocol
    /// @param cTokenAmount The amount of compound tokens that resulted from this deposit
    event Erc20Supplied(
        address indexed liquidityProvider,
        address indexed asset,
        uint256 tokenAmount,
        uint256 cTokenAmount
    );

    /// @notice Emmited when a liquidity provider adds a compound token to the protocol.
    ///         If users have already deposited funds into compound they can directly supply compound tokens
    ///         to nifty apes
    /// @param liquidityProvider The address of the liquidity provider adding funds
    /// @param cAsset The address of the compound token being added
    /// @param cTokenAmount The amount of compound tokens that resulted from this deposit
    event CErc20Supplied(
        address indexed liquidityProvider,
        address indexed cAsset,
        uint256 cTokenAmount
    );

    /// @notice Emmited when a liquidity provider removes a token from the protocol.
    /// @param liquidityProvider The address of the liquidity provider removing funds
    /// @param asset The address of the token being removeid
    /// @param tokenAmount The amount of tokens that have been removed from be protocol
    /// @param cTokenAmount The amount of compound tokens that have been removed
    event Erc20Withdrawn(
        address indexed liquidityProvider,
        address indexed asset,
        uint256 tokenAmount,
        uint256 cTokenAmount
    );

    /// @notice Emmited when a liquidity provider removes a compound token from the protocol.
    /// @param liquidityProvider The address of the liquidity provider removing funds
    /// @param cAsset The address of the compound token being removed
    /// @param cTokenAmount The amount of compound tokens being removed
    event CErc20Withdrawn(
        address indexed liquidityProvider,
        address indexed cAsset,
        uint256 cTokenAmount
    );

    /// @notice Emmited when a liquidity provider adds ethereum to the protocol
    /// @param liquidityProvider The address of the liquidity provider adding funds
    /// @param amount The amount of tokens that have been added to be protocol
    /// @param cTokenAmount The amount of compound tokens that resulted from this deposit
    event EthSupplied(address indexed liquidityProvider, uint256 amount, uint256 cTokenAmount);

    /// @notice Emmited when a liquidity provider removes ethereum from the protocol
    /// @param liquidityProvider The address of the liquidity provider removing funds
    /// @param amount The amount of ethereum that have been removed from be protocol
    /// @param cTokenAmount The amount of compound tokens that got removed
    event EthWithdrawn(address indexed liquidityProvider, uint256 amount, uint256 cTokenAmount);

    /// @notice Emmited when the owner withdraws from the protocol.
    /// @param liquidityProvider The address of the liquidity provider removing funds
    /// @param asset The address of the token being removeid
    /// @param tokenAmount The amount of tokens that have been removed from be protocol
    /// @param cTokenAmount The amount of compound tokens that have been removed
    event PercentForRegen(
        address indexed liquidityProvider,
        address indexed asset,
        uint256 tokenAmount,
        uint256 cTokenAmount
    );
}
