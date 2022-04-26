/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/order */
// This adds support for typescript paths mappings
//import 'tsconfig-paths/register';

import { BigNumber, Signer, utils } from 'ethers';

import '@typechain/hardhat';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-ethers';
import '@tenderly/hardhat-tenderly';
import 'hardhat-deploy';
import 'solidity-coverage';

import * as fs from 'fs';
import * as path from 'path';
import * as chalk from 'chalk';

import { Provider, TransactionRequest, TransactionResponse } from '@ethersproject/providers';

import { HardhatUserConfig, task } from 'hardhat/config';
import { HttpNetworkUserConfig } from 'hardhat/types';
import { THardhatDeployEthers } from './helpers/types/hardhat-type-extensions';
import { create } from 'ipfs-http-client';

import { config as envConfig } from 'dotenv';
envConfig({ path: '../vite-app-ts/.env' });

const ipfsAPI = require('ipfs-http-client');
const ipfs = ipfsAPI.create({
  host: 'ipfs.infura.io',
  port: '5001',
  protocol: 'https',
});

/**
 * Set your target network!!!
 */
console.log('HARDHAT_TARGET_NETWORK: ', process.env.HARDHAT_TARGET_NETWORK);

const { isAddress, getAddress, formatUnits, parseUnits } = utils;
//
// Select the network you want to deploy to here:
//

const mnemonicPath = './generated/mnemonic.secret';
const getMnemonic = (): string => {
  try {
    return fs.readFileSync(mnemonicPath).toString().trim();
  } catch (e) {
    if (process.env.HARDHAT_TARGET_NETWORK !== 'localhost') {
      console.log('☢️ WARNING: No mnemonic file created for a deploy account. Try `yarn run generate` and then `yarn run account`.');
    }
  }
  return '';
};

const config: HardhatUserConfig = {
  defaultNetwork: process.env.HARDHAT_TARGET_NETWORK,
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
    },
  },
  // don't forget to set your provider like:
  // REACT_APP_PROVIDER=https://dai.poa.network in packages/react-app/.env
  // (then your frontend will talk to your contracts on the live network!)
  // (you will need to restart the `yarn run start` dev server after editing the .env)

  networks: {
    hardhat: {
      chainId: 31337,
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/Of3Km_--Ow1fNnMhaETmwnmWBFFHF3ZY`,
        blockNumber: 13928264,
      },
      mining: {
        auto: false,
        interval: 5000,
      },
      gas: 12000000,
      blockGasLimit: 0x1fffffffffffff,
      allowUnlimitedContractSize: true,
    },
    localhost: {
      url: 'http://localhost:8545',
      gas: 12000000,
      blockGasLimit: 0x1fffffffffffff,
      allowUnlimitedContractSize: true,
      /*
        if there is no mnemonic, it will just use account 0 of the hardhat node to deploy
        (you can put in a mnemonic here to set the deployer locally)
      */
      // accounts: {
      //   mnemonic: mnemonic(),
      // },
    },
    rinkeby: {
      url: 'https://rinkeby.infura.io/v3/460f40a260564ac4a4f4b3fffb032dad', // <---- YOUR INFURA ID! (or it won't work)
      accounts: {
        mnemonic: getMnemonic(),
      },
    },
    kovan: {
      url: 'https://kovan.infura.io/v3/460f40a260564ac4a4f4b3fffb032dad', // <---- YOUR INFURA ID! (or it won't work)
      accounts: {
        mnemonic: getMnemonic(),
      },
    },
    mainnet: {
      url: 'https://mainnet.infura.io/v3/460f40a260564ac4a4f4b3fffb032dad', // <---- YOUR INFURA ID! (or it won't work)
      accounts: {
        mnemonic: getMnemonic(),
      },
    },
    ropsten: {
      url: 'https://ropsten.infura.io/v3/460f40a260564ac4a4f4b3fffb032dad', // <---- YOUR INFURA ID! (or it won't work)
      accounts: {
        mnemonic: getMnemonic(),
      },
    },
    goerli: {
      url: 'https://goerli.infura.io/v3/460f40a260564ac4a4f4b3fffb032dad', // <---- YOUR INFURA ID! (or it won't work)
      accounts: {
        mnemonic: getMnemonic(),
      },
    },
    xdai: {
      url: 'https://rpc.xdaichain.com/',
      gasPrice: 1000000000,
      accounts: {
        mnemonic: getMnemonic(),
      },
    },
    matic: {
      url: 'https://rpc-mainnet.maticvigil.com/',
      gasPrice: 1000000000,
      accounts: {
        mnemonic: getMnemonic(),
      },
    },
  },
  solidity: {
    compilers: [
      {
        version: '0.8.13',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.8.6',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.7.6',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.6.7',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  paths: {
    cache: './generated/cache',
    artifacts: './generated/artifacts',
    deployments: './generated/deployments',
  },
  typechain: {
    outDir: '../src/generated/contract-types',
  },
};
export default config;

const DEBUG = false;

function debug(text: string): void {
  if (DEBUG) {
    console.log(text);
  }
}

async function send(signer: Signer, txparams: any): Promise<TransactionResponse> {
  return await signer.sendTransaction(txparams);
  //    , (error, transactionHash) => {
  //     if (error) {
  //       debug(`Error: ${error}`);
  //     }
  //     debug(`transactionHash: ${transactionHash}`);
  //     // checkForReceipt(2, params, transactionHash, resolve)
  //   });
}

task('wallet', 'Create a wallet (pk) link', async (_, { ethers }) => {
  const randomWallet = ethers.Wallet.createRandom();
  const { privateKey } = randomWallet._signingKey();
  console.log(`🔐 WALLET Generated as ${randomWallet.address}`);
  console.log(`🔗 http://localhost:3000/pk#${privateKey}`);
});

task('fundedwallet', 'Create a wallet (pk) link and fund it with deployer?')
  .addOptionalParam('amount', 'Amount of ETH to send to wallet after generating')
  .addOptionalParam('url', 'URL to add pk to')
  .setAction(async (taskArgs: { url?: string; amount?: string }, hre) => {
    const { ethers } = hre;
    const randomWallet = ethers.Wallet.createRandom();
    const { privateKey } = randomWallet._signingKey();
    console.log(`🔐 WALLET Generated as ${randomWallet.address}`);
    const url = taskArgs.url != null ? taskArgs.url : 'http://localhost:3000';

    let localDeployerMnemonic: string | undefined;
    try {
      const mnemonic = fs.readFileSync(mnemonicPath);
      localDeployerMnemonic = mnemonic.toString().trim();
    } catch (e) {
      /* do nothing - this file isn't always there */
    }

    const amount = taskArgs.amount != null ? taskArgs.amount : '0.01';
    const tx = {
      to: randomWallet.address,
      value: ethers.utils.parseEther(amount),
    };

    // SEND USING LOCAL DEPLOYER MNEMONIC IF THERE IS ONE
    // IF NOT SEND USING LOCAL HARDHAT NODE:
    if (localDeployerMnemonic != null) {
      let deployerWallet = ethers.Wallet.fromMnemonic(localDeployerMnemonic);
      deployerWallet = deployerWallet.connect(ethers.provider as Provider);
      console.log(`💵 Sending ${amount} ETH to ${randomWallet.address} using deployer account`);
      const sendresult = await deployerWallet.sendTransaction(tx);
      console.log(`\n${url}/pk#${privateKey}\n`);
    } else {
      console.log(`💵 Sending ${amount} ETH to ${randomWallet.address} using local node`);
      console.log(`\n${url}/pk#${privateKey}\n`);
      return await send(ethers.provider.getSigner() as Signer, tx);
    }
  });

task('generate', 'Create a mnemonic for builder deploys', async (_, { ethers }) => {
  const bip39 = require('bip39');
  const hdkey = require('ethereumjs-wallet/hdkey');
  const mnemonic = bip39.generateMnemonic();
  if (DEBUG) console.log('mnemonic', mnemonic);
  const seed = await bip39.mnemonicToSeed(mnemonic);
  if (DEBUG) console.log('seed', seed);
  const hdwallet = hdkey.fromMasterSeed(seed);
  const walletHdPath = "m/44'/60'/0'/0/";
  const accountIndex = 0;
  const fullPath = walletHdPath + accountIndex;
  if (DEBUG) console.log('fullPath', fullPath);
  const wallet = hdwallet.derivePath(fullPath).getWallet();
  const privateKey = `0x${wallet._privKey.toString('hex')}`;
  if (DEBUG) console.log('privateKey', privateKey);
  const EthUtil = require('ethereumjs-util');
  const address = `0x${EthUtil.privateToAddress(wallet._privKey).toString('hex')}`;
  console.log(`🔐 Account Generated as ${address} and set as mnemonic in packages/hardhat`);
  console.log("💬 Use 'yarn run account' to get more information about the deployment account.");

  fs.writeFileSync(`./generated/${address}.secret`, mnemonic.toString());
  fs.writeFileSync(mnemonicPath, mnemonic.toString());
});

task('mineContractAddress', 'Looks for a deployer account that will give leading zeros')
  .addParam('searchFor', 'String to search for')
  .setAction(async (taskArgs, { network, ethers }) => {
    let contractAddress = '';
    let address;

    const bip39 = require('bip39');
    const hdkey = require('ethereumjs-wallet/hdkey');

    let mnemonic = '';
    while (contractAddress.indexOf(taskArgs.searchFor) != 0) {
      mnemonic = bip39.generateMnemonic();
      if (DEBUG) console.log('mnemonic', mnemonic);
      const seed = await bip39.mnemonicToSeed(mnemonic);
      if (DEBUG) console.log('seed', seed);
      const hdwallet = hdkey.fromMasterSeed(seed);
      const walletHdPath = "m/44'/60'/0'/0/";
      const accountIndex = 0;
      const fullPath = walletHdPath + accountIndex;
      if (DEBUG) console.log('fullPath', fullPath);
      const wallet = hdwallet.derivePath(fullPath).getWallet();
      const privateKey = `0x${wallet._privKey.toString('hex')}`;
      if (DEBUG) console.log('privateKey', privateKey);
      const EthUtil = require('ethereumjs-util');
      address = `0x${EthUtil.privateToAddress(wallet._privKey).toString('hex')}`;

      const rlp = require('rlp');
      const keccak = require('keccak');

      const nonce = 0x00; // The nonce must be a hex literal!
      const sender = address;

      const inputArr = [sender, nonce];
      const rlpEncoded = rlp.encode(inputArr);

      const contractAddressLong = keccak('keccak256').update(rlpEncoded).digest('hex');

      contractAddress = contractAddressLong.substring(24); // Trim the first 24 characters.
    }

    console.log(`⛏  Account Mined as ${address} and set as mnemonic in packages/hardhat`);
    console.log(`📜 This will create the first contract: ${chalk.magenta(`0x${contractAddress}`)}`);
    console.log("💬 Use 'yarn run account' to get more information about the deployment account.");

    fs.writeFileSync(`./generated/${address}_produces${contractAddress}.txt`, mnemonic.toString());
    fs.writeFileSync(mnemonicPath, mnemonic.toString());
  });

task('mint', 'String to search for')
  .addOptionalParam('to', 'address to mint to')
  .setAction(async (taskArgs, { network, ethers }, hre) => {
    const {} = hre;
    // This function copy-pasted from scaffold-eth
    const delayMS = 1000;

    const toAddress = taskArgs.to;

    console.log('\n\n 🎫 Minting to ' + toAddress + '...\n');

    // Might need to hand-edit contract address
    const yourCollectible = await ethers.getContractAt('YourCollectible', '0x276c216d241856199a83bf27b2286659e5b877d3');

    const buffalo = {
      description: "It's actually a bison?",
      external_url: 'https://austingriffith.com/portfolio/paintings/', // <-- this can link to a page for the specific file too
      image: 'https://austingriffith.com/images/paintings/buffalo.jpg',
      name: 'Buffalo',
      attributes: [
        {
          trait_type: 'BackgroundColor',
          value: 'green',
        },
        {
          trait_type: 'Eyes',
          value: 'googly',
        },
        {
          trait_type: 'Stamina',
          value: 42,
        },
      ],
    };
    console.log('Uploading buffalo...');
    const uploaded = await ipfs.add(JSON.stringify(buffalo));

    console.log('Minting buffalo with IPFS hash (' + uploaded.path + ')');
    await yourCollectible.mintItem(toAddress, uploaded.path, {
      gasLimit: 400000,
    });

    await sleep(delayMS);

    const zebra = {
      description: 'What is it so worried about?',
      external_url: 'https://austingriffith.com/portfolio/paintings/', // <-- this can link to a page for the specific file too
      image: 'https://austingriffith.com/images/paintings/zebra.jpg',
      name: 'Zebra',
      attributes: [
        {
          trait_type: 'BackgroundColor',
          value: 'blue',
        },
        {
          trait_type: 'Eyes',
          value: 'googly',
        },
        {
          trait_type: 'Stamina',
          value: 38,
        },
      ],
    };
    console.log('Uploading zebra...');
    const uploadedzebra = await ipfs.add(JSON.stringify(zebra));

    console.log('Minting zebra with IPFS hash (' + uploadedzebra.path + ')');
    await yourCollectible.mintItem(toAddress, uploadedzebra.path, {
      gasLimit: 400000,
    });

    await sleep(delayMS);

    const rhino = {
      description: 'What a horn!',
      external_url: 'https://austingriffith.com/portfolio/paintings/', // <-- this can link to a page for the specific file too
      image: 'https://austingriffith.com/images/paintings/rhino.jpg',
      name: 'Rhino',
      attributes: [
        {
          trait_type: 'BackgroundColor',
          value: 'pink',
        },
        {
          trait_type: 'Eyes',
          value: 'googly',
        },
        {
          trait_type: 'Stamina',
          value: 22,
        },
      ],
    };
    console.log('Uploading rhino...');
    const uploadedrhino = await ipfs.add(JSON.stringify(rhino));

    console.log('Minting rhino with IPFS hash (' + uploadedrhino.path + ')');
    await yourCollectible.mintItem(toAddress, uploadedrhino.path, {
      gasLimit: 400000,
    });

    await sleep(delayMS);

    const fish = {
      description: 'Is that an underbyte?',
      external_url: 'https://austingriffith.com/portfolio/paintings/', // <-- this can link to a page for the specific file too
      image: 'https://austingriffith.com/images/paintings/fish.jpg',
      name: 'Fish',
      attributes: [
        {
          trait_type: 'BackgroundColor',
          value: 'blue',
        },
        {
          trait_type: 'Eyes',
          value: 'googly',
        },
        {
          trait_type: 'Stamina',
          value: 15,
        },
      ],
    };
    console.log('Uploading fish...');
    const uploadedfish = await ipfs.add(JSON.stringify(fish));

    console.log('Minting fish with IPFS hash (' + uploadedfish.path + ')');
    await yourCollectible.mintItem(toAddress, uploadedfish.path, {
      gasLimit: 400000,
    });

    await sleep(delayMS);

    const flamingo = {
      description: 'So delicate.',
      external_url: 'https://austingriffith.com/portfolio/paintings/', // <-- this can link to a page for the specific file too
      image: 'https://austingriffith.com/images/paintings/flamingo.jpg',
      name: 'Flamingo',
      attributes: [
        {
          trait_type: 'BackgroundColor',
          value: 'black',
        },
        {
          trait_type: 'Eyes',
          value: 'googly',
        },
        {
          trait_type: 'Stamina',
          value: 6,
        },
      ],
    };
    console.log('Uploading flamingo...');
    const uploadedflamingo = await ipfs.add(JSON.stringify(flamingo));

    console.log('Minting flamingo with IPFS hash (' + uploadedflamingo.path + ')');
    await yourCollectible.mintItem(toAddress, uploadedflamingo.path, {
      gasLimit: 400000,
    });

    const godzilla = {
      description: 'Raaaar!',
      external_url: 'https://austingriffith.com/portfolio/paintings/', // <-- this can link to a page for the specific file too
      image: 'https://austingriffith.com/images/paintings/godzilla.jpg',
      name: 'Godzilla',
      attributes: [
        {
          trait_type: 'BackgroundColor',
          value: 'orange',
        },
        {
          trait_type: 'Eyes',
          value: 'googly',
        },
        {
          trait_type: 'Stamina',
          value: 99,
        },
      ],
    };
    console.log('Uploading godzilla...');
    const uploadedgodzilla = await ipfs.add(JSON.stringify(godzilla));

    console.log('Minting godzilla with IPFS hash (' + uploadedgodzilla.path + ')');
    await yourCollectible.mintItem(toAddress, uploadedgodzilla.path, {
      gasLimit: 400000,
    });
  });

task('account', 'Get balance informations for the deployment account.', async (_, { ethers }) => {
  const hdkey = require('ethereumjs-wallet/hdkey');
  const bip39 = require('bip39');
  const mnemonic = fs.readFileSync(mnemonicPath).toString().trim();
  if (DEBUG) console.log('mnemonic', mnemonic);
  const seed = await bip39.mnemonicToSeed(mnemonic);
  if (DEBUG) console.log('seed', seed);
  const hdwallet = hdkey.fromMasterSeed(seed);
  const walletHdPath = "m/44'/60'/0'/0/";
  const accountIndex = 0;
  const fullPath = walletHdPath + accountIndex;
  if (DEBUG) console.log('fullPath', fullPath);
  const wallet = hdwallet.derivePath(fullPath).getWallet();
  const privateKey = `0x${wallet._privKey.toString('hex')}`;
  if (DEBUG) console.log('privateKey', privateKey);
  const EthUtil = require('ethereumjs-util');
  const address = `0x${EthUtil.privateToAddress(wallet._privKey).toString('hex')}`;

  const qrcode = require('qrcode-terminal');
  qrcode.generate(address);
  console.log(`‍📬 Deployer Account is ${address}`);
  for (const n in config.networks) {
    // console.log(config.networks[n],n)
    try {
      const { url } = config.networks[n] as HttpNetworkUserConfig;
      const provider = new ethers.providers.JsonRpcProvider(url);
      const balance = await provider.getBalance(address);
      console.log(` -- ${n} --  -- -- 📡 `);
      console.log(`   balance: ${ethers.utils.formatEther(balance)}`);
      console.log(`   nonce: ${await provider.getTransactionCount(address)}`);
    } catch (e) {
      if (DEBUG) console.log(e);
    }
  }
});

const findFirstAddr = async (ethers: THardhatDeployEthers, addr: string): Promise<string> => {
  if (isAddress(addr)) {
    return getAddress(addr);
  }
  const accounts = await ethers.provider.listAccounts();
  if (accounts !== undefined) {
    const temp: string | undefined = accounts.find((f: string) => f === addr);
    if (temp != null && ethers.utils.isAddress(temp)) return temp[0];
  }
  throw new Error(`Could not normalize address: ${addr}`);
};

task('accounts', 'Prints the list of accounts', async (_, { ethers }) => {
  const accounts = await ethers.provider.listAccounts();
  accounts.forEach((account: any) => console.log(account));
});

task('blockNumber', 'Prints the block number', async (_, { ethers }) => {
  const blockNumber = await ethers.provider.getBlockNumber();
  console.log(blockNumber);
});

task('balance', "Prints an account's balance")
  .addPositionalParam('account', "The account's address")
  .setAction(async (taskArgs, { ethers }) => {
    const balance = await ethers.provider.getBalance(await findFirstAddr(ethers, taskArgs.account));
    console.log(formatUnits(balance, 'ether'), 'ETH');
  });

task('send', 'Send ETH')
  .addParam('from', 'From address or account index')
  .addOptionalParam('to', 'To address or account index')
  .addOptionalParam('amount', 'Amount to send in ether')
  .addOptionalParam('data', 'Data included in transaction')
  .addOptionalParam('gasPrice', 'Price you are willing to pay in gwei')
  .addOptionalParam('gasLimit', 'Limit of how much gas to spend')

  .setAction(async (taskArgs: { to?: string; from: string; amount?: string; gasPrice?: string; gasLimit?: number; data?: any }, { network, ethers }) => {
    const from = await findFirstAddr(ethers, taskArgs.from);
    debug(`Normalized from address: ${from}`);
    const fromSigner = ethers.provider.getSigner(from);

    let to;
    if (taskArgs.to != null) {
      to = await findFirstAddr(ethers, taskArgs.to);
      debug(`Normalized to address: ${to}`);
    }

    const txRequest: TransactionRequest = {
      from: await fromSigner.getAddress(),
      to,
      value: parseUnits(taskArgs.amount != null ? taskArgs.amount : '0', 'ether').toHexString(),
      nonce: await fromSigner.getTransactionCount(),
      gasPrice: parseUnits(taskArgs.gasPrice != null ? taskArgs.gasPrice : '1.001', 'gwei').toHexString(),
      gasLimit: taskArgs.gasLimit != null ? taskArgs.gasLimit : 24000,
      chainId: network.config.chainId,
    };

    if (taskArgs.data != null) {
      txRequest.data = taskArgs.data;
      debug(`Adding data to payload: ${txRequest.data}`);
    }
    debug(`${(txRequest.gasPrice as any) / 1000000000} gwei`);
    debug(JSON.stringify(txRequest, null, 2));

    return await send(fromSigner as Signer, txRequest);
  });

const sleep = async (ms: number): Promise<void> => {
  return await new Promise((resolve) => setTimeout(resolve, ms));
};
