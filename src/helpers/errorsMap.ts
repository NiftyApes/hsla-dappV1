export const humanizeContractError = (error: string): string => {
  const code = error.split('reason string')[1].trim().replace(/[']/g, '');

  switch (code) {
    case '00001':
      return 'lender balance';

    case '00002':
      return 'max fee';

    case '00003':
      return 'signature unsupported';

    case '00004':
      return 'no offer';

    case '00005':
      return 'offer amount';

    case '00006':
      return 'Loan already open';

    case '00007':
      return 'loan not active';

    case '00008':
      return 'loan not expired';

    case '00009':
      return 'loan expired';

    case '00010':
      return 'offer expired';

    case '00011':
      return 'offer duration';

    case '00012':
      return 'lender offer';

    case '00013':
      return 'borrower offer';

    case '00014':
      return 'floor term';

    case '00015':
      return 'fixed term loan';

    case '00016':
      return 'fixed term offer';

    case '00017':
      return 'sanctioned address';

    case '00018':
      return '721 owner';

    case '00019':
      return 'offer.asset and loanAuction.asset do not match';

    case '00020':
      return 'funds overdrawn';

    case '00021':
      return 'not nft owner';

    case '00022':
      return 'offer nftId mismatch';

    case '00023':
      return 'msg value';
    case '00024':
      return 'offer creator';

    case '00025':
      return 'not an improvement';

    case '00026':
      return 'unexpected terms';

    case '00027':
      return 'unexpected loan';

    case '00028':
      return 'msg.sender is not the borrower';

    case '00029':
      return 'use repayLoan';

    case '00030':
      return 'msg.value too low';

    case '00031':
      return 'not authorized';

    case '00032':
      return 'signature not available';

    case '00033':
      return 'signer';

    case '00034':
      return 'insufficient cToken balance';

    case '00035':
      return 'LendingContract: cannot be address(0)';

    case '00036':
      return 'LiquidityContract: cannot be address(0)';

    case '00037':
      return 'cToken mint';

    case '00038':
      return 'redeemUnderlying failed';

    case '00039':
      return 'must be greater';

    case '00040':
      return 'asset allow list';

    case '00041':
      return 'cAsset allow list';

    case '00042':
      return 'non matching allow list';

    case '00043':
      return 'eth not transferable';

    case '00044':
      return 'max casset';

    case '00045':
      return 'amount 0';

    case '00046':
      return 'offer already exists';

    case '00047':
      return 'amount must be >= ~uint32(0)';

    default:
      return `unknown error code: ${code}`;
  }
};
