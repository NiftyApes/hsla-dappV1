import cEthJSON from '../external/cEth/cEth.json';
import LendingDeploymentJSON from '../generated/deployments/localhost/NiftyApesLending.json';
import LiquidityDeploymentJSON from '../generated/deployments/localhost/NiftyApesLiquidity.json';
import OffersDeploymentJSON from '../generated/deployments/localhost/NiftyApesOffers.json';
import SigLendingDeploymentJSON from '../generated/deployments/localhost/NiftyApesSigLending.json';

import YourCollectibleDeploymentJSON from '../generated/deployments/localhost/YourCollectible.json';

export const BAYC_CONTRACT_ADDRESS =
  '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d';
export const MAYC_CONTRACT_ADDRESS =
  '0x60e4d786628fea6478f785a6d7e704777c86a7c6';
export const DOODLES_CONTRACT_ADDRESS =
  '0x8a90cab2b38dba80c64b7734e58ee1db38b8992e';
export const NOUNS_CONTRACT_ADDRESS =
  '0x9c8ff314c9bc7f6e59a9d9225fb22946427edc03';

export const GOERLI = {
  LENDING: {
    ADDRESS: '0xCf6ac047C2E9A5e7cccb8887C4A141d69E5A16cC',
    ABI: LendingDeploymentJSON.abi,
  },
  LIQUIDITY: {
    ADDRESS: '0x0D54a1612f0af02b965d63DcA5DCEea3fF35dA16',
    ABI: LiquidityDeploymentJSON.abi,
  },
  OFFERS: {
    ADDRESS: '0xdaD319eEd71C286B90A6cfD4cb08ED754F835041',
    ABI: OffersDeploymentJSON.abi,
  },
  SIG_LENDING: {
    ADDRESS: '0xdC133330a326B72D102dEd45Af80f65088B12465',
    ABI: SigLendingDeploymentJSON.abi,
  },
  CETH: {
    ADDRESS: '0x20572e4c090f15667cf7378e16fad2ea0e2f3eff',
    ABI: cEthJSON.abi,
  },
} as const;

export const MAINNET = {
  LENDING: {
    ADDRESS: '0xa78362aA9194E74a9Ef267377E654Dd012c6C584',
    ABI: LendingDeploymentJSON.abi,
  },
  LIQUIDITY: {
    ADDRESS: '0x65d4F08DB768d1096aee1f9523758Eb5CA60AE9B',
    ABI: LiquidityDeploymentJSON.abi,
  },
  OFFERS: {
    ADDRESS: '0x540a59AD41a38b1Cc2B90D3adADC2F7417f1e451',
    ABI: OffersDeploymentJSON.abi,
  },
  SIG_LENDING: {
    ADDRESS: '0xc708c2efd6e6578809352d8e618c7f619f3b7f20',
    ABI: SigLendingDeploymentJSON.abi,
  },
  CETH: {
    ADDRESS: '0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5',
    ABI: cEthJSON.abi,
  },
} as const;

export const LOCAL = {
  LENDING: {
    ADDRESS: LendingDeploymentJSON.address,
    ABI: LendingDeploymentJSON.abi,
  },
  LIQUIDITY: {
    ADDRESS: LiquidityDeploymentJSON.address,
    ABI: LiquidityDeploymentJSON.abi,
  },
  OFFERS: {
    ADDRESS: OffersDeploymentJSON.address,
    ABI: OffersDeploymentJSON.abi,
  },
  CETH: {
    ADDRESS: cEthJSON.address,
    ABI: cEthJSON.abi,
  },
  SIG_LENDING: {
    ADDRESS: SigLendingDeploymentJSON.address,
    // Both ABIs are here so we can extract Lending events from SigLending receipts
    ABI: [...SigLendingDeploymentJSON.abi, ...LendingDeploymentJSON.abi],
  },
  YOUR_COLLECTIBLE: {
    ADDRESS: YourCollectibleDeploymentJSON.address,
    ABI: YourCollectibleDeploymentJSON.abi,
  },
} as const;
