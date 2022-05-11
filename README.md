# Nifty Apes DApp

## Stacks

- React
- Chakra UI (emotion)
- Jest & React Testing Library for unit and integration test
- Storybook

## Engines

### Node

- You can install node version using nvm.
  Node = 16.11.0

### Yarn

- You can set yarn version by using this:

```shell
corepack prepare yarn@1.22.17 --activate
```

## How to install deps

```shell
yarn install
yarn run prepare
```

## Environment variables

Make sure that you copy `.env.example` to `.env.development` for local development. For production, make sure that you make `.env.production`.
The typical env vars should be asked to Zach.

## How to run smart contracts locally with Hardhat

```shell
yarn hardhat-yarn-install
yarn chain
yarn setup-local-chain # clean, compile, build, deploy
yarn fund-10 --to <address> # give 10 eth to address
yarn mint --to <address> # mint 6 NFTs to address
yarn setup-offer # deposit eth liquidity & create offer
```

## How to run the app

Make sure you've at least run `yarn chain` and `yarn setup-local-chain` above so that the frontend has access to required generated files.

```shell
yarn start
```

## Notes

Make sure you've added a local network to Metamask.

- _New RPC URL:_ http://localhost:8545
- _Chain ID:_ 31337
- _Currency Symbol:_ ETH

If the local chain isn't processing transactions and giving you a "Known transaction" message, try resetting Metamask: Settings > Advanced > Reset Account.

If the local chain is giving you an error like "Received invalid block tag 14724346. Latest block number is 14724009" (with different block numbers), try resetting Metamask: Settings > Advanced > Reset Account.
