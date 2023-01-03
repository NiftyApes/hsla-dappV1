import { EIP1193Provider } from '@web3-onboard/core';

import {
  LendingContract,
  LiquidityContract,
  OffersContract,
  SigLendingContract,
} from 'nft/model';

import { GNOSIS, GOERLI, LOCAL, MAINNET } from 'constants/contractAddresses';

import { Contract } from 'ethers';
import { getEthersContractWithEIP1193Provider } from './getEthersContractWithEIP1193Provider';

import {
  getStoreLendingContract,
  getStoreLiquidityContract,
  getStoreOffersContract,
  getStoreSigLendingContract,
  setStoreLendingContract,
  setStoreLiquidityContract,
  setStoreOffersContract,
  setStoreSigLendingContract,
} from '../app/store';

function doesProviderMismatchContract({
  provider,
  contract,
}: {
  provider: EIP1193Provider;
  contract: Contract;
}) {
  try {
    return (
      !(provider as any).connection &&
      (contract?.provider as any).provider.connection?.url !==
        (provider as any).connection?.url
    );
  } catch (e) {
    return true;
  }
}

export function getLocalLendingContract({
  provider,
}: {
  provider: EIP1193Provider;
}) {
  let contract = getStoreLendingContract();

  if (!contract || doesProviderMismatchContract({ provider, contract })) {
    contract = getEthersContractWithEIP1193Provider({
      abi: LOCAL.LENDING.ABI,
      address: LOCAL.LENDING.ADDRESS,
      provider,
    }) as LendingContract;

    setStoreLendingContract(contract);
  }

  return getStoreLendingContract();
}

export function getLocalSigLendingContract({
  provider,
}: {
  provider: EIP1193Provider;
}) {
  let contract = getStoreSigLendingContract();

  if (!contract || doesProviderMismatchContract({ provider, contract })) {
    contract = getEthersContractWithEIP1193Provider({
      abi: LOCAL.SIG_LENDING.ABI,
      address: LOCAL.SIG_LENDING.ADDRESS,
      provider,
    }) as SigLendingContract;

    setStoreSigLendingContract(contract);
  }

  return getStoreSigLendingContract();
}

export function getGoerliLendingContract({
  provider,
}: {
  provider: EIP1193Provider;
}) {
  let contract = getStoreLendingContract();

  if (!contract || doesProviderMismatchContract({ provider, contract })) {
    contract = getEthersContractWithEIP1193Provider({
      abi: GOERLI.LENDING.ABI,
      address: GOERLI.LENDING.ADDRESS,
      provider,
    }) as LendingContract;

    setStoreLendingContract(contract);
  }

  return getStoreLendingContract();
}

export function getGoerliSigLendingContract({
  provider,
}: {
  provider: EIP1193Provider;
}) {
  let contract = getStoreSigLendingContract();

  if (!contract || doesProviderMismatchContract({ provider, contract })) {
    contract = getEthersContractWithEIP1193Provider({
      abi: GOERLI.SIG_LENDING.ABI,
      address: GOERLI.SIG_LENDING.ADDRESS,
      provider,
    }) as SigLendingContract;

    setStoreSigLendingContract(contract);
  }

  return getStoreSigLendingContract();
}

export function getMainnetLendingContract({
  provider,
}: {
  provider: EIP1193Provider;
}) {
  let contract = getStoreLendingContract();

  if (!contract || doesProviderMismatchContract({ provider, contract })) {
    contract = getEthersContractWithEIP1193Provider({
      abi: MAINNET.LENDING.ABI,
      address: MAINNET.LENDING.ADDRESS,
      provider,
    }) as LendingContract;

    setStoreLendingContract(contract);
  }

  return getStoreLendingContract();
}

export function getMainnetSigLendingContract({
  provider,
}: {
  provider: EIP1193Provider;
}) {
  let contract = getStoreSigLendingContract();

  if (!contract || doesProviderMismatchContract({ provider, contract })) {
    contract = getEthersContractWithEIP1193Provider({
      abi: MAINNET.SIG_LENDING.ABI,
      address: MAINNET.SIG_LENDING.ADDRESS,
      provider,
    }) as SigLendingContract;

    setStoreSigLendingContract(contract);
  }

  return getStoreSigLendingContract();
}

export function getGnosisLendingContract({
  provider,
}: {
  provider: EIP1193Provider;
}) {
  let contract = getStoreLendingContract();

  if (!contract || doesProviderMismatchContract({ provider, contract })) {
    contract = getEthersContractWithEIP1193Provider({
      abi: GNOSIS.LENDING.ABI,
      address: GNOSIS.LENDING.ADDRESS,
      provider,
    }) as LendingContract;

    setStoreLendingContract(contract);
  }

  return getStoreLendingContract();
}

export function getGnosisSigLendingContract({
  provider,
}: {
  provider: EIP1193Provider;
}) {
  let contract = getStoreSigLendingContract();

  if (!contract || doesProviderMismatchContract({ provider, contract })) {
    contract = getEthersContractWithEIP1193Provider({
      abi: GNOSIS.SIG_LENDING.ABI,
      address: GNOSIS.SIG_LENDING.ADDRESS,
      provider,
    }) as SigLendingContract;

    setStoreSigLendingContract(contract);
  }

  return getStoreSigLendingContract();
}

export function getLocalLiquidityContract({
  provider,
}: {
  provider: EIP1193Provider;
}) {
  let contract = getStoreLiquidityContract();

  if (!contract || doesProviderMismatchContract({ provider, contract })) {
    contract = getEthersContractWithEIP1193Provider({
      abi: LOCAL.LIQUIDITY.ABI,
      address: LOCAL.LIQUIDITY.ADDRESS,
      provider,
    }) as LiquidityContract;

    setStoreLiquidityContract(contract);
  }

  return contract;
}

export function getGoerliLiquidityContract({
  provider,
}: {
  provider: EIP1193Provider;
}) {
  let contract = getStoreLiquidityContract();

  if (!contract || doesProviderMismatchContract({ provider, contract })) {
    contract = getEthersContractWithEIP1193Provider({
      abi: GOERLI.LIQUIDITY.ABI,
      address: GOERLI.LIQUIDITY.ADDRESS,
      provider,
    }) as LiquidityContract;

    setStoreLiquidityContract(contract);
  }

  return contract;
}

export function getMainnetLiquidityContract({
  provider,
}: {
  provider: EIP1193Provider;
}) {
  let contract = getStoreLiquidityContract();

  if (!contract || doesProviderMismatchContract({ provider, contract })) {
    contract = getEthersContractWithEIP1193Provider({
      abi: MAINNET.LIQUIDITY.ABI,
      address: MAINNET.LIQUIDITY.ADDRESS,
      provider,
    }) as LiquidityContract;

    setStoreLiquidityContract(contract);
  }

  return contract;
}

export function getGnosisLiquidityContract({
  provider,
}: {
  provider: EIP1193Provider;
}) {
  let contract = getStoreLiquidityContract();

  if (!contract || doesProviderMismatchContract({ provider, contract })) {
    contract = getEthersContractWithEIP1193Provider({
      abi: GNOSIS.LIQUIDITY.ABI,
      address: GNOSIS.LIQUIDITY.ADDRESS,
      provider,
    }) as LiquidityContract;

    setStoreLiquidityContract(contract);
  }

  return contract;
}

export function getLocalOffersContract({
  provider,
}: {
  provider: EIP1193Provider;
}) {
  let contract = getStoreOffersContract();

  if (!contract || doesProviderMismatchContract({ provider, contract })) {
    contract = getEthersContractWithEIP1193Provider({
      abi: LOCAL.OFFERS.ABI,
      address: LOCAL.OFFERS.ADDRESS,
      provider,
    }) as OffersContract;

    setStoreOffersContract(contract);
  }

  return contract;
}

export function getGoerliOffersContract({
  provider,
}: {
  provider: EIP1193Provider;
}) {
  let contract = getStoreOffersContract();

  if (!contract || doesProviderMismatchContract({ provider, contract })) {
    contract = getEthersContractWithEIP1193Provider({
      abi: GOERLI.OFFERS.ABI,
      address: GOERLI.OFFERS.ADDRESS,
      provider,
    }) as OffersContract;

    setStoreOffersContract(contract);
  }

  return contract;
}

export function getMainnetOffersContract({
  provider,
}: {
  provider: EIP1193Provider;
}) {
  let contract = getStoreOffersContract();

  if (!contract || doesProviderMismatchContract({ provider, contract })) {
    contract = getEthersContractWithEIP1193Provider({
      abi: MAINNET.OFFERS.ABI,
      address: MAINNET.OFFERS.ADDRESS,
      provider,
    }) as OffersContract;

    setStoreOffersContract(contract);
  }

  return contract;
}

export function getGnosisOffersContract({
  provider,
}: {
  provider: EIP1193Provider;
}) {
  let contract = getStoreOffersContract();

  if (!contract || doesProviderMismatchContract({ provider, contract })) {
    contract = getEthersContractWithEIP1193Provider({
      abi: GNOSIS.OFFERS.ABI,
      address: GNOSIS.OFFERS.ADDRESS,
      provider,
    }) as OffersContract;

    setStoreOffersContract(contract);
  }

  return contract;
}
