//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.13;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/cryptography/draft-EIP712Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";
import "./interfaces/compound/ICEther.sol";
import "./interfaces/compound/ICERC20.sol";
import "./interfaces/niftyapes/INiftyApes.sol";
import "./lib/Math.sol";

/// @title Implemention of the INiftyApes interface
contract NiftyApes is OwnableUpgradeable, PausableUpgradeable, ReentrancyGuardUpgradeable, EIP712Upgradeable, INiftyApes {
  using ECDSAUpgradeable for bytes32;
  using SafeERC20Upgradeable for IERC20Upgradeable;
  using AddressUpgradeable for address payable;

  /// @dev Internal address used for for ETH in our mappings
  address private constant ETH_ADDRESS = address(0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE);

  /// @notice The maximum value that any fee on the protocol can be set to.
  ///         Fees on the protocol are denomimated in parts of 10_000.
  uint256 private constant MAX_FEE = 1_000;

  /// @notice The base value for fees in the protocol.
  uint256 private constant MAX_BPS = 10_000;

  /// @inheritdoc ILiquidity
  mapping(address => address) public override assetToCAsset;

  /// @notice The reverse mapping for assetToCAsset
  mapping(address => address) internal _cAssetToAsset;

  /// @notice The account balance for each asset of a user
  mapping(address => mapping(address => Balance)) internal _balanceByAccountByAsset;

  /// @inheritdoc ILiquidity
  mapping(address => uint256) public override maxBalanceByCAsset;

  /// @dev A mapping for a NFT to a loan auction.
  ///      The mapping has to be broken into two parts since an NFT is denomiated by its address (first part)
  ///      and its nftId (second part) in our code base.
  mapping(address => mapping(uint256 => LoanAuction)) private _loanAuctions;

  /// @dev A mapping for a NFT to an Offer
  ///      The mapping has to be broken into three parts since an NFT is denomiated by its address (first part)
  ///      and its nftId (second part), offers are reffered to by their hash (see #getEIP712EncodedOffer for details) (third part).
  mapping(address => mapping(uint256 => mapping(bytes32 => Offer))) private _nftOfferBooks;

  /// @dev A mapping for a NFT to a floor offer
  ///      Floor offers are different from offers on a specific NFT since they are valid on any NFT fro the same address.
  ///      Thus this mapping skips the nftId, see _nftOfferBooks above.
  mapping(address => mapping(bytes32 => Offer)) private _floorOfferBooks;

  /// @dev A mapping to mark a signature as used.
  ///      The mapping allows users to withdraw offers that they made by signature.
  mapping(bytes => bool) private _cancelledOrFinalized;

  /// @inheritdoc ILending
  uint96 public loanDrawFeeProtocolPerSecond;

  /// @inheritdoc ILending
  uint16 public refinancePremiumLenderBps;

  /// @inheritdoc ILending
  uint16 public refinancePremiumProtocolBps;

  /// @dev This empty reserved space is put in place to allow future versions to add new
  /// variables without shifting storage.
  uint256[500] private __gap;

  /// @notice The initializer for the NiftyApes protocol.
  ///         Nifty Apes is intended to be deployed behind a proxy amd thus needs to initialize
  ///         its state outsize of a constructor.
  function initialize() public initializer {
    EIP712Upgradeable.__EIP712_init("NiftyApes", "0.0.1");

    loanDrawFeeProtocolPerSecond = 50;
    refinancePremiumLenderBps = 50;
    refinancePremiumProtocolBps = 50;

    OwnableUpgradeable.__Ownable_init();
    PausableUpgradeable.__Pausable_init();
    ReentrancyGuardUpgradeable.__ReentrancyGuard_init();
  }

  /// @inheritdoc INiftyApesAdmin
  function setCAssetAddress(address asset, address cAsset) external onlyOwner {
    require(assetToCAsset[asset] == address(0), "asset already set");
    require(_cAssetToAsset[cAsset] == address(0), "casset already set");
    assetToCAsset[asset] = cAsset;
    _cAssetToAsset[cAsset] = asset;

    emit NewAssetListed(asset, cAsset);
  }

  /// @inheritdoc INiftyApesAdmin
  function setMaxCAssetBalance(address asset, uint256 maxBalance) external onlyOwner {
    maxBalanceByCAsset[getCAsset(asset)] = maxBalance;
  }

  /// @inheritdoc INiftyApesAdmin
  function pause() external onlyOwner {
    _pause();
  }

  /// @inheritdoc INiftyApesAdmin
  function unpause() external onlyOwner {
    _unpause();
  }

  /// @inheritdoc ILiquidity
  function getCAssetBalance(address account, address cAsset) public view returns (uint256) {
    return _balanceByAccountByAsset[account][cAsset].cAssetBalance;
  }

  /// @inheritdoc ILiquidity
  function supplyErc20(address asset, uint256 tokenAmount) external whenNotPaused nonReentrant returns (uint256) {
    address cAsset = getCAsset(asset);

    uint256 cTokensMinted = mintCErc20(msg.sender, address(this), asset, tokenAmount);

    _balanceByAccountByAsset[msg.sender][cAsset].cAssetBalance += cTokensMinted;

    requireMaxCAssetBalance(cAsset);

    emit Erc20Supplied(msg.sender, asset, tokenAmount, cTokensMinted);

    return cTokensMinted;
  }

  /// @inheritdoc ILiquidity
  function supplyCErc20(address cAsset, uint256 cTokenAmount) external whenNotPaused nonReentrant {
    getAsset(cAsset); // Ensures asset / cAsset is in the allow list
    IERC20Upgradeable cToken = IERC20Upgradeable(cAsset);

    cToken.safeTransferFrom(msg.sender, address(this), cTokenAmount);

    _balanceByAccountByAsset[msg.sender][cAsset].cAssetBalance += cTokenAmount;

    requireMaxCAssetBalance(cAsset);

    emit CErc20Supplied(msg.sender, cAsset, cTokenAmount);
  }

  /// @inheritdoc ILiquidity
  function withdrawErc20(address asset, uint256 tokenAmount) public whenNotPaused nonReentrant returns (uint256) {
    address cAsset = getCAsset(asset);
    IERC20Upgradeable underlying = IERC20Upgradeable(asset);

    uint256 cTokensBurnt = burnCErc20(asset, tokenAmount);

    withdrawCBalance(msg.sender, cAsset, cTokensBurnt);

    underlying.safeTransfer(msg.sender, tokenAmount);

    emit Erc20Withdrawn(msg.sender, asset, tokenAmount, cTokensBurnt);

    return cTokensBurnt;
  }

  /// @inheritdoc ILiquidity
  function withdrawCErc20(address cAsset, uint256 cTokenAmount) external whenNotPaused nonReentrant {
    // Making sure a mapping for cAsset exists
    getAsset(cAsset);
    IERC20Upgradeable cToken = IERC20Upgradeable(cAsset);

    withdrawCBalance(msg.sender, cAsset, cTokenAmount);

    cToken.safeTransfer(msg.sender, cTokenAmount);

    emit CErc20Withdrawn(msg.sender, cAsset, cTokenAmount);
  }

  /// @inheritdoc ILiquidity
  function supplyEth() external payable whenNotPaused nonReentrant returns (uint256) {
    address cAsset = getCAsset(ETH_ADDRESS);

    uint256 cTokensMinted = mintCEth(msg.value);

    _balanceByAccountByAsset[msg.sender][cAsset].cAssetBalance += cTokensMinted;

    requireMaxCAssetBalance(cAsset);

    emit EthSupplied(msg.sender, msg.value, cTokensMinted);

    return cTokensMinted;
  }

  /// @inheritdoc ILiquidity
  function withdrawEth(uint256 amount) external whenNotPaused nonReentrant returns (uint256) {
    address cAsset = getCAsset(ETH_ADDRESS);
    uint256 cTokensBurnt = burnCErc20(ETH_ADDRESS, amount);

    withdrawCBalance(msg.sender, cAsset, cTokensBurnt);

    payable(msg.sender).sendValue(amount);

    emit EthWithdrawn(msg.sender, amount, cTokensBurnt);

    return cTokensBurnt;
  }

  /// @inheritdoc ILending
  function getLoanAuction(address nftContractAddress, uint256 nftId) external view returns (LoanAuction memory) {
    return _loanAuctions[nftContractAddress][nftId];
  }

  /// @inheritdoc ILending
  function getOfferHash(Offer memory offer) public view returns (bytes32) {
    return
      _hashTypedDataV4(
        keccak256(
          abi.encode(
            offer.creator,
            offer.nftContractAddress,
            offer.nftId,
            offer.asset,
            offer.amount,
            offer.interestRatePerSecond,
            offer.duration,
            offer.expiration,
            offer.fixedTerms,
            offer.floorTerm
          )
        )
      );
  }

  /// @inheritdoc ILending
  function getOfferSignatureStatus(bytes calldata signature) external view returns (bool) {
    return _cancelledOrFinalized[signature];
  }

  /// @inheritdoc ILending
  function getOfferSigner(Offer memory offer, bytes memory signature) public view override returns (address) {
    return ECDSAUpgradeable.recover(getOfferHash(offer), signature);
  }

  /// @inheritdoc ILending
  function withdrawOfferSignature(Offer memory offer, bytes calldata signature) external whenNotPaused {
    requireAvailableSignature(signature);

    address signer = getOfferSigner(offer, signature);

    requireSigner(signer, msg.sender);
    requireOfferCreator(offer, msg.sender);

    markSignatureUsed(offer, signature);
  }

  function getOfferBook(
    address nftContractAddress,
    uint256 nftId,
    bool floorTerm
  ) internal view returns (mapping(bytes32 => Offer) storage) {
    return floorTerm ? _floorOfferBooks[nftContractAddress] : _nftOfferBooks[nftContractAddress][nftId];
  }

  /// @inheritdoc ILending
  function getOffer(
    address nftContractAddress,
    uint256 nftId,
    bytes32 offerHash,
    bool floorTerm
  ) public view returns (Offer memory) {
    return getOfferInternal(nftContractAddress, nftId, offerHash, floorTerm);
  }

  function getOfferInternal(
    address nftContractAddress,
    uint256 nftId,
    bytes32 offerHash,
    bool floorTerm
  ) internal view returns (Offer storage) {
    return getOfferBook(nftContractAddress, nftId, floorTerm)[offerHash];
  }

  /// @inheritdoc ILending
  function createOffer(Offer calldata offer) external whenNotPaused {
    address cAsset = getCAsset(offer.asset);

    requireOfferCreator(offer.creator, msg.sender);

    if (offer.lenderOffer) {
      uint256 offerTokens = assetAmountToCAssetAmount(offer.asset, offer.amount);
      requireCAssetBalance(msg.sender, cAsset, offerTokens);
    } else {
      requireNftOwner(offer.nftContractAddress, offer.nftId, msg.sender);
      requireNoFloorTerms(offer);
    }

    mapping(bytes32 => Offer) storage offerBook = getOfferBook(offer.nftContractAddress, offer.nftId, offer.floorTerm);

    bytes32 offerHash = getOfferHash(offer);

    offerBook[offerHash] = offer;

    emit NewOffer(offer.creator, offer.asset, offer.nftContractAddress, offer.nftId, offer, offerHash);
  }

  /// @inheritdoc ILending
  function removeOffer(
    address nftContractAddress,
    uint256 nftId,
    bytes32 offerHash,
    bool floorTerm
  ) external whenNotPaused {
    Offer memory offer = getOffer(nftContractAddress, nftId, offerHash, floorTerm);

    requireOfferCreator(offer.creator, msg.sender);

    doRemoveOffer(nftContractAddress, nftId, offerHash, floorTerm);
  }

  function doRemoveOffer(
    address nftContractAddress,
    uint256 nftId,
    bytes32 offerHash,
    bool floorTerm
  ) internal whenNotPaused {
    mapping(bytes32 => Offer) storage offerBook = getOfferBook(nftContractAddress, nftId, floorTerm);

    Offer storage offer = offerBook[offerHash];

    emit OfferRemoved(offer.creator, offer.asset, offer.nftContractAddress, nftId, offer, offerHash);

    delete offerBook[offerHash];
  }

  /// @inheritdoc ILending
  function executeLoanByBorrower(
    address nftContractAddress,
    uint256 nftId,
    bytes32 offerHash,
    bool floorTerm
  ) external payable whenNotPaused nonReentrant {
    Offer storage offerStorage = getOfferInternal(nftContractAddress, nftId, offerHash, floorTerm);

    // Make a memory copy
    Offer memory offer = offerStorage;

    requireLenderOffer(offer);

    // Remove the offer from storage, saving gas
    // We can only do this for non floor offers since
    // a floor offer can be used for multiple nfts
    if (!floorTerm) {
      doRemoveOffer(nftContractAddress, nftId, offerHash, floorTerm);
    }
    _executeLoanInternal(offer, offer.creator, msg.sender, nftId);
  }

  /// @inheritdoc ILending
  function executeLoanByBorrowerSignature(
    Offer calldata offer,
    bytes calldata signature,
    uint256 nftId
  ) external payable whenNotPaused nonReentrant {
    requireAvailableSignature(signature);

    address lender = getOfferSigner(offer, signature);
    requireOfferCreator(offer, lender);
    requireLenderOffer(offer);

    if (!offer.floorTerm) {
      requireMatchingNftId(offer, nftId);
      markSignatureUsed(offer, signature);
    }

    // execute state changes for executeLoanByBid
    _executeLoanInternal(offer, lender, msg.sender, nftId);
  }

  /// @inheritdoc ILending
  function executeLoanByLender(
    address nftContractAddress,
    uint256 nftId,
    bytes32 offerHash,
    bool floorTerm
  ) public payable whenNotPaused nonReentrant {
    Offer storage offerStorage = getOfferInternal(nftContractAddress, nftId, offerHash, floorTerm);

    // Make a memory copy
    Offer memory offer = offerStorage;

    requireBorrowerOffer(offer);
    requireNoFloorTerms(offer);

    doRemoveOffer(nftContractAddress, nftId, offerHash, floorTerm);

    _executeLoanInternal(offer, msg.sender, offer.creator, nftId);
  }

  /// @inheritdoc ILending
  function executeLoanByLenderSignature(Offer calldata offer, bytes calldata signature) external payable whenNotPaused nonReentrant {
    requireAvailableSignature(signature);

    address borrower = getOfferSigner(offer, signature);
    requireOfferCreator(offer, borrower);

    requireBorrowerOffer(offer);
    requireNoFloorTerms(offer);

    markSignatureUsed(offer, signature);

    _executeLoanInternal(offer, msg.sender, borrower, offer.nftId);
  }

  function _executeLoanInternal(
    Offer memory offer,
    address lender,
    address borrower,
    uint256 nftId
  ) internal {
    requireOfferPresent(offer);

    address cAsset = getCAsset(offer.asset);

    LoanAuction storage loanAuction = _loanAuctions[offer.nftContractAddress][nftId];

    requireNoOpenLoan(loanAuction);
    requireOfferNotExpired(offer);
    requireMinDurationForOffer(offer);
    requireNftOwner(offer.nftContractAddress, nftId, borrower);

    createLoan(loanAuction, offer, lender, borrower);

    transferNft(offer.nftContractAddress, nftId, borrower, address(this));

    uint256 cTokensBurned = burnCErc20(offer.asset, offer.amount);
    withdrawCBalance(lender, cAsset, cTokensBurned);

    sendValue(offer.asset, offer.amount, borrower);

    emit LoanExecuted(lender, offer.asset, borrower, offer.nftContractAddress, nftId, offer);

    emit AmountDrawn(borrower, offer.nftContractAddress, nftId, offer.amount, offer.amount);
  }

  /// @inheritdoc ILending
  function refinanceByBorrower(
    address nftContractAddress,
    uint256 nftId,
    bool floorTerm,
    bytes32 offerHash
  ) external payable whenNotPaused nonReentrant {
    Offer storage offerStorage = getOfferInternal(nftContractAddress, nftId, offerHash, floorTerm);

    // Make a memory copy
    Offer memory offer = offerStorage;

    if (!offer.floorTerm) {
      requireMatchingNftId(offer, nftId);
      // Only removing the offer if its not a floor term offer
      // Floor term offers can be used for multiple nfts
      doRemoveOffer(nftContractAddress, nftId, offerHash, floorTerm);
    }

    _refinanceByBorrower(offer, offer.creator, nftId);
  }

  /// @inheritdoc ILending
  function refinanceByBorrowerSignature(
    Offer calldata offer,
    bytes calldata signature,
    uint256 nftId
  ) external payable whenNotPaused nonReentrant {
    address signer = getOfferSigner(offer, signature);

    requireOfferCreator(offer, signer);
    requireAvailableSignature(signature);

    if (!offer.floorTerm) {
      requireMatchingNftId(offer, nftId);
      markSignatureUsed(offer, signature);
    }

    _refinanceByBorrower(offer, offer.creator, nftId);
  }

  function _refinanceByBorrower(
    Offer memory offer,
    address newLender,
    uint256 nftId
  ) internal {
    LoanAuction storage loanAuction = _loanAuctions[offer.nftContractAddress][nftId];
    requireMatchingAsset(offer.asset, loanAuction.asset);
    requireNftOwner(loanAuction, msg.sender);
    requireNoFixedTerm(loanAuction);
    requireOpenLoan(loanAuction);
    requireOfferNotExpired(offer);
    requireLenderOffer(offer);
    requireMinDurationForOffer(offer);

    address cAsset = getCAsset(offer.asset);

    updateInterest(loanAuction);

    uint256 fullAmount = loanAuction.amountDrawn + loanAuction.accumulatedLenderInterest;
    uint256 previousDrawn = loanAuction.amountDrawn;

    requireOfferAmount(offer, fullAmount);

    uint256 fullCTokenAmount = assetAmountToCAssetAmount(offer.asset, fullAmount);

    withdrawCBalance(newLender, cAsset, fullCTokenAmount);
    _balanceByAccountByAsset[loanAuction.lender][cAsset].cAssetBalance += fullCTokenAmount;

    // update Loan state
    loanAuction.lender = newLender;
    loanAuction.amount = offer.amount;
    loanAuction.interestRatePerSecond = offer.interestRatePerSecond;
    loanAuction.loanEndTimestamp = currentTimestamp() + offer.duration;
    loanAuction.amountDrawn = SafeCastUpgradeable.toUint128(fullAmount);
    loanAuction.accumulatedLenderInterest = 0;
    if (offer.fixedTerms) {
      loanAuction.fixedTerms = offer.fixedTerms;
    }

    emit Refinance(newLender, offer.asset, loanAuction.nftOwner, offer.nftContractAddress, nftId, offer);

    emit AmountDrawn(loanAuction.nftOwner, offer.nftContractAddress, nftId, loanAuction.amountDrawn - previousDrawn, loanAuction.amountDrawn);
  }

  /// @inheritdoc ILending
  function refinanceByLender(Offer calldata offer) external payable whenNotPaused nonReentrant {
    LoanAuction storage loanAuction = _loanAuctions[offer.nftContractAddress][offer.nftId];

    requireOpenLoan(loanAuction);
    requireOfferCreator(offer, msg.sender);
    requireLenderOffer(offer);
    requireLoanNotExpired(loanAuction);
    requireOfferParity(loanAuction, offer);
    requireValidDurationUpdate(loanAuction, offer);
    requireNoFixedTerm(loanAuction);
    requireNoFloorTerms(offer);
    requireOfferNotExpired(offer);
    requireMatchingAsset(offer.asset, loanAuction.asset);
    requireNoFixTermOffer(offer);

    address cAsset = getCAsset(offer.asset);

    updateInterest(loanAuction);

    // update LoanAuction struct
    loanAuction.amount = offer.amount;
    loanAuction.interestRatePerSecond = offer.interestRatePerSecond;
    loanAuction.loanEndTimestamp = currentTimestamp() + offer.duration;

    if (loanAuction.lender == offer.creator) {
      // If current lender is refinancing the loan they do not need to pay any fees or buy themselves out.
      // require prospective lender has sufficient available balance to refinance loan
      uint256 additionalTokens = assetAmountToCAssetAmount(offer.asset, offer.amount - loanAuction.amountDrawn);

      require(getCAssetBalance(offer.creator, cAsset) >= additionalTokens, "lender balance");
    } else {
      // calculate interest earned
      uint256 interestAndPremiumOwedToCurrentLender = loanAuction.accumulatedLenderInterest + ((loanAuction.amountDrawn * refinancePremiumLenderBps) / MAX_BPS);

      uint256 protocolPremium = (loanAuction.amountDrawn * refinancePremiumProtocolBps) / MAX_BPS;
      // calculate fullRefinanceAmount
      uint256 fullAmount = interestAndPremiumOwedToCurrentLender + protocolPremium + loanAuction.amountDrawn;

      // If refinancing is done by another lender they must buy out the loan and pay fees
      uint256 fullCTokenAmount = assetAmountToCAssetAmount(offer.asset, fullAmount);

      // require prospective lender has sufficient available balance to refinance loan
      require(getCAssetBalance(offer.creator, cAsset) >= fullCTokenAmount, "lender balance");

      uint256 protocolPremimuimInCtokens = assetAmountToCAssetAmount(offer.asset, protocolPremium);

      address currentlender = loanAuction.lender;

      // update LoanAuction lender
      loanAuction.lender = offer.creator;

      _balanceByAccountByAsset[currentlender][cAsset].cAssetBalance += fullCTokenAmount - protocolPremimuimInCtokens;
      _balanceByAccountByAsset[offer.creator][cAsset].cAssetBalance -= fullCTokenAmount;
      _balanceByAccountByAsset[owner()][cAsset].cAssetBalance += protocolPremimuimInCtokens;
    }

    emit Refinance(offer.creator, offer.asset, loanAuction.nftOwner, offer.nftContractAddress, offer.nftId, offer);
  }

  /// @inheritdoc ILending
  function drawLoanAmount(
    address nftContractAddress,
    uint256 nftId,
    uint256 drawAmount
  ) external whenNotPaused nonReentrant {
    LoanAuction storage loanAuction = _loanAuctions[nftContractAddress][nftId];

    address cAsset = getCAsset(loanAuction.asset);

    requireOpenLoan(loanAuction);
    requireNftOwner(loanAuction, msg.sender);
    requireFundsAvailable(loanAuction, drawAmount);
    requireLoanNotExpired(loanAuction);

    updateInterest(loanAuction);
    loanAuction.amountDrawn += SafeCastUpgradeable.toUint128(drawAmount);

    uint256 cTokensBurnt = burnCErc20(loanAuction.asset, drawAmount);
    withdrawCBalance(loanAuction.lender, cAsset, cTokensBurnt);

    sendValue(loanAuction.asset, drawAmount, loanAuction.nftOwner);

    emit AmountDrawn(msg.sender, nftContractAddress, nftId, drawAmount, loanAuction.amountDrawn);
  }

  /// @inheritdoc ILending
  function repayLoan(address nftContractAddress, uint256 nftId) external payable override whenNotPaused {
    RepayLoanStruct memory rls = RepayLoanStruct({
      nftContractAddress: nftContractAddress,
      nftId: nftId,
      repayFull: true,
      paymentAmount: 0,
      checkMsgSender: true
    });
    _repayLoanAmount(rls);
  }

  /// @inheritdoc ILending
  function repayLoanForAccount(address nftContractAddress, uint256 nftId) external payable override whenNotPaused {
    RepayLoanStruct memory rls = RepayLoanStruct({
      nftContractAddress: nftContractAddress,
      nftId: nftId,
      repayFull: true,
      paymentAmount: 0,
      checkMsgSender: false
    });

    _repayLoanAmount(rls);
  }

  /// @inheritdoc ILending
  function partialRepayLoan(
    address nftContractAddress,
    uint256 nftId,
    uint256 amount
  ) external payable whenNotPaused nonReentrant {
    RepayLoanStruct memory rls = RepayLoanStruct({
      nftContractAddress: nftContractAddress,
      nftId: nftId,
      repayFull: false,
      paymentAmount: amount,
      checkMsgSender: true
    });

    _repayLoanAmount(rls);
  }

  /// @dev Struct exitst since we ran out of stack space in _repayLoan
  struct RepayLoanStruct {
    address nftContractAddress;
    uint256 nftId;
    bool repayFull;
    uint256 paymentAmount;
    bool checkMsgSender;
  }

  function _repayLoanAmount(RepayLoanStruct memory rls) internal {
    LoanAuction storage loanAuction = _loanAuctions[rls.nftContractAddress][rls.nftId];
    address cAsset = getCAsset(loanAuction.asset);

    if (!rls.repayFull) {
      if (loanAuction.asset == ETH_ADDRESS) {
        requireMsgValue(rls.paymentAmount);
      }
      require(rls.paymentAmount < loanAuction.amountDrawn, "use repayLoan");
    }

    requireOpenLoan(loanAuction);

    if (rls.checkMsgSender) {
      require(msg.sender == loanAuction.nftOwner, "msg.sender is not the borrower");
    }

    updateInterest(loanAuction);

    uint256 payment = rls.repayFull
      ? loanAuction.accumulatedLenderInterest + loanAuction.accumulatedProtocolInterest + loanAuction.amountDrawn
      : rls.paymentAmount;

    uint256 cTokensMinted = handleLoanPayment(rls, loanAuction, payment);

    payoutCTokenBalances(loanAuction, cAsset, cTokensMinted, payment);

    if (rls.repayFull) {
      transferNft(rls.nftContractAddress, rls.nftId, address(this), loanAuction.nftOwner);

      emit LoanRepaid(loanAuction.lender, loanAuction.nftOwner, rls.nftContractAddress, rls.nftId, loanAuction.asset, payment);

      delete _loanAuctions[rls.nftContractAddress][rls.nftId];
    } else {
      loanAuction.amountDrawn -= SafeCastUpgradeable.toUint128(payment);

      emit PartialRepayment(loanAuction.lender, loanAuction.nftOwner, rls.nftContractAddress, rls.nftId, loanAuction.asset, rls.paymentAmount);
    }
  }

  function handleLoanPayment(
    RepayLoanStruct memory rls,
    LoanAuction storage loanAuction,
    uint256 payment
  ) internal returns (uint256) {
    if (loanAuction.asset == ETH_ADDRESS) {
      if (rls.repayFull) {
        require(msg.value >= payment, "msg.value too low");
      }

      uint256 cTokensMinted = mintCEth(payment);

      // If the caller has overpaid we send the extra ETH back
      if (payment < msg.value) {
        payable(msg.sender).sendValue(msg.value - payment);
      }
      return cTokensMinted;
    } else {
      return mintCErc20(msg.sender, address(this), loanAuction.asset, payment);
    }
  }

  /// @inheritdoc ILending
  function seizeAsset(address nftContractAddress, uint256 nftId) external whenNotPaused nonReentrant {
    LoanAuction storage loanAuction = _loanAuctions[nftContractAddress][nftId];
    getCAsset(loanAuction.asset); // Ensure asset mapping exists
    requireOpenLoan(loanAuction);

    requireLoanExpired(loanAuction);

    address currentLender = loanAuction.lender;
    address currentBorrower = loanAuction.nftOwner;

    delete _loanAuctions[nftContractAddress][nftId];

    transferNft(nftContractAddress, nftId, address(this), currentLender);

    emit AssetSeized(currentLender, currentBorrower, nftContractAddress, nftId);
  }

  /// @inheritdoc ILending
  function ownerOf(address nftContractAddress, uint256 nftId) public view returns (address) {
    return _loanAuctions[nftContractAddress][nftId].nftOwner;
  }

  function updateInterest(LoanAuction storage loanAuction) internal {
    (uint256 lenderInterest, uint256 protocolInterest) = calculateInterestAccrued(loanAuction);

    loanAuction.accumulatedLenderInterest += SafeCastUpgradeable.toUint128(lenderInterest);
    loanAuction.accumulatedProtocolInterest += SafeCastUpgradeable.toUint128(protocolInterest);
    loanAuction.lastUpdatedTimestamp = currentTimestamp();
  }

  /// @inheritdoc ILending
  function calculateInterestAccrued(address nftContractAddress, uint256 nftId) public view returns (uint256, uint256) {
    return calculateInterestAccrued(_loanAuctions[nftContractAddress][nftId]);
  }

  function calculateInterestAccrued(LoanAuction storage loanAuction) internal view returns (uint256 lenderInterest, uint256 protocolInterest) {
    uint256 currentTime = currentTimestamp();
    uint256 endTime = MathUpgradeable.min(currentTime, loanAuction.loanEndTimestamp);
    uint256 timePassed = endTime - loanAuction.lastUpdatedTimestamp;
    uint256 amountXTime = timePassed * loanAuction.amountDrawn;

    lenderInterest = (amountXTime * loanAuction.interestRatePerSecond) / 1 ether;
    protocolInterest = (amountXTime * loanAuction.loanDrawFeeProtocolPerSecond) / 1 ether;
  }

  /// @inheritdoc INiftyApesAdmin
  function updateLoanDrawProtocolFeePerSecond(uint96 newLoanDrawFeeProtocolPerSecond) external onlyOwner {
    emit LoanDrawProtocolFeeUpdated(loanDrawFeeProtocolPerSecond, newLoanDrawFeeProtocolPerSecond);
    loanDrawFeeProtocolPerSecond = newLoanDrawFeeProtocolPerSecond;
  }

  /// @inheritdoc INiftyApesAdmin
  function updateRefinancePremiumLenderBps(uint16 newPremiumLenderBps) external onlyOwner {
    require(newPremiumLenderBps <= MAX_FEE, "max fee");
    emit RefinancePremiumLenderBpsUpdated(refinancePremiumLenderBps, newPremiumLenderBps);
    refinancePremiumLenderBps = newPremiumLenderBps;
  }

  /// @inheritdoc INiftyApesAdmin
  function updateRefinancePremiumProtocolBps(uint16 newPremiumProtocolBps) external onlyOwner {
    require(newPremiumProtocolBps <= MAX_FEE, "max fee");
    emit RefinancePremiumProtocolBpsUpdated(refinancePremiumProtocolBps, newPremiumProtocolBps);
    refinancePremiumProtocolBps = newPremiumProtocolBps;
  }

  function markSignatureUsed(Offer memory offer, bytes memory signature) internal {
    _cancelledOrFinalized[signature] = true;

    emit OfferSignatureUsed(offer.nftContractAddress, offer.nftId, offer, signature);
  }

  function requireOfferPresent(Offer memory offer) internal pure {
    require(offer.asset != address(0), "no offer");
  }

  function requireOfferAmount(Offer memory offer, uint256 amount) internal pure {
    require(offer.amount >= amount, "offer amount");
  }

  function requireNoOpenLoan(LoanAuction storage loanAuction) internal view {
    require(loanAuction.lastUpdatedTimestamp == 0, "Loan already open");
  }

  function requireOpenLoan(LoanAuction storage loanAuction) internal view {
    require(loanAuction.lastUpdatedTimestamp != 0, "loan not active");
  }

  function requireLoanExpired(LoanAuction storage loanAuction) internal view {
    require(currentTimestamp() >= loanAuction.loanEndTimestamp, "loan not expired");
  }

  function requireLoanNotExpired(LoanAuction storage loanAuction) internal view {
    require(currentTimestamp() < loanAuction.loanEndTimestamp, "loan expired");
  }

  function requireOfferNotExpired(Offer memory offer) internal view {
    require(offer.expiration > currentTimestamp(), "offer expired");
  }

  function requireMinDurationForOffer(Offer memory offer) internal pure {
    require(offer.duration >= 1 days, "offer duration");
  }

  function requireLenderOffer(Offer memory offer) internal pure {
    require(offer.lenderOffer, "lender offer");
  }

  function requireBorrowerOffer(Offer memory offer) internal pure {
    require(!offer.lenderOffer, "borrower offer");
  }

  function requireNoFloorTerms(Offer memory offer) internal pure {
    require(!offer.floorTerm, "floor term");
  }

  function requireNoFixedTerm(LoanAuction storage loanAuction) internal view {
    require(!loanAuction.fixedTerms, "fixed term loan");
  }

  function requireNoFixTermOffer(Offer memory offer) internal view {
    require(!offer.fixedTerms, "fixed term offer");
  }

  function requireNftOwner(
    address nftContractAddress,
    uint256 nftId,
    address owner
  ) internal view {
    require(IERC721Upgradeable(nftContractAddress).ownerOf(nftId) == owner, "nft owner");
  }

  function requireMatchingAsset(address asset1, address asset2) internal pure {
    require(asset1 == asset2, "asset mismatch");
  }

  function requireAvailableSignature(bytes memory signature) internal view {
    require(!_cancelledOrFinalized[signature], "signature not available");
  }

  function requireFundsAvailable(LoanAuction storage loanAuction, uint256 drawAmount) internal view {
    require((drawAmount + loanAuction.amountDrawn) <= loanAuction.amount, "funds overdrawn");
  }

  function requireNftOwner(LoanAuction storage loanAuction, address nftOwner) internal view {
    require(nftOwner == loanAuction.nftOwner, "nft owner");
  }

  function requireMatchingNftId(Offer memory offer, uint256 nftId) internal pure {
    require(nftId == offer.nftId, "offer nftId mismatch");
  }

  function requireMsgValue(uint256 amount) internal view {
    require(amount == msg.value, "msg value");
  }

  function requireOfferCreator(Offer memory offer, address creator) internal pure {
    require(creator == offer.creator, "offer creator mismatch");
  }

  function requireSigner(address signer, address expected) internal pure {
    require(signer == expected, "signer");
  }

  function requireOfferCreator(address signer, address expected) internal pure {
    require(signer == expected, "offer creator");
  }

  function requireCAssetBalance(
    address account,
    address cAsset,
    uint256 amount
  ) internal view {
    require(getCAssetBalance(account, cAsset) >= amount, "Insufficient cToken balance");
  }

  function requireOfferParity(LoanAuction storage loanAuction, Offer memory offer) internal view {
    // Caching fields here for gas usage
    uint256 amount = loanAuction.amount;
    uint256 interestRatePerSecond = loanAuction.interestRatePerSecond;
    uint256 loanEndTime = loanAuction.loanEndTimestamp;
    uint256 offerEndTime = currentTimestamp() + offer.duration;

    // Better amount
    if (offer.amount > amount && offer.interestRatePerSecond <= interestRatePerSecond && offerEndTime >= loanEndTime) {
      return;
    }

    // Lower interest rate
    if (offer.amount >= amount && offer.interestRatePerSecond < interestRatePerSecond && offerEndTime >= loanEndTime) {
      return;
    }

    // Longer duration
    if (offer.amount >= amount && offer.interestRatePerSecond <= interestRatePerSecond && offerEndTime > loanEndTime) {
      return;
    }

    revert("not an improvement");
  }

  function requireValidDurationUpdate(LoanAuction storage loanAuction, Offer memory offer) internal view {
    uint256 currentTime = currentTimestamp();

    // If the only part that is updated is the duration we enfore that its been changed by
    // at least one day
    // This prevents lenders from refinancing loands with too small of a change
    if (
      offer.amount == loanAuction.amount &&
      offer.interestRatePerSecond == loanAuction.interestRatePerSecond &&
      currentTime + offer.duration > loanAuction.loanEndTimestamp
    ) {
      require(currentTime + offer.duration >= (loanAuction.loanEndTimestamp + 1 days), "24 hours min");
    }
  }

  function createLoan(
    LoanAuction storage loanAuction,
    Offer memory offer,
    address lender,
    address borrower
  ) internal {
    loanAuction.nftOwner = borrower;
    loanAuction.lender = lender;
    loanAuction.asset = offer.asset;
    loanAuction.amount = offer.amount;
    loanAuction.interestRatePerSecond = offer.interestRatePerSecond;
    loanAuction.loanEndTimestamp = currentTimestamp() + offer.duration;
    loanAuction.lastUpdatedTimestamp = currentTimestamp();
    loanAuction.amountDrawn = offer.amount;
    loanAuction.fixedTerms = offer.fixedTerms;
    loanAuction.loanDrawFeeProtocolPerSecond = loanDrawFeeProtocolPerSecond;
  }

  function transferNft(
    address nftContractAddress,
    uint256 nftId,
    address from,
    address to
  ) internal {
    IERC721Upgradeable(nftContractAddress).transferFrom(from, to, nftId);
  }

  function sendValue(
    address asset,
    uint256 amount,
    address to
  ) internal {
    if (asset == ETH_ADDRESS) {
      payable(to).sendValue(amount);
    } else {
      IERC20Upgradeable(asset).safeTransfer(to, amount);
    }
  }

  function payoutCTokenBalances(
    LoanAuction storage loanAuction,
    address cAsset,
    uint256 totalCTokens,
    uint256 totalPayment
  ) internal {
    uint256 cTokensToLender = (totalCTokens * (loanAuction.amountDrawn + loanAuction.accumulatedLenderInterest)) / totalPayment;
    uint256 cTokensToProtocol = (totalCTokens * loanAuction.accumulatedProtocolInterest) / totalPayment;

    _balanceByAccountByAsset[loanAuction.lender][cAsset].cAssetBalance += cTokensToLender;
    _balanceByAccountByAsset[owner()][cAsset].cAssetBalance += cTokensToProtocol;
  }

  function currentTimestamp() internal view returns (uint32) {
    return SafeCastUpgradeable.toUint32(block.timestamp);
  }

  // This is needed to receive ETH when calling withdrawing ETH from compund
  // solhint-disable-next-line no-empty-blocks
  receive() external payable {}

  function requireMaxCAssetBalance(address cAsset) internal view {
    uint256 maxCAssetBalance = maxBalanceByCAsset[cAsset];
    if (maxCAssetBalance != 0) {
      require(maxCAssetBalance >= ICERC20(cAsset).balanceOf(address(this)), "max casset");
    }
  }

  function mintCErc20(
    address from,
    address to,
    address asset,
    uint256 amount
  ) internal returns (uint256) {
    address cAsset = assetToCAsset[asset];
    IERC20Upgradeable underlying = IERC20Upgradeable(asset);
    ICERC20 cToken = ICERC20(cAsset);

    underlying.safeTransferFrom(from, to, amount);
    underlying.safeIncreaseAllowance(cAsset, amount);

    uint256 cTokenBalanceBefore = cToken.balanceOf(address(this));
    require(cToken.mint(amount) == 0, "cToken mint");
    uint256 cTokenBalanceAfter = cToken.balanceOf(address(this));
    return cTokenBalanceAfter - cTokenBalanceBefore;
  }

  function mintCEth(uint256 amount) internal returns (uint256) {
    address cAsset = assetToCAsset[ETH_ADDRESS];
    ICEther cToken = ICEther(cAsset);
    uint256 cTokenBalanceBefore = cToken.balanceOf(address(this));
    cToken.mint{ value: amount }();
    uint256 cTokenBalanceAfter = cToken.balanceOf(address(this));
    return cTokenBalanceAfter - cTokenBalanceBefore;
  }

  function burnCErc20(address asset, uint256 amount) internal returns (uint256) {
    address cAsset = assetToCAsset[asset];
    ICERC20 cToken = ICERC20(cAsset);

    uint256 cTokenBalanceBefore = cToken.balanceOf(address(this));
    require(cToken.redeemUnderlying(amount) == 0, "redeemUnderlying failed");
    uint256 cTokenBalanceAfter = cToken.balanceOf(address(this));
    return cTokenBalanceBefore - cTokenBalanceAfter;
  }

  function assetAmountToCAssetAmount(address asset, uint256 amount) internal returns (uint256) {
    address cAsset = assetToCAsset[asset];
    ICERC20 cToken = ICERC20(cAsset);

    uint256 exchangeRateMantissa = cToken.exchangeRateCurrent();
    return Math.divScalarByExpTruncate(amount, exchangeRateMantissa);
  }

  function getCAsset(address asset) internal view returns (address) {
    address cAsset = assetToCAsset[asset];
    require(cAsset != address(0), "asset allow list");
    require(asset == _cAssetToAsset[cAsset], "non matching allow list");
    return cAsset;
  }

  function getAsset(address cAsset) internal view returns (address) {
    address asset = _cAssetToAsset[cAsset];
    require(asset != address(0), "cAsset allow list");
    require(cAsset == assetToCAsset[asset], "non matching allow list");
    return asset;
  }

  function withdrawCBalance(
    address account,
    address cAsset,
    uint256 cTokenAmount
  ) internal {
    requireCAssetBalance(account, cAsset, cTokenAmount);
    _balanceByAccountByAsset[account][cAsset].cAssetBalance -= cTokenAmount;
  }
}
