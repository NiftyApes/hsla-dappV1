import { ethers } from 'ethers';
import { clearLocalStorage } from 'helpers/clearLocalStorage';

import { generateTestOfferInLocalStorage } from 'helpers/generateTestOfferInLocalStorage';

import YourCollectibleDeploymentJSON from '../generated/deployments/localhost/YourCollectible.json';

export function setupLocalStorageForTesting() {
  clearLocalStorage();

  const nftContractAddress = YourCollectibleDeploymentJSON.address;

  const nftId = '1';

  const ANNUAL_INTEREST_RATE = 120;

  const offer = {
    creator: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    nftContractAddress: '0x3155755b79aA083bd953911C92705B7aA82a18F9',
    interestRatePerSecond: ANNUAL_INTEREST_RATE / (365 * 24 * 60 * 60),
    fixedTerms: true,
    floorTerm: false,
    lenderOffer: true,
    nftId: 1,
    asset: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    amount: ethers.utils.parseUnits('1', 'ether').toString(),
    duration: 86400,
    expiration: 1651962193,
  };

  const offerHash = '0xb67fab899ee7b0228a5210f17005cff0611f1c765fb5ab4cc24365fdffaafce8';

  generateTestOfferInLocalStorage({
    nftContractAddress,
    nftId,
    offer,
    offerHash,
  });
}
