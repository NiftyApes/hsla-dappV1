//SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "./ILendingEvents.sol";
import "./ILendingStructs.sol";

/// @title The lending interface for Nifty Apes
///        This interface is intended to be used for interacting with loans on the protocol.
interface ILending is ILendingEvents, ILendingStructs {
    /// @notice Returns the fee that computes protocol interest
    ///         This fee is the basis points in order to calculate interest per second
    function protocolInterestBps() external view returns (uint96);

    /// @notice Returns the fee for refinancing a loan that the new lender has to pay
    ///         Fees are denomiated in basis points, parts of 10_000
    function refinancePremiumLenderBps() external view returns (uint16);

    /// @notice Returns the fee for refinancing a loan that is paid to the protocol
    ///         Fees are denomiated in basis points, parts of 10_000
    function refinancePremiumProtocolBps() external view returns (uint16);

    /// @notice Returns the basis points of revenue sent to the Regen Collective
    ///         Denomiated in basis points, parts of 10_000
    function regenCollectiveBpsOfRevenue() external view returns (uint16);

    /// @notice Returns the address for the Regen Collective
    function regenCollectiveAddress() external view returns (address);

    /// @notice Returns a loan aution identified by a given nft.
    /// @param nftContractAddress The address of the NFT collection
    /// @param nftId The id of a specified NFT
    function getLoanAuction(address nftContractAddress, uint256 nftId)
        external
        view
        returns (LoanAuction memory auction);

    /// @notice Returns an EIP712 standard compatiable hash for a given offer
    ///         This hash can be signed to create a valid offer.
    /// @param offer The offer to compute the hash for
    function getOfferHash(Offer memory offer) external view returns (bytes32);

    /// @notice Returns the signer of an offer or throws an error.
    /// @param offer The offer to use for retrieving the signer
    /// @param signature The signature to use for retrieving the signer
    function getOfferSigner(Offer memory offer, bytes memory signature) external returns (address);

    /// @notice Returns true if a given signature has been revoked otherwise false
    /// @param signature The signature to check
    function getOfferSignatureStatus(bytes calldata signature) external view returns (bool status);

    /// @notice Withdraw a given offer
    ///         Calling this method allows users to withdraw a given offer by cancelling their signature on chain
    /// @param offer The offer to withdraw
    /// @param signature The signature of the offer
    function withdrawOfferSignature(Offer memory offer, bytes calldata signature) external;

    /// @notice Returns an offer from the on-chain offer books
    /// @param nftContractAddress The address of the NFT collection
    /// @param nftId The id of the specified NFT
    /// @param offerHash The hash of all parameters in an offer
    /// @param floorTerm Indicates whether this is a floor or individual NFT offer.
    function getOffer(
        address nftContractAddress,
        uint256 nftId,
        bytes32 offerHash,
        bool floorTerm
    ) external view returns (Offer memory offer);

    /// @notice Creates an offer on the on chain offer book
    /// @param offer The details of offer
    function createOffer(Offer calldata offer) external returns (bytes32);

    /// @notice Removes an offer from the on-chain offer book
    /// @param nftContractAddress The address of the NFT collection
    /// @param nftId The id of the specified NFT
    /// @param offerHash The hash of all parameters in an offer
    /// @param floorTerm Indicates whether this is a floor or individual NFT offer.
    function removeOffer(
        address nftContractAddress,
        uint256 nftId,
        bytes32 offerHash,
        bool floorTerm
    ) external;

    /// @notice Start a loan as the borrower using an offer from the on chain offer book.
    ///         The caller of this method has to be the current owner of the NFT
    /// @param nftContractAddress The address of the NFT collection
    /// @param nftId The id of the specified NFT
    /// @param offerHash The hash of all parameters in an offer
    /// @param floorTerm Indicates whether this is a floor or individual NFT offer.
    function executeLoanByBorrower(
        address nftContractAddress,
        uint256 nftId,
        bytes32 offerHash,
        bool floorTerm
    ) external payable;

    /// @notice Start a loan as the borrower using a signed offer.
    ///         The caller of this method has to be the current owner of the NFT
    ///         Since offers can be floorTerm offers they might not include a specific nft id,
    ///         thus the caller has to pass an extra nft id to the method to identify the nft.
    /// @param offer The details of the loan auction offer
    /// @param signature A signed offerHash
    /// @param nftId The id of a specified NFT
    function executeLoanByBorrowerSignature(
        Offer calldata offer,
        bytes memory signature,
        uint256 nftId
    ) external payable;

    /// @notice Start a loan as the lender using an offer from the on chain offer book.
    ///         Borrowers can make offers for loan terms on their NFTs and thus lenders can
    ///         execute these offers
    /// @param nftContractAddress The address of the NFT collection
    /// @param nftId The id of the specified NFT
    /// @param offerHash The hash of all parameters in an offer
    /// @param floorTerm Indicates whether this is a floor or individual NFT offer.
    function executeLoanByLender(
        address nftContractAddress,
        uint256 nftId,
        bytes32 offerHash,
        bool floorTerm
    ) external payable;

    /// @notice Start a loan as the lender using a borrowers offer and signature.
    ///         Borrowers can make offers for loan terms on their NFTs and thus lenders can
    ///         execute these offers
    /// @param offer The details of the loan auction offer
    /// @param signature A signed offerHash
    function executeLoanByLenderSignature(Offer calldata offer, bytes calldata signature)
        external
        payable;

    /// @notice Refinance a loan against the on chain offer book as the borrower.
    ///         The new offer has to cover all interest owed on the loan
    /// @param nftContractAddress The address of the NFT collection
    /// @param nftId The id of the specified NFT
    /// @param floorTerm Indicates whether this is a floor or individual NFT offer.
    /// @param offerHash The hash of all parameters in an offer. This is used as the uniquge identifer of an offer.
    function refinanceByBorrower(
        address nftContractAddress,
        uint256 nftId,
        bool floorTerm,
        bytes32 offerHash
    ) external;

    /// @notice Refinance a loan against an off chain signed offer as the borrower.
    ///         The new offer has to cover all interest owed on the loan
    /// @param offer The details of the loan auction offer
    /// @param signature The signature for the offer
    /// @param nftId The id of a specified NFT
    function refinanceByBorrowerSignature(
        Offer calldata offer,
        bytes memory signature,
        uint256 nftId
    ) external;

    /// @notice Refinance a loan against a new offer.
    ///         The new offer has to improve conditions for the borrower
    /// @param offer The details of the loan auction offer
    function refinanceByLender(Offer calldata offer) external;

    /// @notice Allows borrowers to draw a higher balance on their loan if it has been refiance with a higher maximum amount.
    ///         Drawing down value increases the maximum loan pay back amount and so is not automatically imposed on a refinance by lender, hence this function.
    /// @param nftContractAddress The address of the NFT collection
    /// @param nftId The id of the specified NFT
    /// @param drawAmount The amount of value to draw and add to the loan amountDrawn
    function drawLoanAmount(
        address nftContractAddress,
        uint256 nftId,
        uint256 drawAmount
    ) external;

    /// @notice Repay a loan and release the underlying collateral.
    ///         The method automatically computes owed interest.
    /// @param nftContractAddress The address of the NFT collection
    /// @param nftId The id of the specified NFT
    function repayLoan(address nftContractAddress, uint256 nftId) external payable;

    /// @notice Repay someone elses loan
    ///         This function is similar to repayLoan except that it allows for msg.sender to not be
    ///         the borrower of the loan.
    ///         The reason this is broken into another function is to make it harder to accidentally
    ///         be repaying someone elses loan.
    ///         Unless you are intending to repay someone elses loan you should be using #repayLoan instead
    /// @param nftContractAddress The address of the NFT collection
    /// @param nftId The id of the specified NFT
    function repayLoanForAccount(address nftContractAddress, uint256 nftId) external payable;

    /// @notice Repay parts of an open loan.
    ///         Repaying parts of a loan will change interest accumulation for the repaid part and thus some borrors may
    ///         prefer to repay parts earlier to save on overall payments.
    /// @param nftContractAddress The address of the NFT collection
    /// @param nftId The id of the specified NFT
    /// @param amount The amount of value to pay down on the principle of the loan
    function partialRepayLoan(
        address nftContractAddress,
        uint256 nftId,
        uint256 amount
    ) external payable;

    /// @notice Seizes an asset if the loan has expired.
    ///         This function can be called by anyone as soon as the loan is expired without having been repaid in full.
    ///         This function allows anyone to call it so that an automated bot may seize the asset on behalf of a lender.
    /// @param nftContractAddress The address of the NFT collection
    /// @param nftId The id of the specified NFT
    function seizeAsset(address nftContractAddress, uint256 nftId) external;

    /// @notice If a loan has expired, allows a lender to sell an NFT and recieve the proceeds.
    ///         This function can only be called by the lender as soon as the loan is expired without having been repaid.
    ///         This function is limited to the lender to prevent malicious use of the arbitrary calldata function.
    /// @param nftContractAddress The address of the NFT collection
    /// @param nftId The id of the specified NFT
    /// @param sellAddress The contract address of sell functionality
    /// @param sellCallData The callData of sell functionality
    /// @param minAmount The minimum amount the lender will accept for the sale
    function seizeAssetAndSell(
        address nftContractAddress,
        uint256 nftId,
        address sellAddress,
        bytes calldata sellCallData,
        uint256 minAmount
    ) external;

    /// @notice Returns the owner of a given nft if there is a current loan on the NFT, otherwise zero.
    /// @param nftContractAddress The address of the given nft contract
    /// @param nftId The id of the given nft
    function ownerOf(address nftContractAddress, uint256 nftId) external view returns (address);

    /// @notice Returns interest since the last update to the loan
    ///         This includes the accumulatedInterest over the life of loan paid to previous lenders to buy refinacne the loan
    ///         and the interest from the current active interest period.
    /// @param nftContractAddress The address of the NFT collection
    /// @param nftId The id of the specified NFT
    function calculateInterestAccrued(address nftContractAddress, uint256 nftId)
        external
        view
        returns (uint256, uint256);
}
