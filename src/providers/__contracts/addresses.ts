export const MAINNET = {
  SIG_LENDING: {
    ADDRESS: '0xc708c2efd6e6578809352d8e618c7f619f3b7f20',
    ABI: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint8',
            name: 'version',
            type: 'uint8',
          },
        ],
        name: 'Initialized',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'previousOwner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnershipTransferred',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'Paused',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'oldLendingContractAddress',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'newLendingContractAddress',
            type: 'address',
          },
        ],
        name: 'SigLendingXLendingContractAddressUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'Unpaused',
        type: 'event',
      },
      {
        inputs: [
          {
            components: [
              {
                internalType: 'address',
                name: 'creator',
                type: 'address',
              },
              {
                internalType: 'uint32',
                name: 'duration',
                type: 'uint32',
              },
              {
                internalType: 'uint32',
                name: 'expiration',
                type: 'uint32',
              },
              {
                internalType: 'bool',
                name: 'fixedTerms',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'floorTerm',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'lenderOffer',
                type: 'bool',
              },
              {
                internalType: 'address',
                name: 'nftContractAddress',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'nftId',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'asset',
                type: 'address',
              },
              {
                internalType: 'uint128',
                name: 'amount',
                type: 'uint128',
              },
              {
                internalType: 'uint96',
                name: 'interestRatePerSecond',
                type: 'uint96',
              },
              {
                internalType: 'uint64',
                name: 'floorTermLimit',
                type: 'uint64',
              },
            ],
            internalType: 'struct IOffersStructs.Offer',
            name: 'offer',
            type: 'tuple',
          },
          {
            internalType: 'bytes',
            name: 'signature',
            type: 'bytes',
          },
          {
            internalType: 'uint256',
            name: 'nftId',
            type: 'uint256',
          },
        ],
        name: 'executeLoanByBorrowerSignature',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [
          {
            components: [
              {
                internalType: 'address',
                name: 'creator',
                type: 'address',
              },
              {
                internalType: 'uint32',
                name: 'duration',
                type: 'uint32',
              },
              {
                internalType: 'uint32',
                name: 'expiration',
                type: 'uint32',
              },
              {
                internalType: 'bool',
                name: 'fixedTerms',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'floorTerm',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'lenderOffer',
                type: 'bool',
              },
              {
                internalType: 'address',
                name: 'nftContractAddress',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'nftId',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'asset',
                type: 'address',
              },
              {
                internalType: 'uint128',
                name: 'amount',
                type: 'uint128',
              },
              {
                internalType: 'uint96',
                name: 'interestRatePerSecond',
                type: 'uint96',
              },
              {
                internalType: 'uint64',
                name: 'floorTermLimit',
                type: 'uint64',
              },
            ],
            internalType: 'struct IOffersStructs.Offer',
            name: 'offer',
            type: 'tuple',
          },
          {
            internalType: 'bytes',
            name: 'signature',
            type: 'bytes',
          },
        ],
        name: 'executeLoanByLenderSignature',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'newOffersContractAddress',
            type: 'address',
          },
        ],
        name: 'initialize',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'lendingContractAddress',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'offersContractAddress',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'owner',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'pause',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'paused',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            components: [
              {
                internalType: 'address',
                name: 'creator',
                type: 'address',
              },
              {
                internalType: 'uint32',
                name: 'duration',
                type: 'uint32',
              },
              {
                internalType: 'uint32',
                name: 'expiration',
                type: 'uint32',
              },
              {
                internalType: 'bool',
                name: 'fixedTerms',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'floorTerm',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'lenderOffer',
                type: 'bool',
              },
              {
                internalType: 'address',
                name: 'nftContractAddress',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'nftId',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'asset',
                type: 'address',
              },
              {
                internalType: 'uint128',
                name: 'amount',
                type: 'uint128',
              },
              {
                internalType: 'uint96',
                name: 'interestRatePerSecond',
                type: 'uint96',
              },
              {
                internalType: 'uint64',
                name: 'floorTermLimit',
                type: 'uint64',
              },
            ],
            internalType: 'struct IOffersStructs.Offer',
            name: 'offer',
            type: 'tuple',
          },
          {
            internalType: 'bytes',
            name: 'signature',
            type: 'bytes',
          },
          {
            internalType: 'uint256',
            name: 'nftId',
            type: 'uint256',
          },
          {
            internalType: 'uint32',
            name: 'expectedLastUpdatedTimestamp',
            type: 'uint32',
          },
        ],
        name: 'refinanceByBorrowerSignature',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'unpause',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'newLendingContractAddress',
            type: 'address',
          },
        ],
        name: 'updateLendingContractAddress',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
  },
  LENDING: {
    ADDRESS: '0xa78362aA9194E74a9Ef267377E654Dd012c6C584',
    ABI: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'nftContractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'nftId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'drawAmount',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'nftOwner',
                type: 'address',
              },
              {
                internalType: 'uint32',
                name: 'loanEndTimestamp',
                type: 'uint32',
              },
              {
                internalType: 'uint32',
                name: 'lastUpdatedTimestamp',
                type: 'uint32',
              },
              {
                internalType: 'bool',
                name: 'fixedTerms',
                type: 'bool',
              },
              {
                internalType: 'address',
                name: 'lender',
                type: 'address',
              },
              {
                internalType: 'uint96',
                name: 'interestRatePerSecond',
                type: 'uint96',
              },
              {
                internalType: 'address',
                name: 'asset',
                type: 'address',
              },
              {
                internalType: 'uint32',
                name: 'loanBeginTimestamp',
                type: 'uint32',
              },
              {
                internalType: 'bool',
                name: 'lenderRefi',
                type: 'bool',
              },
              {
                internalType: 'uint128',
                name: 'accumulatedLenderInterest',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'accumulatedPaidProtocolInterest',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'amount',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'amountDrawn',
                type: 'uint128',
              },
              {
                internalType: 'uint96',
                name: 'protocolInterestRatePerSecond',
                type: 'uint96',
              },
              {
                internalType: 'uint128',
                name: 'slashableLenderInterest',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'unpaidProtocolInterest',
                type: 'uint128',
              },
            ],
            indexed: false,
            internalType: 'struct ILendingStructs.LoanAuction',
            name: 'loanAuction',
            type: 'tuple',
          },
        ],
        name: 'AmountDrawn',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'nftContractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'nftId',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'nftOwner',
                type: 'address',
              },
              {
                internalType: 'uint32',
                name: 'loanEndTimestamp',
                type: 'uint32',
              },
              {
                internalType: 'uint32',
                name: 'lastUpdatedTimestamp',
                type: 'uint32',
              },
              {
                internalType: 'bool',
                name: 'fixedTerms',
                type: 'bool',
              },
              {
                internalType: 'address',
                name: 'lender',
                type: 'address',
              },
              {
                internalType: 'uint96',
                name: 'interestRatePerSecond',
                type: 'uint96',
              },
              {
                internalType: 'address',
                name: 'asset',
                type: 'address',
              },
              {
                internalType: 'uint32',
                name: 'loanBeginTimestamp',
                type: 'uint32',
              },
              {
                internalType: 'bool',
                name: 'lenderRefi',
                type: 'bool',
              },
              {
                internalType: 'uint128',
                name: 'accumulatedLenderInterest',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'accumulatedPaidProtocolInterest',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'amount',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'amountDrawn',
                type: 'uint128',
              },
              {
                internalType: 'uint96',
                name: 'protocolInterestRatePerSecond',
                type: 'uint96',
              },
              {
                internalType: 'uint128',
                name: 'slashableLenderInterest',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'unpaidProtocolInterest',
                type: 'uint128',
              },
            ],
            indexed: false,
            internalType: 'struct ILendingStructs.LoanAuction',
            name: 'loanAuction',
            type: 'tuple',
          },
        ],
        name: 'AssetSeized',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint16',
            name: 'oldDefaultRefinancePremiumBps',
            type: 'uint16',
          },
          {
            indexed: false,
            internalType: 'uint16',
            name: 'newDefaultRefinancePremiumBps',
            type: 'uint16',
          },
        ],
        name: 'DefaultRefinancePremiumBpsUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint16',
            name: 'oldGasGriefingPremiumBps',
            type: 'uint16',
          },
          {
            indexed: false,
            internalType: 'uint16',
            name: 'newGasGriefingPremiumBps',
            type: 'uint16',
          },
        ],
        name: 'GasGriefingPremiumBpsUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint16',
            name: 'oldGasGriefingProtocolPremiumBps',
            type: 'uint16',
          },
          {
            indexed: false,
            internalType: 'uint16',
            name: 'newGasGriefingProtocolPremiumBps',
            type: 'uint16',
          },
        ],
        name: 'GasGriefingProtocolPremiumBpsUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint8',
            name: 'version',
            type: 'uint8',
          },
        ],
        name: 'Initialized',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [],
        name: 'LendingSanctionsPaused',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [],
        name: 'LendingSanctionsUnpaused',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'nftContractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'nftId',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'nftOwner',
                type: 'address',
              },
              {
                internalType: 'uint32',
                name: 'loanEndTimestamp',
                type: 'uint32',
              },
              {
                internalType: 'uint32',
                name: 'lastUpdatedTimestamp',
                type: 'uint32',
              },
              {
                internalType: 'bool',
                name: 'fixedTerms',
                type: 'bool',
              },
              {
                internalType: 'address',
                name: 'lender',
                type: 'address',
              },
              {
                internalType: 'uint96',
                name: 'interestRatePerSecond',
                type: 'uint96',
              },
              {
                internalType: 'address',
                name: 'asset',
                type: 'address',
              },
              {
                internalType: 'uint32',
                name: 'loanBeginTimestamp',
                type: 'uint32',
              },
              {
                internalType: 'bool',
                name: 'lenderRefi',
                type: 'bool',
              },
              {
                internalType: 'uint128',
                name: 'accumulatedLenderInterest',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'accumulatedPaidProtocolInterest',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'amount',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'amountDrawn',
                type: 'uint128',
              },
              {
                internalType: 'uint96',
                name: 'protocolInterestRatePerSecond',
                type: 'uint96',
              },
              {
                internalType: 'uint128',
                name: 'slashableLenderInterest',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'unpaidProtocolInterest',
                type: 'uint128',
              },
            ],
            indexed: false,
            internalType: 'struct ILendingStructs.LoanAuction',
            name: 'loanAuction',
            type: 'tuple',
          },
        ],
        name: 'LoanExecuted',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'nftContractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'nftId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'totalPayment',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'nftOwner',
                type: 'address',
              },
              {
                internalType: 'uint32',
                name: 'loanEndTimestamp',
                type: 'uint32',
              },
              {
                internalType: 'uint32',
                name: 'lastUpdatedTimestamp',
                type: 'uint32',
              },
              {
                internalType: 'bool',
                name: 'fixedTerms',
                type: 'bool',
              },
              {
                internalType: 'address',
                name: 'lender',
                type: 'address',
              },
              {
                internalType: 'uint96',
                name: 'interestRatePerSecond',
                type: 'uint96',
              },
              {
                internalType: 'address',
                name: 'asset',
                type: 'address',
              },
              {
                internalType: 'uint32',
                name: 'loanBeginTimestamp',
                type: 'uint32',
              },
              {
                internalType: 'bool',
                name: 'lenderRefi',
                type: 'bool',
              },
              {
                internalType: 'uint128',
                name: 'accumulatedLenderInterest',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'accumulatedPaidProtocolInterest',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'amount',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'amountDrawn',
                type: 'uint128',
              },
              {
                internalType: 'uint96',
                name: 'protocolInterestRatePerSecond',
                type: 'uint96',
              },
              {
                internalType: 'uint128',
                name: 'slashableLenderInterest',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'unpaidProtocolInterest',
                type: 'uint128',
              },
            ],
            indexed: false,
            internalType: 'struct ILendingStructs.LoanAuction',
            name: 'loanAuction',
            type: 'tuple',
          },
        ],
        name: 'LoanRepaid',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint16',
            name: 'oldOriginationPremiumBps',
            type: 'uint16',
          },
          {
            indexed: false,
            internalType: 'uint16',
            name: 'newOriginationPremiumBps',
            type: 'uint16',
          },
        ],
        name: 'OriginationPremiumBpsUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'previousOwner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnershipTransferred',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'nftContractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'nftId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'nftOwner',
                type: 'address',
              },
              {
                internalType: 'uint32',
                name: 'loanEndTimestamp',
                type: 'uint32',
              },
              {
                internalType: 'uint32',
                name: 'lastUpdatedTimestamp',
                type: 'uint32',
              },
              {
                internalType: 'bool',
                name: 'fixedTerms',
                type: 'bool',
              },
              {
                internalType: 'address',
                name: 'lender',
                type: 'address',
              },
              {
                internalType: 'uint96',
                name: 'interestRatePerSecond',
                type: 'uint96',
              },
              {
                internalType: 'address',
                name: 'asset',
                type: 'address',
              },
              {
                internalType: 'uint32',
                name: 'loanBeginTimestamp',
                type: 'uint32',
              },
              {
                internalType: 'bool',
                name: 'lenderRefi',
                type: 'bool',
              },
              {
                internalType: 'uint128',
                name: 'accumulatedLenderInterest',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'accumulatedPaidProtocolInterest',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'amount',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'amountDrawn',
                type: 'uint128',
              },
              {
                internalType: 'uint96',
                name: 'protocolInterestRatePerSecond',
                type: 'uint96',
              },
              {
                internalType: 'uint128',
                name: 'slashableLenderInterest',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'unpaidProtocolInterest',
                type: 'uint128',
              },
            ],
            indexed: false,
            internalType: 'struct ILendingStructs.LoanAuction',
            name: 'loanAuction',
            type: 'tuple',
          },
        ],
        name: 'PartialRepayment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'Paused',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint96',
            name: 'oldProtocolInterestBps',
            type: 'uint96',
          },
          {
            indexed: false,
            internalType: 'uint96',
            name: 'newProtocolInterestBps',
            type: 'uint96',
          },
        ],
        name: 'ProtocolInterestBpsUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'nftContractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'nftId',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'nftOwner',
                type: 'address',
              },
              {
                internalType: 'uint32',
                name: 'loanEndTimestamp',
                type: 'uint32',
              },
              {
                internalType: 'uint32',
                name: 'lastUpdatedTimestamp',
                type: 'uint32',
              },
              {
                internalType: 'bool',
                name: 'fixedTerms',
                type: 'bool',
              },
              {
                internalType: 'address',
                name: 'lender',
                type: 'address',
              },
              {
                internalType: 'uint96',
                name: 'interestRatePerSecond',
                type: 'uint96',
              },
              {
                internalType: 'address',
                name: 'asset',
                type: 'address',
              },
              {
                internalType: 'uint32',
                name: 'loanBeginTimestamp',
                type: 'uint32',
              },
              {
                internalType: 'bool',
                name: 'lenderRefi',
                type: 'bool',
              },
              {
                internalType: 'uint128',
                name: 'accumulatedLenderInterest',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'accumulatedPaidProtocolInterest',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'amount',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'amountDrawn',
                type: 'uint128',
              },
              {
                internalType: 'uint96',
                name: 'protocolInterestRatePerSecond',
                type: 'uint96',
              },
              {
                internalType: 'uint128',
                name: 'slashableLenderInterest',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'unpaidProtocolInterest',
                type: 'uint128',
              },
            ],
            indexed: false,
            internalType: 'struct ILendingStructs.LoanAuction',
            name: 'loanAuction',
            type: 'tuple',
          },
        ],
        name: 'Refinance',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint16',
            name: 'oldTermGriefingPremiumBps',
            type: 'uint16',
          },
          {
            indexed: false,
            internalType: 'uint16',
            name: 'newTermGriefingPremiumBps',
            type: 'uint16',
          },
        ],
        name: 'TermGriefingPremiumBpsUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'Unpaused',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'nftContractAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'nftId',
            type: 'uint256',
          },
        ],
        name: 'calculateInterestAccrued',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'interestBps',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'duration',
            type: 'uint256',
          },
        ],
        name: 'calculateInterestPerSecond',
        outputs: [
          {
            internalType: 'uint96',
            name: '',
            type: 'uint96',
          },
        ],
        stateMutability: 'pure',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'nftContractAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'nftId',
            type: 'uint256',
          },
        ],
        name: 'checkSufficientInterestAccumulated',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'nftContractAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'nftId',
            type: 'uint256',
          },
          {
            internalType: 'uint128',
            name: 'amount',
            type: 'uint128',
          },
          {
            internalType: 'uint96',
            name: 'interestRatePerSecond',
            type: 'uint96',
          },
          {
            internalType: 'uint32',
            name: 'duration',
            type: 'uint32',
          },
        ],
        name: 'checkSufficientTerms',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'defaultRefinancePremiumBps',
        outputs: [
          {
            internalType: 'uint16',
            name: '',
            type: 'uint16',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            components: [
              {
                internalType: 'address',
                name: 'creator',
                type: 'address',
              },
              {
                internalType: 'uint32',
                name: 'duration',
                type: 'uint32',
              },
              {
                internalType: 'uint32',
                name: 'expiration',
                type: 'uint32',
              },
              {
                internalType: 'bool',
                name: 'fixedTerms',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'floorTerm',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'lenderOffer',
                type: 'bool',
              },
              {
                internalType: 'address',
                name: 'nftContractAddress',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'nftId',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'asset',
                type: 'address',
              },
              {
                internalType: 'uint128',
                name: 'amount',
                type: 'uint128',
              },
              {
                internalType: 'uint96',
                name: 'interestRatePerSecond',
                type: 'uint96',
              },
              {
                internalType: 'uint64',
                name: 'floorTermLimit',
                type: 'uint64',
              },
            ],
            internalType: 'struct IOffersStructs.Offer',
            name: 'offer',
            type: 'tuple',
          },
          {
            internalType: 'address',
            name: 'lender',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'borrower',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'nftId',
            type: 'uint256',
          },
        ],
        name: 'doExecuteLoan',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            components: [
              {
                internalType: 'address',
                name: 'creator',
                type: 'address',
              },
              {
                internalType: 'uint32',
                name: 'duration',
                type: 'uint32',
              },
              {
                internalType: 'uint32',
                name: 'expiration',
                type: 'uint32',
              },
              {
                internalType: 'bool',
                name: 'fixedTerms',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'floorTerm',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'lenderOffer',
                type: 'bool',
              },
              {
                internalType: 'address',
                name: 'nftContractAddress',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'nftId',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'asset',
                type: 'address',
              },
              {
                internalType: 'uint128',
                name: 'amount',
                type: 'uint128',
              },
              {
                internalType: 'uint96',
                name: 'interestRatePerSecond',
                type: 'uint96',
              },
              {
                internalType: 'uint64',
                name: 'floorTermLimit',
                type: 'uint64',
              },
            ],
            internalType: 'struct IOffersStructs.Offer',
            name: 'offer',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'nftId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'nftOwner',
            type: 'address',
          },
          {
            internalType: 'uint32',
            name: 'expectedLastUpdatedTimestamp',
            type: 'uint32',
          },
        ],
        name: 'doRefinanceByBorrower',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'nftContractAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'nftId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'drawAmount',
            type: 'uint256',
          },
        ],
        name: 'drawLoanAmount',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'nftContractAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'nftId',
            type: 'uint256',
          },
          {
            internalType: 'bytes32',
            name: 'offerHash',
            type: 'bytes32',
          },
          {
            internalType: 'bool',
            name: 'floorTerm',
            type: 'bool',
          },
        ],
        name: 'executeLoanByBorrower',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'nftContractAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'nftId',
            type: 'uint256',
          },
          {
            internalType: 'bytes32',
            name: 'offerHash',
            type: 'bytes32',
          },
          {
            internalType: 'bool',
            name: 'floorTerm',
            type: 'bool',
          },
        ],
        name: 'executeLoanByLender',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'gasGriefingPremiumBps',
        outputs: [
          {
            internalType: 'uint16',
            name: '',
            type: 'uint16',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'nftContractAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'nftId',
            type: 'uint256',
          },
        ],
        name: 'getLoanAuction',
        outputs: [
          {
            components: [
              {
                internalType: 'address',
                name: 'nftOwner',
                type: 'address',
              },
              {
                internalType: 'uint32',
                name: 'loanEndTimestamp',
                type: 'uint32',
              },
              {
                internalType: 'uint32',
                name: 'lastUpdatedTimestamp',
                type: 'uint32',
              },
              {
                internalType: 'bool',
                name: 'fixedTerms',
                type: 'bool',
              },
              {
                internalType: 'address',
                name: 'lender',
                type: 'address',
              },
              {
                internalType: 'uint96',
                name: 'interestRatePerSecond',
                type: 'uint96',
              },
              {
                internalType: 'address',
                name: 'asset',
                type: 'address',
              },
              {
                internalType: 'uint32',
                name: 'loanBeginTimestamp',
                type: 'uint32',
              },
              {
                internalType: 'bool',
                name: 'lenderRefi',
                type: 'bool',
              },
              {
                internalType: 'uint128',
                name: 'accumulatedLenderInterest',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'accumulatedPaidProtocolInterest',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'amount',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'amountDrawn',
                type: 'uint128',
              },
              {
                internalType: 'uint96',
                name: 'protocolInterestRatePerSecond',
                type: 'uint96',
              },
              {
                internalType: 'uint128',
                name: 'slashableLenderInterest',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'unpaidProtocolInterest',
                type: 'uint128',
              },
            ],
            internalType: 'struct ILendingStructs.LoanAuction',
            name: '',
            type: 'tuple',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'newLiquidityContractAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'newOffersContractAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'newSigLendingContractAddress',
            type: 'address',
          },
        ],
        name: 'initialize',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'liquidityContractAddress',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'offersContractAddress',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: '',
            type: 'bytes',
          },
        ],
        name: 'onERC721Received',
        outputs: [
          {
            internalType: 'bytes4',
            name: '',
            type: 'bytes4',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'originationPremiumBps',
        outputs: [
          {
            internalType: 'uint16',
            name: '',
            type: 'uint16',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'owner',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'nftContractAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'nftId',
            type: 'uint256',
          },
        ],
        name: 'ownerOf',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'nftContractAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'nftId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'partialRepayLoan',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'pause',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'pauseSanctions',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'paused',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'protocolInterestBps',
        outputs: [
          {
            internalType: 'uint16',
            name: '',
            type: 'uint16',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'nftContractAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'nftId',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'floorTerm',
            type: 'bool',
          },
          {
            internalType: 'bytes32',
            name: 'offerHash',
            type: 'bytes32',
          },
          {
            internalType: 'uint32',
            name: 'expectedLastUpdatedTimestamp',
            type: 'uint32',
          },
        ],
        name: 'refinanceByBorrower',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            components: [
              {
                internalType: 'address',
                name: 'creator',
                type: 'address',
              },
              {
                internalType: 'uint32',
                name: 'duration',
                type: 'uint32',
              },
              {
                internalType: 'uint32',
                name: 'expiration',
                type: 'uint32',
              },
              {
                internalType: 'bool',
                name: 'fixedTerms',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'floorTerm',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'lenderOffer',
                type: 'bool',
              },
              {
                internalType: 'address',
                name: 'nftContractAddress',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'nftId',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'asset',
                type: 'address',
              },
              {
                internalType: 'uint128',
                name: 'amount',
                type: 'uint128',
              },
              {
                internalType: 'uint96',
                name: 'interestRatePerSecond',
                type: 'uint96',
              },
              {
                internalType: 'uint64',
                name: 'floorTermLimit',
                type: 'uint64',
              },
            ],
            internalType: 'struct IOffersStructs.Offer',
            name: 'offer',
            type: 'tuple',
          },
          {
            internalType: 'uint32',
            name: 'expectedLastUpdatedTimestamp',
            type: 'uint32',
          },
        ],
        name: 'refinanceByLender',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'nftContractAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'nftId',
            type: 'uint256',
          },
        ],
        name: 'repayLoan',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'nftContractAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'nftId',
            type: 'uint256',
          },
          {
            internalType: 'uint32',
            name: 'expectedLoanBeginTimestamp',
            type: 'uint32',
          },
        ],
        name: 'repayLoanForAccount',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'nftContractAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'nftId',
            type: 'uint256',
          },
        ],
        name: 'seizeAsset',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'sigLendingContractAddress',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'termGriefingPremiumBps',
        outputs: [
          {
            internalType: 'uint16',
            name: '',
            type: 'uint16',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'unpause',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'unpauseSanctions',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint16',
            name: 'newDefaultRefinancePremiumBps',
            type: 'uint16',
          },
        ],
        name: 'updateDefaultRefinancePremiumBps',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint16',
            name: 'newGasGriefingPremiumBps',
            type: 'uint16',
          },
        ],
        name: 'updateGasGriefingPremiumBps',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint16',
            name: 'newOriginationPremiumBps',
            type: 'uint16',
          },
        ],
        name: 'updateOriginationPremiumLenderBps',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint16',
            name: 'newProtocolInterestBps',
            type: 'uint16',
          },
        ],
        name: 'updateProtocolInterestBps',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint16',
            name: 'newTermGriefingPremiumBps',
            type: 'uint16',
          },
        ],
        name: 'updateTermGriefingPremiumBps',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
  },
  LIQUIDITY: {
    ADDRESS: '0x65d4F08DB768d1096aee1f9523758Eb5CA60AE9B',
    ABI: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'asset',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'cAsset',
            type: 'address',
          },
        ],
        name: 'AssetToCAssetSet',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'liquidityProvider',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'cAsset',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'cTokenAmount',
            type: 'uint256',
          },
        ],
        name: 'CErc20Supplied',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'liquidityProvider',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'cAsset',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'cTokenAmount',
            type: 'uint256',
          },
        ],
        name: 'CErc20Withdrawn',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'liquidityProvider',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'asset',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'tokenAmount',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'cTokenAmount',
            type: 'uint256',
          },
        ],
        name: 'Erc20Supplied',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'liquidityProvider',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'asset',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'tokenAmount',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'cTokenAmount',
            type: 'uint256',
          },
        ],
        name: 'Erc20Withdrawn',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'liquidityProvider',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'cTokenAmount',
            type: 'uint256',
          },
        ],
        name: 'EthSupplied',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'liquidityProvider',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'cTokenAmount',
            type: 'uint256',
          },
        ],
        name: 'EthWithdrawn',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint8',
            name: 'version',
            type: 'uint8',
          },
        ],
        name: 'Initialized',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [],
        name: 'LiquiditySanctionsPaused',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [],
        name: 'LiquiditySanctionsUnpaused',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'oldLendingContractAddress',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'newLendingContractAddress',
            type: 'address',
          },
        ],
        name: 'LiquidityXLendingContractAddressUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'previousOwner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnershipTransferred',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'Paused',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'liquidityProvider',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'asset',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'tokenAmount',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'cTokenAmount',
            type: 'uint256',
          },
        ],
        name: 'PercentForRegen',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'newRegenCollectiveAddress',
            type: 'address',
          },
        ],
        name: 'RegenCollectiveAddressUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint16',
            name: 'oldRegenCollectiveBpsOfRevenue',
            type: 'uint16',
          },
          {
            indexed: false,
            internalType: 'uint16',
            name: 'newRegenCollectiveBpsOfRevenue',
            type: 'uint16',
          },
        ],
        name: 'RegenCollectiveBpsOfRevenueUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'Unpaused',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'cAsset',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'addToCAssetBalance',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'asset',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'assetAmountToCAssetAmount',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        name: 'assetToCAsset',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'asset',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'burnCErc20',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'cAsset',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'cAssetAmountToAssetAmount',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'compContractAddress',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'asset',
            type: 'address',
          },
        ],
        name: 'getCAsset',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'cAsset',
            type: 'address',
          },
        ],
        name: 'getCAssetBalance',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'newCompContractAddress',
            type: 'address',
          },
        ],
        name: 'initialize',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'lendingContractAddress',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        name: 'maxBalanceByCAsset',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'asset',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'mintCErc20',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'mintCEth',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'owner',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'pause',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'pauseSanctions',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'paused',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'regenCollectiveAddress',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'regenCollectiveBpsOfRevenue',
        outputs: [
          {
            internalType: 'uint16',
            name: '',
            type: 'uint16',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'asset',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
        ],
        name: 'sendValue',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'asset',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'cAsset',
            type: 'address',
          },
        ],
        name: 'setCAssetAddress',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'cAsset',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'maxBalance',
            type: 'uint256',
          },
        ],
        name: 'setMaxCAssetBalance',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'cAsset',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'cTokenAmount',
            type: 'uint256',
          },
        ],
        name: 'supplyCErc20',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'asset',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenAmount',
            type: 'uint256',
          },
        ],
        name: 'supplyErc20',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'supplyEth',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'unpause',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'unpauseSanctions',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'newLendingContractAddress',
            type: 'address',
          },
        ],
        name: 'updateLendingContractAddress',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'newRegenCollectiveAddress',
            type: 'address',
          },
        ],
        name: 'updateRegenCollectiveAddress',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint16',
            name: 'newRegenCollectiveBpsOfRevenue',
            type: 'uint16',
          },
        ],
        name: 'updateRegenCollectiveBpsOfRevenue',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'cAsset',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'cTokenAmount',
            type: 'uint256',
          },
        ],
        name: 'withdrawCBalance',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'cAsset',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'cTokenAmount',
            type: 'uint256',
          },
        ],
        name: 'withdrawCErc20',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'withdrawComp',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'asset',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenAmount',
            type: 'uint256',
          },
        ],
        name: 'withdrawErc20',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'withdrawEth',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        stateMutability: 'payable',
        type: 'receive',
      },
    ],
  },
  OFFERS: {
    ADDRESS: '0x540a59AD41a38b1Cc2B90D3adADC2F7417f1e451',
    ABI: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint8',
            name: 'version',
            type: 'uint8',
          },
        ],
        name: 'Initialized',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'creator',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'nftContractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'nftId',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'creator',
                type: 'address',
              },
              {
                internalType: 'uint32',
                name: 'duration',
                type: 'uint32',
              },
              {
                internalType: 'uint32',
                name: 'expiration',
                type: 'uint32',
              },
              {
                internalType: 'bool',
                name: 'fixedTerms',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'floorTerm',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'lenderOffer',
                type: 'bool',
              },
              {
                internalType: 'address',
                name: 'nftContractAddress',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'nftId',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'asset',
                type: 'address',
              },
              {
                internalType: 'uint128',
                name: 'amount',
                type: 'uint128',
              },
              {
                internalType: 'uint96',
                name: 'interestRatePerSecond',
                type: 'uint96',
              },
              {
                internalType: 'uint64',
                name: 'floorTermLimit',
                type: 'uint64',
              },
            ],
            indexed: false,
            internalType: 'struct IOffersStructs.Offer',
            name: 'offer',
            type: 'tuple',
          },
          {
            indexed: false,
            internalType: 'bytes32',
            name: 'offerHash',
            type: 'bytes32',
          },
        ],
        name: 'NewOffer',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'creator',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'nftContractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'nftId',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'creator',
                type: 'address',
              },
              {
                internalType: 'uint32',
                name: 'duration',
                type: 'uint32',
              },
              {
                internalType: 'uint32',
                name: 'expiration',
                type: 'uint32',
              },
              {
                internalType: 'bool',
                name: 'fixedTerms',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'floorTerm',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'lenderOffer',
                type: 'bool',
              },
              {
                internalType: 'address',
                name: 'nftContractAddress',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'nftId',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'asset',
                type: 'address',
              },
              {
                internalType: 'uint128',
                name: 'amount',
                type: 'uint128',
              },
              {
                internalType: 'uint96',
                name: 'interestRatePerSecond',
                type: 'uint96',
              },
              {
                internalType: 'uint64',
                name: 'floorTermLimit',
                type: 'uint64',
              },
            ],
            indexed: false,
            internalType: 'struct IOffersStructs.Offer',
            name: 'offer',
            type: 'tuple',
          },
          {
            indexed: false,
            internalType: 'bytes32',
            name: 'offerHash',
            type: 'bytes32',
          },
        ],
        name: 'OfferRemoved',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'nftContractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'nftId',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'creator',
                type: 'address',
              },
              {
                internalType: 'uint32',
                name: 'duration',
                type: 'uint32',
              },
              {
                internalType: 'uint32',
                name: 'expiration',
                type: 'uint32',
              },
              {
                internalType: 'bool',
                name: 'fixedTerms',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'floorTerm',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'lenderOffer',
                type: 'bool',
              },
              {
                internalType: 'address',
                name: 'nftContractAddress',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'nftId',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'asset',
                type: 'address',
              },
              {
                internalType: 'uint128',
                name: 'amount',
                type: 'uint128',
              },
              {
                internalType: 'uint96',
                name: 'interestRatePerSecond',
                type: 'uint96',
              },
              {
                internalType: 'uint64',
                name: 'floorTermLimit',
                type: 'uint64',
              },
            ],
            indexed: false,
            internalType: 'struct IOffersStructs.Offer',
            name: 'offer',
            type: 'tuple',
          },
          {
            indexed: false,
            internalType: 'bytes',
            name: 'signature',
            type: 'bytes',
          },
        ],
        name: 'OfferSignatureUsed',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'oldLendingContractAddress',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'newLendingContractAddress',
            type: 'address',
          },
        ],
        name: 'OffersXLendingContractAddressUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'oldSigLendingContractAddress',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'newSigLendingContractAddress',
            type: 'address',
          },
        ],
        name: 'OffersXSigLendingContractAddressUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'previousOwner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnershipTransferred',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'Paused',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'Unpaused',
        type: 'event',
      },
      {
        inputs: [
          {
            components: [
              {
                internalType: 'address',
                name: 'creator',
                type: 'address',
              },
              {
                internalType: 'uint32',
                name: 'duration',
                type: 'uint32',
              },
              {
                internalType: 'uint32',
                name: 'expiration',
                type: 'uint32',
              },
              {
                internalType: 'bool',
                name: 'fixedTerms',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'floorTerm',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'lenderOffer',
                type: 'bool',
              },
              {
                internalType: 'address',
                name: 'nftContractAddress',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'nftId',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'asset',
                type: 'address',
              },
              {
                internalType: 'uint128',
                name: 'amount',
                type: 'uint128',
              },
              {
                internalType: 'uint96',
                name: 'interestRatePerSecond',
                type: 'uint96',
              },
              {
                internalType: 'uint64',
                name: 'floorTermLimit',
                type: 'uint64',
              },
            ],
            internalType: 'struct IOffersStructs.Offer',
            name: 'offer',
            type: 'tuple',
          },
        ],
        name: 'createOffer',
        outputs: [
          {
            internalType: 'bytes32',
            name: 'offerHash',
            type: 'bytes32',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes32',
            name: 'offerHash',
            type: 'bytes32',
          },
        ],
        name: 'getFloorOfferCount',
        outputs: [
          {
            internalType: 'uint64',
            name: 'count',
            type: 'uint64',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'nftContractAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'nftId',
            type: 'uint256',
          },
          {
            internalType: 'bytes32',
            name: 'offerHash',
            type: 'bytes32',
          },
          {
            internalType: 'bool',
            name: 'floorTerm',
            type: 'bool',
          },
        ],
        name: 'getOffer',
        outputs: [
          {
            components: [
              {
                internalType: 'address',
                name: 'creator',
                type: 'address',
              },
              {
                internalType: 'uint32',
                name: 'duration',
                type: 'uint32',
              },
              {
                internalType: 'uint32',
                name: 'expiration',
                type: 'uint32',
              },
              {
                internalType: 'bool',
                name: 'fixedTerms',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'floorTerm',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'lenderOffer',
                type: 'bool',
              },
              {
                internalType: 'address',
                name: 'nftContractAddress',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'nftId',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'asset',
                type: 'address',
              },
              {
                internalType: 'uint128',
                name: 'amount',
                type: 'uint128',
              },
              {
                internalType: 'uint96',
                name: 'interestRatePerSecond',
                type: 'uint96',
              },
              {
                internalType: 'uint64',
                name: 'floorTermLimit',
                type: 'uint64',
              },
            ],
            internalType: 'struct IOffersStructs.Offer',
            name: '',
            type: 'tuple',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            components: [
              {
                internalType: 'address',
                name: 'creator',
                type: 'address',
              },
              {
                internalType: 'uint32',
                name: 'duration',
                type: 'uint32',
              },
              {
                internalType: 'uint32',
                name: 'expiration',
                type: 'uint32',
              },
              {
                internalType: 'bool',
                name: 'fixedTerms',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'floorTerm',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'lenderOffer',
                type: 'bool',
              },
              {
                internalType: 'address',
                name: 'nftContractAddress',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'nftId',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'asset',
                type: 'address',
              },
              {
                internalType: 'uint128',
                name: 'amount',
                type: 'uint128',
              },
              {
                internalType: 'uint96',
                name: 'interestRatePerSecond',
                type: 'uint96',
              },
              {
                internalType: 'uint64',
                name: 'floorTermLimit',
                type: 'uint64',
              },
            ],
            internalType: 'struct IOffersStructs.Offer',
            name: 'offer',
            type: 'tuple',
          },
        ],
        name: 'getOfferHash',
        outputs: [
          {
            internalType: 'bytes32',
            name: '',
            type: 'bytes32',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes',
            name: 'signature',
            type: 'bytes',
          },
        ],
        name: 'getOfferSignatureStatus',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            components: [
              {
                internalType: 'address',
                name: 'creator',
                type: 'address',
              },
              {
                internalType: 'uint32',
                name: 'duration',
                type: 'uint32',
              },
              {
                internalType: 'uint32',
                name: 'expiration',
                type: 'uint32',
              },
              {
                internalType: 'bool',
                name: 'fixedTerms',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'floorTerm',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'lenderOffer',
                type: 'bool',
              },
              {
                internalType: 'address',
                name: 'nftContractAddress',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'nftId',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'asset',
                type: 'address',
              },
              {
                internalType: 'uint128',
                name: 'amount',
                type: 'uint128',
              },
              {
                internalType: 'uint96',
                name: 'interestRatePerSecond',
                type: 'uint96',
              },
              {
                internalType: 'uint64',
                name: 'floorTermLimit',
                type: 'uint64',
              },
            ],
            internalType: 'struct IOffersStructs.Offer',
            name: 'offer',
            type: 'tuple',
          },
          {
            internalType: 'bytes',
            name: 'signature',
            type: 'bytes',
          },
        ],
        name: 'getOfferSigner',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes',
            name: 'signature',
            type: 'bytes',
          },
        ],
        name: 'getSigFloorOfferCount',
        outputs: [
          {
            internalType: 'uint64',
            name: 'count',
            type: 'uint64',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes32',
            name: 'offerHash',
            type: 'bytes32',
          },
        ],
        name: 'incrementFloorOfferCount',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes',
            name: 'signature',
            type: 'bytes',
          },
        ],
        name: 'incrementSigFloorOfferCount',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'newliquidityContractAddress',
            type: 'address',
          },
        ],
        name: 'initialize',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'lendingContractAddress',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'liquidityContractAddress',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            components: [
              {
                internalType: 'address',
                name: 'creator',
                type: 'address',
              },
              {
                internalType: 'uint32',
                name: 'duration',
                type: 'uint32',
              },
              {
                internalType: 'uint32',
                name: 'expiration',
                type: 'uint32',
              },
              {
                internalType: 'bool',
                name: 'fixedTerms',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'floorTerm',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'lenderOffer',
                type: 'bool',
              },
              {
                internalType: 'address',
                name: 'nftContractAddress',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'nftId',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'asset',
                type: 'address',
              },
              {
                internalType: 'uint128',
                name: 'amount',
                type: 'uint128',
              },
              {
                internalType: 'uint96',
                name: 'interestRatePerSecond',
                type: 'uint96',
              },
              {
                internalType: 'uint64',
                name: 'floorTermLimit',
                type: 'uint64',
              },
            ],
            internalType: 'struct IOffersStructs.Offer',
            name: 'offer',
            type: 'tuple',
          },
          {
            internalType: 'bytes',
            name: 'signature',
            type: 'bytes',
          },
        ],
        name: 'markSignatureUsed',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'owner',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'pause',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'paused',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'nftContractAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'nftId',
            type: 'uint256',
          },
          {
            internalType: 'bytes32',
            name: 'offerHash',
            type: 'bytes32',
          },
          {
            internalType: 'bool',
            name: 'floorTerm',
            type: 'bool',
          },
        ],
        name: 'removeOffer',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes',
            name: 'signature',
            type: 'bytes',
          },
        ],
        name: 'requireAvailableSignature',
        outputs: [],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            components: [
              {
                internalType: 'address',
                name: 'creator',
                type: 'address',
              },
              {
                internalType: 'uint32',
                name: 'duration',
                type: 'uint32',
              },
              {
                internalType: 'uint32',
                name: 'expiration',
                type: 'uint32',
              },
              {
                internalType: 'bool',
                name: 'fixedTerms',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'floorTerm',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'lenderOffer',
                type: 'bool',
              },
              {
                internalType: 'address',
                name: 'nftContractAddress',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'nftId',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'asset',
                type: 'address',
              },
              {
                internalType: 'uint128',
                name: 'amount',
                type: 'uint128',
              },
              {
                internalType: 'uint96',
                name: 'interestRatePerSecond',
                type: 'uint96',
              },
              {
                internalType: 'uint64',
                name: 'floorTermLimit',
                type: 'uint64',
              },
            ],
            internalType: 'struct IOffersStructs.Offer',
            name: 'offer',
            type: 'tuple',
          },
        ],
        name: 'requireMinimumDuration',
        outputs: [],
        stateMutability: 'pure',
        type: 'function',
      },
      {
        inputs: [
          {
            components: [
              {
                internalType: 'address',
                name: 'creator',
                type: 'address',
              },
              {
                internalType: 'uint32',
                name: 'duration',
                type: 'uint32',
              },
              {
                internalType: 'uint32',
                name: 'expiration',
                type: 'uint32',
              },
              {
                internalType: 'bool',
                name: 'fixedTerms',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'floorTerm',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'lenderOffer',
                type: 'bool',
              },
              {
                internalType: 'address',
                name: 'nftContractAddress',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'nftId',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'asset',
                type: 'address',
              },
              {
                internalType: 'uint128',
                name: 'amount',
                type: 'uint128',
              },
              {
                internalType: 'uint96',
                name: 'interestRatePerSecond',
                type: 'uint96',
              },
              {
                internalType: 'uint64',
                name: 'floorTermLimit',
                type: 'uint64',
              },
            ],
            internalType: 'struct IOffersStructs.Offer',
            name: 'offer',
            type: 'tuple',
          },
        ],
        name: 'requireNoFloorTerms',
        outputs: [],
        stateMutability: 'pure',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes',
            name: 'signature',
            type: 'bytes',
          },
        ],
        name: 'requireSignature65',
        outputs: [],
        stateMutability: 'pure',
        type: 'function',
      },
      {
        inputs: [],
        name: 'sigLendingContractAddress',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'unpause',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'newLendingContractAddress',
            type: 'address',
          },
        ],
        name: 'updateLendingContractAddress',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'newSigLendingContractAddress',
            type: 'address',
          },
        ],
        name: 'updateSigLendingContractAddress',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            components: [
              {
                internalType: 'address',
                name: 'creator',
                type: 'address',
              },
              {
                internalType: 'uint32',
                name: 'duration',
                type: 'uint32',
              },
              {
                internalType: 'uint32',
                name: 'expiration',
                type: 'uint32',
              },
              {
                internalType: 'bool',
                name: 'fixedTerms',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'floorTerm',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'lenderOffer',
                type: 'bool',
              },
              {
                internalType: 'address',
                name: 'nftContractAddress',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'nftId',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'asset',
                type: 'address',
              },
              {
                internalType: 'uint128',
                name: 'amount',
                type: 'uint128',
              },
              {
                internalType: 'uint96',
                name: 'interestRatePerSecond',
                type: 'uint96',
              },
              {
                internalType: 'uint64',
                name: 'floorTermLimit',
                type: 'uint64',
              },
            ],
            internalType: 'struct IOffersStructs.Offer',
            name: 'offer',
            type: 'tuple',
          },
          {
            internalType: 'bytes',
            name: 'signature',
            type: 'bytes',
          },
        ],
        name: 'withdrawOfferSignature',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
  },
  CETH: {
    ADDRESS: '0x4Ddc2D193948926D02f9B1fE9e1daa0718270ED5',
    ABI: [
      {
        constant: true,
        inputs: [],
        name: 'name',
        outputs: [{ name: '', type: 'string' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          { name: 'spender', type: 'address' },
          { name: 'amount', type: 'uint256' },
        ],
        name: 'approve',
        outputs: [{ name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [],
        name: 'mint',
        outputs: [],
        payable: true,
        stateMutability: 'payable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'reserveFactorMantissa',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [{ name: 'account', type: 'address' }],
        name: 'borrowBalanceCurrent',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'totalSupply',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'exchangeRateStored',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          { name: 'src', type: 'address' },
          { name: 'dst', type: 'address' },
          { name: 'amount', type: 'uint256' },
        ],
        name: 'transferFrom',
        outputs: [{ name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'pendingAdmin',
        outputs: [{ name: '', type: 'address' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'decimals',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [{ name: 'owner', type: 'address' }],
        name: 'balanceOfUnderlying',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'getCash',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [{ name: 'newComptroller', type: 'address' }],
        name: '_setComptroller',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'totalBorrows',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [],
        name: 'repayBorrow',
        outputs: [],
        payable: true,
        stateMutability: 'payable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'comptroller',
        outputs: [{ name: '', type: 'address' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [{ name: 'reduceAmount', type: 'uint256' }],
        name: '_reduceReserves',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'initialExchangeRateMantissa',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'accrualBlockNumber',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [{ name: 'owner', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [],
        name: 'totalBorrowsCurrent',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [{ name: 'redeemAmount', type: 'uint256' }],
        name: 'redeemUnderlying',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'totalReserves',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'symbol',
        outputs: [{ name: '', type: 'string' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [{ name: 'account', type: 'address' }],
        name: 'borrowBalanceStored',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [],
        name: 'accrueInterest',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          { name: 'dst', type: 'address' },
          { name: 'amount', type: 'uint256' },
        ],
        name: 'transfer',
        outputs: [{ name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'borrowIndex',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          { name: 'borrower', type: 'address' },
          { name: 'cTokenCollateral', type: 'address' },
        ],
        name: 'liquidateBorrow',
        outputs: [],
        payable: true,
        stateMutability: 'payable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'supplyRatePerBlock',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          { name: 'liquidator', type: 'address' },
          { name: 'borrower', type: 'address' },
          { name: 'seizeTokens', type: 'uint256' },
        ],
        name: 'seize',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [{ name: 'newPendingAdmin', type: 'address' }],
        name: '_setPendingAdmin',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [],
        name: 'exchangeRateCurrent',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [{ name: 'account', type: 'address' }],
        name: 'getAccountSnapshot',
        outputs: [
          { name: '', type: 'uint256' },
          { name: '', type: 'uint256' },
          { name: '', type: 'uint256' },
          { name: '', type: 'uint256' },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [{ name: 'borrowAmount', type: 'uint256' }],
        name: 'borrow',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [{ name: 'redeemTokens', type: 'uint256' }],
        name: 'redeem',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [
          { name: 'owner', type: 'address' },
          { name: 'spender', type: 'address' },
        ],
        name: 'allowance',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [{ name: 'borrower', type: 'address' }],
        name: 'repayBorrowBehalf',
        outputs: [],
        payable: true,
        stateMutability: 'payable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [],
        name: '_acceptAdmin',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [{ name: 'newInterestRateModel', type: 'address' }],
        name: '_setInterestRateModel',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'interestRateModel',
        outputs: [{ name: '', type: 'address' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'admin',
        outputs: [{ name: '', type: 'address' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'borrowRatePerBlock',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [{ name: 'newReserveFactorMantissa', type: 'uint256' }],
        name: '_setReserveFactor',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'isCToken',
        outputs: [{ name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          { name: 'comptroller_', type: 'address' },
          { name: 'interestRateModel_', type: 'address' },
          { name: 'initialExchangeRateMantissa_', type: 'uint256' },
          { name: 'name_', type: 'string' },
          { name: 'symbol_', type: 'string' },
          { name: 'decimals_', type: 'uint256' },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      { payable: true, stateMutability: 'payable', type: 'fallback' },
      {
        anonymous: false,
        inputs: [
          { indexed: false, name: 'interestAccumulated', type: 'uint256' },
          { indexed: false, name: 'borrowIndex', type: 'uint256' },
          { indexed: false, name: 'totalBorrows', type: 'uint256' },
        ],
        name: 'AccrueInterest',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          { indexed: false, name: 'minter', type: 'address' },
          { indexed: false, name: 'mintAmount', type: 'uint256' },
          { indexed: false, name: 'mintTokens', type: 'uint256' },
        ],
        name: 'Mint',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          { indexed: false, name: 'redeemer', type: 'address' },
          { indexed: false, name: 'redeemAmount', type: 'uint256' },
          { indexed: false, name: 'redeemTokens', type: 'uint256' },
        ],
        name: 'Redeem',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          { indexed: false, name: 'borrower', type: 'address' },
          { indexed: false, name: 'borrowAmount', type: 'uint256' },
          { indexed: false, name: 'accountBorrows', type: 'uint256' },
          { indexed: false, name: 'totalBorrows', type: 'uint256' },
        ],
        name: 'Borrow',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          { indexed: false, name: 'payer', type: 'address' },
          { indexed: false, name: 'borrower', type: 'address' },
          { indexed: false, name: 'repayAmount', type: 'uint256' },
          { indexed: false, name: 'accountBorrows', type: 'uint256' },
          { indexed: false, name: 'totalBorrows', type: 'uint256' },
        ],
        name: 'RepayBorrow',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          { indexed: false, name: 'liquidator', type: 'address' },
          { indexed: false, name: 'borrower', type: 'address' },
          { indexed: false, name: 'repayAmount', type: 'uint256' },
          { indexed: false, name: 'cTokenCollateral', type: 'address' },
          { indexed: false, name: 'seizeTokens', type: 'uint256' },
        ],
        name: 'LiquidateBorrow',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          { indexed: false, name: 'oldPendingAdmin', type: 'address' },
          { indexed: false, name: 'newPendingAdmin', type: 'address' },
        ],
        name: 'NewPendingAdmin',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          { indexed: false, name: 'oldAdmin', type: 'address' },
          { indexed: false, name: 'newAdmin', type: 'address' },
        ],
        name: 'NewAdmin',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          { indexed: false, name: 'oldComptroller', type: 'address' },
          { indexed: false, name: 'newComptroller', type: 'address' },
        ],
        name: 'NewComptroller',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          { indexed: false, name: 'oldInterestRateModel', type: 'address' },
          { indexed: false, name: 'newInterestRateModel', type: 'address' },
        ],
        name: 'NewMarketInterestRateModel',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          { indexed: false, name: 'oldReserveFactorMantissa', type: 'uint256' },
          { indexed: false, name: 'newReserveFactorMantissa', type: 'uint256' },
        ],
        name: 'NewReserveFactor',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          { indexed: false, name: 'admin', type: 'address' },
          { indexed: false, name: 'reduceAmount', type: 'uint256' },
          { indexed: false, name: 'newTotalReserves', type: 'uint256' },
        ],
        name: 'ReservesReduced',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          { indexed: false, name: 'error', type: 'uint256' },
          { indexed: false, name: 'info', type: 'uint256' },
          { indexed: false, name: 'detail', type: 'uint256' },
        ],
        name: 'Failure',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: 'from', type: 'address' },
          { indexed: true, name: 'to', type: 'address' },
          { indexed: false, name: 'amount', type: 'uint256' },
        ],
        name: 'Transfer',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: 'owner', type: 'address' },
          { indexed: true, name: 'spender', type: 'address' },
          { indexed: false, name: 'amount', type: 'uint256' },
        ],
        name: 'Approval',
        type: 'event',
      },
    ],
  },
} as const;
