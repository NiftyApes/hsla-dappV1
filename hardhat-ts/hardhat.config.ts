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

import { Signer, utils } from 'ethers';

import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import '@tenderly/hardhat-tenderly';
import '@typechain/hardhat';
import 'hardhat-deploy';
import 'solidity-coverage';

import * as chalk from 'chalk';
import * as fs from 'fs';

import { Provider, TransactionRequest, TransactionResponse } from '@ethersproject/providers';
import { create } from 'ipfs-http-client';

import { HardhatUserConfig, task } from 'hardhat/config';
import { HttpNetworkUserConfig } from 'hardhat/types';
import { THardhatDeployEthers } from './helpers/types/hardhat-type-extensions';

import { btoa } from 'buffer';
import { config as envConfig } from 'dotenv';
import { baycAbi } from './abis/baycAbi';
import { doodlesAbi } from './abis/doodlesAbi';
import { maycAbi } from './abis/maycAbi';
import { nounsAbi } from './abis/nounsAbi';
import { saveOfferInDb } from './helpers/saveOfferInDb';

envConfig({ path: '../vite-app-ts/.env' });
envConfig({ path: '.env' });

const INFURA_ID = process.env.INFURA_IPFS_ID;
const INFURA_PASS = process.env.INFURA_IPFS_SECRET;

const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    Authorization: 'Basic ' + btoa(INFURA_ID + ':' + INFURA_PASS),
  },
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
        //blockNumber: 14724006,
      },

      // When doing mainnet forking, we got
      // `Error: setBlockContext called when checkpointed`
      // And there are reports of this being caused
      // by mainnet forking w/ automine turned off.
      // So we turned it back on by comment out the below field.
      // https://github.com/NomicFoundation/hardhat/issues/2516

      // mining: {
      //   auto: false,
      //   interval: 5000,
      // },
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
    cache: '../src/generated/cache',
    artifacts: '../src/generated/artifacts',
    deployments: '../src/generated/deployments',
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

task('fast-forward', 'Fast forward so many days')
  .addOptionalParam('days', 'Number of days to fast forward')
  .setAction(async (taskArgs, { network }) => {
    const seconds = taskArgs.days ? taskArgs.days * 3600 * 24 : 1 * 3600 * 24;

    await network.provider.request({
      method: 'evm_increaseTime',
      params: [seconds],
    });
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

task('deposit-eth', 'Deposit ETH liquidity (for testing)').setAction(async (taskArgs, { network, ethers }, hre) => {
  const NiftyApesDeploymentJSON = require('./generated/deployments/localhost/NiftyApes.json');

  console.log('Balance before deposit: ', ethers.utils.formatEther(await ethers.provider.getBalance('0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266')));

  const niftyApes = await ethers.getContractAt('NiftyApes', NiftyApesDeploymentJSON.address);
  const tx = await niftyApes.supplyEth({ value: ethers.utils.parseEther('1000.0') });
  await tx.wait();

  console.log('Balance after deposit: ', ethers.utils.formatEther(await ethers.provider.getBalance('0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266')));
});

task('withdraw-eth', 'Withdraw ETH liquidity (for testing)').setAction(async (taskArgs, { network, ethers }, hre) => {
  const NiftyApesDeploymentJSON = require('./generated/deployments/localhost/NiftyApes.json');

  console.log('Balance before withdraw: ', ethers.utils.formatEther(await ethers.provider.getBalance('0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266')));

  const niftyApes = await ethers.getContractAt('NiftyApes', NiftyApesDeploymentJSON.address);
  const tx = await niftyApes.withdrawEth(ethers.utils.parseEther('2'));
  await tx.wait();

  console.log('Balance after withdraw: ', ethers.utils.formatEther(await ethers.provider.getBalance('0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266')));
});

task('create-offer', 'Create offer')
  .addOptionalParam('id', 'NFT id to create offer for')
  .setAction(async (taskArgs, { network, ethers }, hre) => {
    const NiftyApesDeploymentJSON = require('./generated/deployments/localhost/NiftyApes.json');
    const YourCollectibleDeploymentJSON = require('./generated/deployments/localhost/YourCollectible.json');

    const suppliedNftId = taskArgs.id;

    const ETH_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';

    const niftyApes = await ethers.getContractAt('NiftyApes', NiftyApesDeploymentJSON.address);

    const tx = await niftyApes.createOffer({
      creator: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
      nftContractAddress: YourCollectibleDeploymentJSON.address,
      // 50% APR
      interestRatePerSecond: Math.round((((50 / 100) * 1) / (365 * 24 * 60 * 60)) * 1e18),
      fixedTerms: true,
      floorTerm: false,
      lenderOffer: true,
      nftId: suppliedNftId || '1',
      asset: ETH_ADDRESS,
      amount: ethers.utils.parseUnits('1', 'ether'),
      duration: 60 * 60 * 24, // 1 day
      expiration: Math.floor(Date.now() / 1000 + 60 * 60 * 24 * 5), // 5 days from now
    });

    const receipt = await tx.wait();
    const offer = receipt.events[1].args[4];
    const offerObj = {
      creator: offer.creator,
      nftContractAddress: offer.nftContractAddress,
      interestRatePerSecond: offer.interestRatePerSecond.toString(),
      fixedTerms: offer.fixedTerms,
      floorTerm: offer.floorTerm,
      lenderOffer: offer.lenderOffer,
      nftId: offer.nftId.toNumber(),
      asset: offer.asset,
      amount: offer.amount.toString(),
      duration: offer.duration,
      expiration: offer.expiration,
    };

    const { nftId, creator, interestRatePerSecond, amount, duration, expiration, floorTerm, nftContractAddress } = offerObj;

    const result = await saveOfferInDb({
      offerObj: {
        nftId,
        creator,
        interestRatePerSecond,
        amount,
        duration,
        expiration,
        floorTerm,
        nftContractAddress,
      },
      offerHash: receipt.events[1].args.offerHash,
    });

    console.log(await result.json());

    console.log('Contract address: ', NiftyApesDeploymentJSON.address);
    console.log('Nft ID: ', offer.nftId);
    console.log('Offer : ', offerObj);
    console.log('Offer hash: ', receipt.events[1].args.offerHash);
  });

task('mint', 'String to search for')
  .addOptionalParam('to', 'address to mint to')
  .setAction(async (taskArgs, { network, ethers }, hre) => {
    const YourCollectibleDeploymentJSON = require('./generated/deployments/localhost/YourCollectible.json');

    const {} = hre;
    // This function copy-pasted from scaffold-eth
    const delayMS = 1000;

    const toAddress = taskArgs.to;

    console.log('\n\n 🎫 Minting to ' + toAddress + '...\n');

    // Might need to hand-edit contract address
    const yourCollectible = await ethers.getContractAt('YourCollectible', YourCollectibleDeploymentJSON.address);

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

task('real-nfts', 'String to search for')
  .addOptionalParam('to', 'address to mint to')
  .setAction(async (taskArgs, { network, ethers }, hre) => {
    const DINGALING_ADDRESS = '0x54be3a794282c030b15e43ae2bb182e14c409c5e';
    const BAYC_CONTRACT = '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d';
    const MAYC_CONTRACT = '0x60e4d786628fea6478f785a6d7e704777c86a7c6';

    await network.provider.request({
      method: 'hardhat_impersonateAccount',
      params: [DINGALING_ADDRESS],
    });

    const dingaling = await ethers.getSigner(DINGALING_ADDRESS);

    const baycContract = new ethers.Contract(BAYC_CONTRACT, baycAbi, dingaling);
    const maycContract = new ethers.Contract(MAYC_CONTRACT, maycAbi, dingaling);

    const toAddress = taskArgs.to;

    try {
      await baycContract.transferFrom(DINGALING_ADDRESS, toAddress, 861);
    } catch (e) {
      console.log(e);
    }
    try {
      await baycContract.transferFrom(DINGALING_ADDRESS, toAddress, 862);
    } catch (e) {}
    try {
      await baycContract.transferFrom(DINGALING_ADDRESS, toAddress, 863);
    } catch (e) {}
    // try {
    //   await baycContract.transferFrom(DINGALING_ADDRESS, toAddress, 864);
    // } catch (e) {}
    // try {
    //   await baycContract.transferFrom(DINGALING_ADDRESS, toAddress, 865);
    // } catch (e) {}

    try {
      await maycContract.transferFrom(DINGALING_ADDRESS, toAddress, 11863);
    } catch (e) {}
    try {
      await maycContract.transferFrom(DINGALING_ADDRESS, toAddress, 11864);
    } catch (e) {}
    try {
      await maycContract.transferFrom(DINGALING_ADDRESS, toAddress, 11866);
    } catch (e) {}
    // try {
    //   await maycContract.transferFrom(DINGALING_ADDRESS, toAddress, 11868);
    // } catch (e) {}
    // try {
    //   await maycContract.transferFrom(DINGALING_ADDRESS, toAddress, 11870);
    // } catch (e) {}

    await network.provider.request({
      method: 'hardhat_stopImpersonatingAccount',
      params: [DINGALING_ADDRESS],
    });

    const A24_ADDRESS = '0xad097fdcd58535250c59807d6683e0a6b688d6cc';
    const DOODLES_CONTRACT = '0x8a90cab2b38dba80c64b7734e58ee1db38b8992e';

    await network.provider.request({
      method: 'hardhat_impersonateAccount',
      params: [A24_ADDRESS],
    });

    const a24 = await ethers.getSigner(A24_ADDRESS);

    const doodlesContract = new ethers.Contract(DOODLES_CONTRACT, doodlesAbi, a24);

    try {
      await doodlesContract.transferFrom(A24_ADDRESS, toAddress, 5698);
    } catch (e) {}
    try {
      await doodlesContract.transferFrom(A24_ADDRESS, toAddress, 5699);
    } catch (e) {}
    try {
      await doodlesContract.transferFrom(A24_ADDRESS, toAddress, 5701);
    } catch (e) {}
    // try {
    //   await doodlesContract.transferFrom(A24_ADDRESS, toAddress, 5702);
    // } catch (e) {}
    // try {
    //   await doodlesContract.transferFrom(A24_ADDRESS, toAddress, 5703);
    // } catch (e) {}

    await network.provider.request({
      method: 'hardhat_stopImpersonatingAccount',
      params: [A24_ADDRESS],
    });

    const $4156_ADDRESS = '0xf476cd75be8fdd197ae0b466a2ec2ae44da41897';
    const NOUNS_CONTRACT = '0x9c8ff314c9bc7f6e59a9d9225fb22946427edc03';

    await network.provider.request({
      method: 'hardhat_impersonateAccount',
      params: [$4156_ADDRESS],
    });

    const $4156 = await ethers.getSigner($4156_ADDRESS);

    const nounsContract = new ethers.Contract(NOUNS_CONTRACT, nounsAbi, $4156);

    try {
      await nounsContract.transferFrom($4156_ADDRESS, toAddress, 190);
    } catch (e) {}
    try {
      await nounsContract.transferFrom($4156_ADDRESS, toAddress, 213);
    } catch (e) {}
    try {
      await nounsContract.transferFrom($4156_ADDRESS, toAddress, 260);
    } catch (e) {}

    await network.provider.request({
      method: 'hardhat_stopImpersonatingAccount',
      params: [$4156_ADDRESS],
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

task('fund', 'fund wallet')
  .addParam('to', 'To address or account index')
  .addParam('amount', 'Amount to send in ether')
  .setAction(async (taskArgs: { to: string; amount: string }, { network, ethers }) => {
    const { to, amount } = taskArgs;

    const tx = {
      to,
      value: ethers.utils.parseEther(amount),
    };

    return await send(ethers.provider.getSigner() as Signer, tx);
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
