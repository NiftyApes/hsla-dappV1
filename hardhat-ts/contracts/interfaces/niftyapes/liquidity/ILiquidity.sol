//SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "./ILiquidityEvents.sol";
import "./ILiquidityStructs.sol";

/// @title NiftyApes interface for managing liquidity.
interface ILiquidity is ILiquidityEvents, ILiquidityStructs {
    /// @notice Supply a given ERC20 token.
    ///         The ERC20 token is supplied to compound and users will be earning interest
    ///         on the token.
    ///         Callers need to first approve spending of the ERC20 before calling this method
    /// @param asset The address of the ERC20 token
    /// @param amount The number of tokens to supply
    function supplyErc20(address asset, uint256 amount) external returns (uint256);

    /// @notice Supply a given compound token.
    ///         This method allows users who have already supplied tokens into compounds to directly
    ///         supply their compound tokens to NiftyApes.
    /// @param cAsset The address of the compound ERC20 token
    /// @param amount The number of tokens to supply
    function supplyCErc20(address cAsset, uint256 amount) external;

    /// @notice Withdraw a given ERC20 token.
    ///         This method withdraws tokens from compound and unwraps the ctoken returning
    ///         the underlying asset to the user.
    /// @param asset The address of the ERC20 token
    /// @param amount The number of tokens to withdraw
    function withdrawErc20(address asset, uint256 amount) external returns (uint256);

    /// @notice Withdraw a given compund ERC20 token.
    ///         This method returns compound tokens directly to the user without returning the underlying
    /// @param cAsset The address of the compund ERC20 token
    /// @param amount The number of tokens to withdraw
    function withdrawCErc20(address cAsset, uint256 amount) external;

    /// @notice Supply Eth to NiftyApes.
    ///         Eth token is supplied to compound and users will be earning interest
    ///         on it.
    function supplyEth() external payable returns (uint256);

    /// @notice Withdraw Eth from NiftyApes.
    ///         This method withdraws tokens from compound and unwraps the ctoken returning
    ///         the underlying asset to the user.
    /// @param amount The amount of eth to withdraw
    function withdrawEth(uint256 amount) external returns (uint256);

    /// @notice Returns the address of a compound token if the compound token is in the allow list on NiftyApes, otherwise zero address.
    /// @param asset The assets address (e.g. USDC address)
    function assetToCAsset(address asset) external view returns (address);

    /// @notice Returns an accounts balance in compound tokens.
    /// @param account The users account address
    /// @param cAsset The compound token address
    function getCAssetBalance(address account, address cAsset) external view returns (uint256);

    /// @notice Returns a maximum balance of compound tokens, if there is no limit returns zero.
    /// @param cAsset The compound token address
    function maxBalanceByCAsset(address cAsset) external view returns (uint256);
}
