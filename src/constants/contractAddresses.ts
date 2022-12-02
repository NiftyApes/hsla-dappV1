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
    ADDRESS: '0x40dF7D76C59721b1E0b0e1cf92Dbd0A58D083De4',
    ABI: LendingDeploymentJSON.abi,
  },
  LIQUIDITY: {
    ADDRESS: '0x084A7cE2eb1ea21777Df239550234EEb9D9ef47c',
    ABI: LiquidityDeploymentJSON.abi,
  },
  OFFERS: {
    ADDRESS: '0x896A60e3f3457a3587F2ce30D812ffeDb7547EC7',
    ABI: OffersDeploymentJSON.abi,
  },
  SIG_LENDING: {
    ADDRESS: '0xf7c38F9b678cb96a6ee20448dab4a44B818dE2A6',
    // Both ABIs are here so we can extract Lending events from SigLending receipts
    ABI: [...SigLendingDeploymentJSON.abi, ...LendingDeploymentJSON.abi],
  },
  CETH: {
    ADDRESS: '0x20572e4c090f15667cF7378e16FaD2eA0e2f3EfF',
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
    ADDRESS: '0xC708c2eFD6E6578809352d8E618C7f619f3B7f20',
    // Both ABIs are here so we can extract Lending events from SigLending receipts
    ABI: [...SigLendingDeploymentJSON.abi, ...LendingDeploymentJSON.abi],
  },
  CETH: {
    ADDRESS: '0x4Ddc2D193948926D02f9B1fE9e1daa0718270ED5',
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

export const GNOSIS = {
  HEDGEY: {
    ADDRESS: '0x2AA5d15Eb36E5960d056e8FeA6E7BB3e2a06A351',
  },
  LENDING: {
    ADDRESS: '0x188Be78C746BEaFa2a96489719881e9C0a5AB06E',
    ABI: LendingDeploymentJSON.abi,
  },
  LIQUIDITY: {
    ADDRESS: '0x531f3d3CfAeAE4017A5af53a48575dD25E09404f',
    ABI: LiquidityDeploymentJSON.abi,
  },
  OFFERS: {
    ADDRESS: '0x436E4E12C2E1eb3D30013d98b94591dAA2c6910E',
    ABI: OffersDeploymentJSON.abi,
  },
  SIG_LENDING: {
    ADDRESS: '0x26dC993c23a4a0BFf380e161F89c26F9290e743B',
    // Both ABIs are here so we can extract Lending events from SigLending receipts
    ABI: [...SigLendingDeploymentJSON.abi, ...LendingDeploymentJSON.abi],
  },
  CETH: {
    ADDRESS: '0xc532237E1F688EA786E6D156965d5af04d1a09E6',
    ABI: cEthJSON.abi,
  },
};
