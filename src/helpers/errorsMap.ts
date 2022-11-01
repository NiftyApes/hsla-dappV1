export const humanizeContractError = (error: string): string => {
  const code = error.split(':')[1].trim().replace(/[']/g, '');

  switch (code) {
    case '00001':
      return 'Lender does not have a sufficient balance';

    case '00002':
      return 'max fee';

    case '00003':
      return 'Non 65 byte signatures are unsupported';

    case '00004':
      return 'Offer provided does not exist in the NiftyApes offer book';

    case '00005':
      return 'Refinance offer amount must cover the full cost of the loan plus interest earned';

    case '00006':
      return 'A loan for this asset already exists';

    case '00007':
      return 'This loan must be active to perform this action';

    case '00008':
      return 'This loan has not yet expired';

    case '00009':
      return 'This loan has already expired';

    case '00010':
      return 'This offer has already expired';

    case '00011':
      return 'Offers must have a duration of at least 24 hours';

    case '00012':
      return 'Must be a lender offer';

    case '00013':
      return 'Must be a borrower offer';

    case '00014':
      return 'This offer must not be a floor term offer';

    case '00015':
      return 'This offer must not be a fixed term loan';

    case '00016':
      return 'This offer must be a fixed term loan';

    case '00017':
      return 'Cannot perform transaction this is an OFAC sanctioned address';

    case '00018':
      return 'Borrower must be the owner of the NFT';

    case '00019':
      return 'Offer asset and loan asset do not match';

    case '00020':
      return 'Total amount drawn cannot be greater than the loan amount offered';

    case '00021':
      return 'Must be the nftOwner listed on the loan';

    case '00022':
      return 'NFT ids must match';

    case '00023':
      return 'msg.value must be greater than 0';

    case '00024':
      return 'Must be the offer creator';

    case '00025':
      return 'Terms must be better in at least one category';

    case '00026':
      return 'Current terms are different than expected';

    case '00027':
      return 'Current loan is different than expected';

    case '00028':
      return 'msg.sender is not the borrower';

    case '00029':
      return 'Cannot fully repay loan via partialRepayment. Please use repayLoan.';

    case '00030':
      return 'msg.value must be greater than or equal to payment amount';

    case '00031':
      return 'Must be an authorized address to call this function';

    case '00032':
      return 'This signature has been cancelled by its signer';

    case '00033':
      return 'Not the expected signer';

    case '00034':
      return 'There is an insufficient balance to perform this action';

    case '00035':
      return 'LendingContract: cannot be address(0)';

    case '00036':
      return 'LiquidityContract: cannot be address(0)';

    case '00037':
      return 'The cToken mint function failed on the Compound contract';

    case '00038':
      return 'The redeemUnderlying function failed on the Compound contract';

    case '00039':
      return 'The new Regen Collective revenue share % must greater than the old %';

    case '00040':
      return 'This asset does not exist in the asset allow list';

    case '00041':
      return 'This cAsset does not exist in the cAsset allow list';

    case '00042':
      return 'Asset mismatch between allow lists';

    case '00043':
      return 'ETH not directly transferable to this contract';

    case '00044':
      return 'This action increases the TVL of this asset past the protocol limit';

    case '00045':
      return 'Amount must be greater than 0';

    case '00046':
      return 'This offer already exists in the NiftyApes offer book';

    case '00051':
      return 'This floor offer has already exhausted all of its uses';

    case 'revert':
      return 'Transaction reverted';

    default:
      return `unknown error code: ${code}`;
  }
};
