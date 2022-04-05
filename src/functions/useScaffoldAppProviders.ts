import { useEthersAdaptorFromProviderOrSigners } from 'eth-hooks';
import { useEthersContext } from 'eth-hooks/context';
import { TEthersAdaptor, TEthersProvider, TNetworkInfo } from 'eth-hooks/models';

import { MAINNET_PROVIDER, LOCAL_PROVIDER, TARGET_NETWORK_INFO } from '../config/appConfig';

export interface IScaffoldAppProviders {
  currentProvider: TEthersProvider | undefined;
  targetNetwork: TNetworkInfo;
  mainnetAdaptor: TEthersAdaptor | undefined;
  localAdaptor: TEthersAdaptor | undefined;
}

export const useScaffoldProviders = (): IScaffoldAppProviders => {
  const ethersContext = useEthersContext();
  const [mainnetAdaptor] = useEthersAdaptorFromProviderOrSigners(MAINNET_PROVIDER);
  const [localAdaptor] = useEthersAdaptorFromProviderOrSigners(LOCAL_PROVIDER);

  return {
    currentProvider: ethersContext.provider ?? LOCAL_PROVIDER,
    mainnetAdaptor: mainnetAdaptor,
    localAdaptor: localAdaptor,
    targetNetwork: TARGET_NETWORK_INFO,
  };
};
