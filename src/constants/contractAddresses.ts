import cEthJSON from '../external/cEth/cEth.json';
import LendingDeploymentJSON from '../generated/deployments/localhost/NiftyApesLending.json';
import LiquidityDeploymentJSON from '../generated/deployments/localhost/NiftyApesLiquidity.json';
import OffersDeploymentJSON from '../generated/deployments/localhost/NiftyApesOffers.json';

export const BAYC_CONTRACT_ADDRESS = '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d';
export const MAYC_CONTRACT_ADDRESS = '0x60e4d786628fea6478f785a6d7e704777c86a7c6';
export const DOODLES_CONTRACT_ADDRESS = '0x8a90cab2b38dba80c64b7734e58ee1db38b8992e';
export const NOUNS_CONTRACT_ADDRESS = '0x9c8ff314c9bc7f6e59a9d9225fb22946427edc03';

export const GOERLI = {
  LENDING: {
    ADDRESS: '0x75c2748AF264B06Fe6AcBd63faB1d8850F7DFE8a',
    ABI: LendingDeploymentJSON.abi,
  },
  LIQUIDITY: {
    ADDRESS: '0xDC2290418eA4a4D2BEFa3009DCFC8771Dcd3e139',
    ABI: LiquidityDeploymentJSON.abi,
  },
  OFFERS: { ADDRESS: '0x697DFD5327e607a8bB99e0F2f8FaC3C51011683d', ABI: OffersDeploymentJSON.abi },
  CETH: { ADDRESS: '0x20572e4c090f15667cf7378e16fad2ea0e2f3eff', ABI: cEthJSON.abi },
} as const;

export const LOCAL = {
  LENDING: { ADDRESS: LendingDeploymentJSON.address, ABI: LendingDeploymentJSON.abi },
  LIQUIDITY: { ADDRESS: LiquidityDeploymentJSON.address, ABI: LiquidityDeploymentJSON.abi },
  OFFERS: { ADDRESS: OffersDeploymentJSON.address, ABI: OffersDeploymentJSON.abi },
  CETH: { ADDRESS: cEthJSON.address, ABI: cEthJSON.abi },
} as const;
