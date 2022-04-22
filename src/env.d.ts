interface ImportMetaEnv {
  readonly DEV: boolean;
  readonly PROD: boolean;
  readonly MODE: 'development' | 'production';

  readonly ENV_APP_TARGET_NETWORK: string;
  readonly ENV_RPC_MAINNET: string;
  readonly ENV_RPC_MAINNET_INFURA: string;
  readonly ENV_KEY_INFURA: string;
  readonly ENV_KEY_ETHERSCAN: string;
  readonly ENV_KEY_BLOCKNATIVE_DAPPID: string;
  readonly ENV_FAUCET_ALLOWED: string;
  readonly ENV_BURNER_FALLBACK_ALLOWED: string;
  readonly ENV_CONNECT_TO_BURNER_AUTOMATICALLY: string;
  readonly REACT_APP_INFURA_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
