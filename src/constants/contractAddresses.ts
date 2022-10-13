import cEthJSON from '../external/cEth/cEth.json';
import LendingDeploymentJSON from '../generated/deployments/localhost/NiftyApesLending.json';
import LiquidityDeploymentJSON from '../generated/deployments/localhost/NiftyApesLiquidity.json';
import OffersDeploymentJSON from '../generated/deployments/localhost/NiftyApesOffers.json';

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
  CETH: {
    ADDRESS: '0x20572e4c090f15667cf7378e16fad2ea0e2f3eff',
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
  CETH: { ADDRESS: cEthJSON.address, ABI: cEthJSON.abi },
} as const;
