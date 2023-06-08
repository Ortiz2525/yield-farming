/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  FarmingYield,
  FarmingYieldInterface,
} from "../../contracts/FarmingYield";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "_stakingToken",
        type: "address",
      },
      {
        internalType: "contract ERC20Mock",
        name: "_rewardToken1",
        type: "address",
      },
      {
        internalType: "contract ERC20Mock",
        name: "_rewardToken2",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_depositFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_treasuryFee",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_treasury",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_reward1PerBlock",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_reward2PerBlock",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount2",
        type: "uint256",
      },
    ],
    name: "Claim",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Withdraw",
    type: "event",
  },
  {
    inputs: [],
    name: "accReward1PerShare",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "accReward2PerShare",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "depositFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "lastBlockTimeStamp",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lastRewardBlock",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lockPeriod",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
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
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "pendingReward",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "reward1PerBlock",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "reward2PerBlock",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "rewardToken1",
    outputs: [
      {
        internalType: "contract ERC20Mock",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "rewardToken2",
    outputs: [
      {
        internalType: "contract ERC20Mock",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "stakingToken",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalStaked",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "treasury",
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
    name: "treasuryFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "update",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "userInfo",
    outputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "reward1Debt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "reward2Debt",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405262278d006007553480156200001857600080fd5b50604051620021313803806200213183398181016040528101906200003e919062000396565b6200005e620000526200019b60201b60201c565b620001a360201b60201c565b87600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555086600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555085600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550846004819055508360058190555082600d60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550816008819055508060098190555043600a819055506000600b8190555050505050505050506200045f565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600062000299826200026c565b9050919050565b6000620002ad826200028c565b9050919050565b620002bf81620002a0565b8114620002cb57600080fd5b50565b600081519050620002df81620002b4565b92915050565b6000620002f2826200028c565b9050919050565b6200030481620002e5565b81146200031057600080fd5b50565b6000815190506200032481620002f9565b92915050565b6000819050919050565b6200033f816200032a565b81146200034b57600080fd5b50565b6000815190506200035f8162000334565b92915050565b62000370816200028c565b81146200037c57600080fd5b50565b600081519050620003908162000365565b92915050565b600080600080600080600080610100898b031215620003ba57620003b962000267565b5b6000620003ca8b828c01620002ce565b9850506020620003dd8b828c0162000313565b9750506040620003f08b828c0162000313565b9650506060620004038b828c016200034e565b9550506080620004168b828c016200034e565b94505060a0620004298b828c016200037f565b93505060c06200043c8b828c016200034e565b92505060e06200044f8b828c016200034e565b9150509295985092959890939650565b611cc2806200046f6000396000f3fe608060405234801561001057600080fd5b506004361061014d5760003560e01c8063817b1cd2116100c3578063bb9ce3f61161007c578063bb9ce3f614610324578063cc32d17614610354578063d61a47f114610372578063ea02b0e514610390578063f2fde38b146103ae578063f40f0f52146103ca5761014d565b8063817b1cd2146102865780638da5cb5b146102a4578063a2e62045146102c2578063a36e8600146102cc578063a9f8d181146102ea578063b6b55f25146103085761014d565b80635a98674b116101155780635a98674b146101e657806361d027b31461020457806367a52793146102225780636f28d68814610240578063715018a61461025e57806372f702f3146102685761014d565b80631959a002146101525780632e1a7d4d146101845780633fd8b02f146101a05780634e71d92d146101be578063532a6159146101c8575b600080fd5b61016c6004803603810190610167919061166b565b6103fb565b60405161017b939291906116b1565b60405180910390f35b61019e60048036038101906101999190611714565b610425565b005b6101a8610819565b6040516101b59190611741565b60405180910390f35b6101c661081f565b005b6101d0610a81565b6040516101dd9190611741565b60405180910390f35b6101ee610a87565b6040516101fb9190611741565b60405180910390f35b61020c610a8d565b604051610219919061176b565b60405180910390f35b61022a610ab3565b6040516102379190611741565b60405180910390f35b610248610ab9565b60405161025591906117e5565b60405180910390f35b610266610adf565b005b610270610af3565b60405161027d9190611821565b60405180910390f35b61028e610b19565b60405161029b9190611741565b60405180910390f35b6102ac610b1f565b6040516102b9919061176b565b60405180910390f35b6102ca610b48565b005b6102d4610e06565b6040516102e19190611741565b60405180910390f35b6102f2610e0c565b6040516102ff9190611741565b60405180910390f35b610322600480360381019061031d9190611714565b610e12565b005b61033e6004803603810190610339919061166b565b6112bd565b60405161034b9190611741565b60405180910390f35b61035c6112d5565b6040516103699190611741565b60405180910390f35b61037a6112db565b60405161038791906117e5565b60405180910390f35b610398611301565b6040516103a59190611741565b60405180910390f35b6103c860048036038101906103c3919061166b565b611307565b005b6103e460048036038101906103df919061166b565b61138a565b6040516103f292919061183c565b60405180910390f35b600e6020528060005260406000206000915090508060000154908060010154908060020154905083565b60008111610468576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161045f906118c2565b60405180910390fd5b6000600e60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905062278d00600f60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054426104fa9190611911565b101561053b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161053290611991565b60405180910390fd5b610543610b48565b60008061054f3361138a565b91509150600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33846040518363ffffffff1660e01b81526004016105b09291906119b1565b6020604051808303816000875af11580156105cf573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105f39190611a12565b50600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33836040518363ffffffff1660e01b81526004016106519291906119b1565b6020604051808303816000875af1158015610670573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106949190611a12565b506106ac84846000015461146690919063ffffffff16565b83600001819055506106e464e8d4a510006106d6600b54866000015461147c90919063ffffffff16565b61149290919063ffffffff16565b836001018190555061071c64e8d4a5100061070e600c54866000015461147c90919063ffffffff16565b61149290919063ffffffff16565b8360020181905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33866040518363ffffffff1660e01b81526004016107819291906119b1565b6020604051808303816000875af11580156107a0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107c49190611a12565b503373ffffffffffffffffffffffffffffffffffffffff167f884edad9ce6fa2440d8a54cc123490eb96d2768479d49ff9c7366125a94243648560405161080b9190611741565b60405180910390a250505050565b60075481565b6000600e60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905061086a610b48565b6000806108763361138a565b91509150600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33846040518363ffffffff1660e01b81526004016108d79291906119b1565b6020604051808303816000875af11580156108f6573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061091a9190611a12565b50600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33836040518363ffffffff1660e01b81526004016109789291906119b1565b6020604051808303816000875af1158015610997573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109bb9190611a12565b506109ec64e8d4a510006109de600b54866000015461147c90919063ffffffff16565b61149290919063ffffffff16565b8360010181905550610a2464e8d4a51000610a16600c54866000015461147c90919063ffffffff16565b61149290919063ffffffff16565b83600201819055503373ffffffffffffffffffffffffffffffffffffffff167f34fcbac0073d7c3d388e51312faf357774904998eeb8fca628b9e6f65ee1cbf78383604051610a7492919061183c565b60405180910390a2505050565b600b5481565b600c5481565b600d60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60045481565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b610ae76114a8565b610af16000611526565b565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60065481565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600a54431115610e04576000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401610baf919061176b565b602060405180830381865afa158015610bcc573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bf09190611a54565b905060008103610c075743600a8190555050610e04565b6000610c1e600a544361146690919063ffffffff16565b90506000610c376008548361147c90919063ffffffff16565b90506000610c506009548461147c90919063ffffffff16565b9050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166340c10f1930846040518363ffffffff1660e01b8152600401610caf9291906119b1565b600060405180830381600087803b158015610cc957600080fd5b505af1158015610cdd573d6000803e3d6000fd5b50505050600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166340c10f1930836040518363ffffffff1660e01b8152600401610d3e9291906119b1565b600060405180830381600087803b158015610d5857600080fd5b505af1158015610d6c573d6000803e3d6000fd5b50505050610dae610d9d85610d8f64e8d4a510008661147c90919063ffffffff16565b61149290919063ffffffff16565b600b546115ea90919063ffffffff16565b600b81905550610df2610de185610dd364e8d4a510008561147c90919063ffffffff16565b61149290919063ffffffff16565b600c546115ea90919063ffffffff16565b600c8190555043600a81905550505050505b565b60085481565b600a5481565b60008111610e55576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e4c906118c2565b60405180910390fd5b6000600e60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000209050610ea0610b48565b60008160000154111561100257600080610eb93361138a565b91509150600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33846040518363ffffffff1660e01b8152600401610f1a9291906119b1565b6020604051808303816000875af1158015610f39573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f5d9190611a12565b50600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33836040518363ffffffff1660e01b8152600401610fbb9291906119b1565b6020604051808303816000875af1158015610fda573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ffe9190611a12565b5050505b60006064600454846110149190611a81565b61101e9190611af2565b90506000818461102e9190611911565b9050600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330846040518463ffffffff1660e01b815260040161108f93929190611b23565b6020604051808303816000875af11580156110ae573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110d29190611a12565b50600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb600d60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16846040518363ffffffff1660e01b81526004016111529291906119b1565b6020604051808303816000875af1158015611171573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111959190611a12565b506111ad8184600001546115ea90919063ffffffff16565b83600001819055506111e564e8d4a510006111d7600b54866000015461147c90919063ffffffff16565b61149290919063ffffffff16565b836001018190555061121d64e8d4a5100061120f600c54866000015461147c90919063ffffffff16565b61149290919063ffffffff16565b836002018190555042600f60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055503373ffffffffffffffffffffffffffffffffffffffff167fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c826040516112af9190611741565b60405180910390a250505050565b600f6020528060005260406000206000915090505481565b60055481565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60095481565b61130f6114a8565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361137e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161137590611bcc565b60405180910390fd5b61138781611526565b50565b6000806000600e60008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000209050611416816001015461140864e8d4a510006113fa600b54866000015461147c90919063ffffffff16565b61149290919063ffffffff16565b61146690919063ffffffff16565b61145c826002015461144e64e8d4a51000611440600c54876000015461147c90919063ffffffff16565b61149290919063ffffffff16565b61146690919063ffffffff16565b9250925050915091565b600081836114749190611911565b905092915050565b6000818361148a9190611a81565b905092915050565b600081836114a09190611af2565b905092915050565b6114b0611600565b73ffffffffffffffffffffffffffffffffffffffff166114ce610b1f565b73ffffffffffffffffffffffffffffffffffffffff1614611524576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161151b90611c38565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600081836115f89190611c58565b905092915050565b600033905090565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006116388261160d565b9050919050565b6116488161162d565b811461165357600080fd5b50565b6000813590506116658161163f565b92915050565b60006020828403121561168157611680611608565b5b600061168f84828501611656565b91505092915050565b6000819050919050565b6116ab81611698565b82525050565b60006060820190506116c660008301866116a2565b6116d360208301856116a2565b6116e060408301846116a2565b949350505050565b6116f181611698565b81146116fc57600080fd5b50565b60008135905061170e816116e8565b92915050565b60006020828403121561172a57611729611608565b5b6000611738848285016116ff565b91505092915050565b600060208201905061175660008301846116a2565b92915050565b6117658161162d565b82525050565b6000602082019050611780600083018461175c565b92915050565b6000819050919050565b60006117ab6117a66117a18461160d565b611786565b61160d565b9050919050565b60006117bd82611790565b9050919050565b60006117cf826117b2565b9050919050565b6117df816117c4565b82525050565b60006020820190506117fa60008301846117d6565b92915050565b600061180b826117b2565b9050919050565b61181b81611800565b82525050565b60006020820190506118366000830184611812565b92915050565b600060408201905061185160008301856116a2565b61185e60208301846116a2565b9392505050565b600082825260208201905092915050565b7f416d6f756e74206d7573742062652067726561746572207468616e2030000000600082015250565b60006118ac601d83611865565b91506118b782611876565b602082019050919050565b600060208201905081810360008301526118db8161189f565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061191c82611698565b915061192783611698565b925082820390508181111561193f5761193e6118e2565b5b92915050565b7f6c6f636b5f706572696f642074696d6500000000000000000000000000000000600082015250565b600061197b601083611865565b915061198682611945565b602082019050919050565b600060208201905081810360008301526119aa8161196e565b9050919050565b60006040820190506119c6600083018561175c565b6119d360208301846116a2565b9392505050565b60008115159050919050565b6119ef816119da565b81146119fa57600080fd5b50565b600081519050611a0c816119e6565b92915050565b600060208284031215611a2857611a27611608565b5b6000611a36848285016119fd565b91505092915050565b600081519050611a4e816116e8565b92915050565b600060208284031215611a6a57611a69611608565b5b6000611a7884828501611a3f565b91505092915050565b6000611a8c82611698565b9150611a9783611698565b9250828202611aa581611698565b91508282048414831517611abc57611abb6118e2565b5b5092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000611afd82611698565b9150611b0883611698565b925082611b1857611b17611ac3565b5b828204905092915050565b6000606082019050611b38600083018661175c565b611b45602083018561175c565b611b5260408301846116a2565b949350505050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b6000611bb6602683611865565b9150611bc182611b5a565b604082019050919050565b60006020820190508181036000830152611be581611ba9565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000611c22602083611865565b9150611c2d82611bec565b602082019050919050565b60006020820190508181036000830152611c5181611c15565b9050919050565b6000611c6382611698565b9150611c6e83611698565b9250828201905080821115611c8657611c856118e2565b5b9291505056fea26469706673582212200b296750a41dd748bb2b291822d226cd79cf5eec6bf323e4b68a2800492e1f5264736f6c63430008120033";

type FarmingYieldConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: FarmingYieldConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class FarmingYield__factory extends ContractFactory {
  constructor(...args: FarmingYieldConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _stakingToken: PromiseOrValue<string>,
    _rewardToken1: PromiseOrValue<string>,
    _rewardToken2: PromiseOrValue<string>,
    _depositFee: PromiseOrValue<BigNumberish>,
    _treasuryFee: PromiseOrValue<BigNumberish>,
    _treasury: PromiseOrValue<string>,
    _reward1PerBlock: PromiseOrValue<BigNumberish>,
    _reward2PerBlock: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<FarmingYield> {
    return super.deploy(
      _stakingToken,
      _rewardToken1,
      _rewardToken2,
      _depositFee,
      _treasuryFee,
      _treasury,
      _reward1PerBlock,
      _reward2PerBlock,
      overrides || {}
    ) as Promise<FarmingYield>;
  }
  override getDeployTransaction(
    _stakingToken: PromiseOrValue<string>,
    _rewardToken1: PromiseOrValue<string>,
    _rewardToken2: PromiseOrValue<string>,
    _depositFee: PromiseOrValue<BigNumberish>,
    _treasuryFee: PromiseOrValue<BigNumberish>,
    _treasury: PromiseOrValue<string>,
    _reward1PerBlock: PromiseOrValue<BigNumberish>,
    _reward2PerBlock: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _stakingToken,
      _rewardToken1,
      _rewardToken2,
      _depositFee,
      _treasuryFee,
      _treasury,
      _reward1PerBlock,
      _reward2PerBlock,
      overrides || {}
    );
  }
  override attach(address: string): FarmingYield {
    return super.attach(address) as FarmingYield;
  }
  override connect(signer: Signer): FarmingYield__factory {
    return super.connect(signer) as FarmingYield__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): FarmingYieldInterface {
    return new utils.Interface(_abi) as FarmingYieldInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): FarmingYield {
    return new Contract(address, _abi, signerOrProvider) as FarmingYield;
  }
}