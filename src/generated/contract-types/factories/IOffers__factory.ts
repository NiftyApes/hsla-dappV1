/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IOffers, IOffersInterface } from "../IOffers";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "nftContractAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "nftId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "address",
            name: "creator",
            type: "address",
          },
          {
            internalType: "uint32",
            name: "duration",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "expiration",
            type: "uint32",
          },
          {
            internalType: "bool",
            name: "fixedTerms",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "floorTerm",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "lenderOffer",
            type: "bool",
          },
          {
            internalType: "address",
            name: "nftContractAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "nftId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "asset",
            type: "address",
          },
          {
            internalType: "uint128",
            name: "amount",
            type: "uint128",
          },
          {
            internalType: "uint96",
            name: "interestRatePerSecond",
            type: "uint96",
          },
        ],
        indexed: false,
        internalType: "struct IOffersStructs.Offer",
        name: "offer",
        type: "tuple",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "offerHash",
        type: "bytes32",
      },
    ],
    name: "NewOffer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "nftContractAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "nftId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "address",
            name: "creator",
            type: "address",
          },
          {
            internalType: "uint32",
            name: "duration",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "expiration",
            type: "uint32",
          },
          {
            internalType: "bool",
            name: "fixedTerms",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "floorTerm",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "lenderOffer",
            type: "bool",
          },
          {
            internalType: "address",
            name: "nftContractAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "nftId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "asset",
            type: "address",
          },
          {
            internalType: "uint128",
            name: "amount",
            type: "uint128",
          },
          {
            internalType: "uint96",
            name: "interestRatePerSecond",
            type: "uint96",
          },
        ],
        indexed: false,
        internalType: "struct IOffersStructs.Offer",
        name: "offer",
        type: "tuple",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "offerHash",
        type: "bytes32",
      },
    ],
    name: "OfferRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "nftContractAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "nftId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "address",
            name: "creator",
            type: "address",
          },
          {
            internalType: "uint32",
            name: "duration",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "expiration",
            type: "uint32",
          },
          {
            internalType: "bool",
            name: "fixedTerms",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "floorTerm",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "lenderOffer",
            type: "bool",
          },
          {
            internalType: "address",
            name: "nftContractAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "nftId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "asset",
            type: "address",
          },
          {
            internalType: "uint128",
            name: "amount",
            type: "uint128",
          },
          {
            internalType: "uint96",
            name: "interestRatePerSecond",
            type: "uint96",
          },
        ],
        indexed: false,
        internalType: "struct IOffersStructs.Offer",
        name: "offer",
        type: "tuple",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "OfferSignatureUsed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "oldLendingContractAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newLendingContractAddress",
        type: "address",
      },
    ],
    name: "OffersXLendingContractAddressUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "oldSigLendingContractAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newSigLendingContractAddress",
        type: "address",
      },
    ],
    name: "OffersXSigLendingContractAddressUpdated",
    type: "event",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "creator",
            type: "address",
          },
          {
            internalType: "uint32",
            name: "duration",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "expiration",
            type: "uint32",
          },
          {
            internalType: "bool",
            name: "fixedTerms",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "floorTerm",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "lenderOffer",
            type: "bool",
          },
          {
            internalType: "address",
            name: "nftContractAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "nftId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "asset",
            type: "address",
          },
          {
            internalType: "uint128",
            name: "amount",
            type: "uint128",
          },
          {
            internalType: "uint96",
            name: "interestRatePerSecond",
            type: "uint96",
          },
        ],
        internalType: "struct IOffersStructs.Offer",
        name: "offer",
        type: "tuple",
      },
    ],
    name: "createOffer",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "nftContractAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "nftId",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "offerHash",
        type: "bytes32",
      },
      {
        internalType: "bool",
        name: "floorTerm",
        type: "bool",
      },
    ],
    name: "getOffer",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "creator",
            type: "address",
          },
          {
            internalType: "uint32",
            name: "duration",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "expiration",
            type: "uint32",
          },
          {
            internalType: "bool",
            name: "fixedTerms",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "floorTerm",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "lenderOffer",
            type: "bool",
          },
          {
            internalType: "address",
            name: "nftContractAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "nftId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "asset",
            type: "address",
          },
          {
            internalType: "uint128",
            name: "amount",
            type: "uint128",
          },
          {
            internalType: "uint96",
            name: "interestRatePerSecond",
            type: "uint96",
          },
        ],
        internalType: "struct IOffersStructs.Offer",
        name: "offer",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "creator",
            type: "address",
          },
          {
            internalType: "uint32",
            name: "duration",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "expiration",
            type: "uint32",
          },
          {
            internalType: "bool",
            name: "fixedTerms",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "floorTerm",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "lenderOffer",
            type: "bool",
          },
          {
            internalType: "address",
            name: "nftContractAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "nftId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "asset",
            type: "address",
          },
          {
            internalType: "uint128",
            name: "amount",
            type: "uint128",
          },
          {
            internalType: "uint96",
            name: "interestRatePerSecond",
            type: "uint96",
          },
        ],
        internalType: "struct IOffersStructs.Offer",
        name: "offer",
        type: "tuple",
      },
    ],
    name: "getOfferHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "getOfferSignatureStatus",
    outputs: [
      {
        internalType: "bool",
        name: "status",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "creator",
            type: "address",
          },
          {
            internalType: "uint32",
            name: "duration",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "expiration",
            type: "uint32",
          },
          {
            internalType: "bool",
            name: "fixedTerms",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "floorTerm",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "lenderOffer",
            type: "bool",
          },
          {
            internalType: "address",
            name: "nftContractAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "nftId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "asset",
            type: "address",
          },
          {
            internalType: "uint128",
            name: "amount",
            type: "uint128",
          },
          {
            internalType: "uint96",
            name: "interestRatePerSecond",
            type: "uint96",
          },
        ],
        internalType: "struct IOffersStructs.Offer",
        name: "offer",
        type: "tuple",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "getOfferSigner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "lendingContractAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "liquidityContractAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "creator",
            type: "address",
          },
          {
            internalType: "uint32",
            name: "duration",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "expiration",
            type: "uint32",
          },
          {
            internalType: "bool",
            name: "fixedTerms",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "floorTerm",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "lenderOffer",
            type: "bool",
          },
          {
            internalType: "address",
            name: "nftContractAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "nftId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "asset",
            type: "address",
          },
          {
            internalType: "uint128",
            name: "amount",
            type: "uint128",
          },
          {
            internalType: "uint96",
            name: "interestRatePerSecond",
            type: "uint96",
          },
        ],
        internalType: "struct IOffersStructs.Offer",
        name: "offer",
        type: "tuple",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "markSignatureUsed",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "nftContractAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "nftId",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "offerHash",
        type: "bytes32",
      },
      {
        internalType: "bool",
        name: "floorTerm",
        type: "bool",
      },
    ],
    name: "removeOffer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "requireAvailableSignature",
    outputs: [],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "creator",
            type: "address",
          },
          {
            internalType: "uint32",
            name: "duration",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "expiration",
            type: "uint32",
          },
          {
            internalType: "bool",
            name: "fixedTerms",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "floorTerm",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "lenderOffer",
            type: "bool",
          },
          {
            internalType: "address",
            name: "nftContractAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "nftId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "asset",
            type: "address",
          },
          {
            internalType: "uint128",
            name: "amount",
            type: "uint128",
          },
          {
            internalType: "uint96",
            name: "interestRatePerSecond",
            type: "uint96",
          },
        ],
        internalType: "struct IOffersStructs.Offer",
        name: "offer",
        type: "tuple",
      },
    ],
    name: "requireMinimumDuration",
    outputs: [],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "creator",
            type: "address",
          },
          {
            internalType: "uint32",
            name: "duration",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "expiration",
            type: "uint32",
          },
          {
            internalType: "bool",
            name: "fixedTerms",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "floorTerm",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "lenderOffer",
            type: "bool",
          },
          {
            internalType: "address",
            name: "nftContractAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "nftId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "asset",
            type: "address",
          },
          {
            internalType: "uint128",
            name: "amount",
            type: "uint128",
          },
          {
            internalType: "uint96",
            name: "interestRatePerSecond",
            type: "uint96",
          },
        ],
        internalType: "struct IOffersStructs.Offer",
        name: "offer",
        type: "tuple",
      },
    ],
    name: "requireNoFloorTerms",
    outputs: [],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "requireSignature65",
    outputs: [],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "sigLendingContractAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newLendingContractAddress",
        type: "address",
      },
    ],
    name: "updateLendingContractAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newSigLendingContractAddress",
        type: "address",
      },
    ],
    name: "updateSigLendingContractAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "creator",
            type: "address",
          },
          {
            internalType: "uint32",
            name: "duration",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "expiration",
            type: "uint32",
          },
          {
            internalType: "bool",
            name: "fixedTerms",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "floorTerm",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "lenderOffer",
            type: "bool",
          },
          {
            internalType: "address",
            name: "nftContractAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "nftId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "asset",
            type: "address",
          },
          {
            internalType: "uint128",
            name: "amount",
            type: "uint128",
          },
          {
            internalType: "uint96",
            name: "interestRatePerSecond",
            type: "uint96",
          },
        ],
        internalType: "struct IOffersStructs.Offer",
        name: "offer",
        type: "tuple",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "withdrawOfferSignature",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IOffers__factory {
  static readonly abi = _abi;
  static createInterface(): IOffersInterface {
    return new utils.Interface(_abi) as IOffersInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IOffers {
    return new Contract(address, _abi, signerOrProvider) as IOffers;
  }
}
