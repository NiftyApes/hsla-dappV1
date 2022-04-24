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

## How to run the app

```shell
yarn start
```

## How to run smart contracts locally with Hardhat

```shell
yarn hardhat-yarn-install
yarn compile
yarn build # use yarn rebuild after first time
yarn chain
yarn deploy
yarn fund-10 --to <address> # give 10 eth to address
yarn mint --to <address> # mint 6 NFTs to address
```
