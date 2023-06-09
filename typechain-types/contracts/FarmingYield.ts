/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export interface FarmingYieldInterface extends utils.Interface {
  functions: {
    "accReward1PerShare()": FunctionFragment;
    "accReward2PerShare()": FunctionFragment;
    "claim()": FunctionFragment;
    "deposit(uint256)": FunctionFragment;
    "depositFee()": FunctionFragment;
    "getFundInfo(address)": FunctionFragment;
    "lastBlockTimeStamp(address)": FunctionFragment;
    "lastRewardBlock()": FunctionFragment;
    "lockPeriod()": FunctionFragment;
    "owner()": FunctionFragment;
    "pendingReward(address)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "reward1PerBlock()": FunctionFragment;
    "reward2PerBlock()": FunctionFragment;
    "rewardToken1()": FunctionFragment;
    "rewardToken2()": FunctionFragment;
    "stakingToken()": FunctionFragment;
    "totalStaked()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "treasury()": FunctionFragment;
    "update()": FunctionFragment;
    "userInfo(address)": FunctionFragment;
    "withdraw(uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "accReward1PerShare"
      | "accReward2PerShare"
      | "claim"
      | "deposit"
      | "depositFee"
      | "getFundInfo"
      | "lastBlockTimeStamp"
      | "lastRewardBlock"
      | "lockPeriod"
      | "owner"
      | "pendingReward"
      | "renounceOwnership"
      | "reward1PerBlock"
      | "reward2PerBlock"
      | "rewardToken1"
      | "rewardToken2"
      | "stakingToken"
      | "totalStaked"
      | "transferOwnership"
      | "treasury"
      | "update"
      | "userInfo"
      | "withdraw"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "accReward1PerShare",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "accReward2PerShare",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "claim", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "deposit",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "depositFee",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getFundInfo",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "lastBlockTimeStamp",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "lastRewardBlock",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "lockPeriod",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "pendingReward",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "reward1PerBlock",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "reward2PerBlock",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "rewardToken1",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "rewardToken2",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "stakingToken",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "totalStaked",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "treasury", values?: undefined): string;
  encodeFunctionData(functionFragment: "update", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "userInfo",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(
    functionFragment: "accReward1PerShare",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "accReward2PerShare",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "claim", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "depositFee", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getFundInfo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "lastBlockTimeStamp",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "lastRewardBlock",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "lockPeriod", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "pendingReward",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "reward1PerBlock",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "reward2PerBlock",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "rewardToken1",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "rewardToken2",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "stakingToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalStaked",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "treasury", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "update", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "userInfo", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {
    "Claim(address,uint256,uint256)": EventFragment;
    "Deposit(address,uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "Withdraw(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Claim"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Deposit"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Withdraw"): EventFragment;
}

export interface ClaimEventObject {
  user: string;
  amount1: BigNumber;
  amount2: BigNumber;
}
export type ClaimEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  ClaimEventObject
>;

export type ClaimEventFilter = TypedEventFilter<ClaimEvent>;

export interface DepositEventObject {
  user: string;
  amount: BigNumber;
}
export type DepositEvent = TypedEvent<[string, BigNumber], DepositEventObject>;

export type DepositEventFilter = TypedEventFilter<DepositEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface WithdrawEventObject {
  user: string;
  amount: BigNumber;
}
export type WithdrawEvent = TypedEvent<
  [string, BigNumber],
  WithdrawEventObject
>;

export type WithdrawEventFilter = TypedEventFilter<WithdrawEvent>;

export interface FarmingYield extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: FarmingYieldInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    accReward1PerShare(overrides?: CallOverrides): Promise<[BigNumber]>;

    accReward2PerShare(overrides?: CallOverrides): Promise<[BigNumber]>;

    claim(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    deposit(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    depositFee(overrides?: CallOverrides): Promise<[BigNumber]>;

    getFundInfo(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber]>;

    lastBlockTimeStamp(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    lastRewardBlock(overrides?: CallOverrides): Promise<[BigNumber]>;

    lockPeriod(overrides?: CallOverrides): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    pendingReward(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber]>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    reward1PerBlock(overrides?: CallOverrides): Promise<[BigNumber]>;

    reward2PerBlock(overrides?: CallOverrides): Promise<[BigNumber]>;

    rewardToken1(overrides?: CallOverrides): Promise<[string]>;

    rewardToken2(overrides?: CallOverrides): Promise<[string]>;

    stakingToken(overrides?: CallOverrides): Promise<[string]>;

    totalStaked(overrides?: CallOverrides): Promise<[BigNumber]>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    treasury(overrides?: CallOverrides): Promise<[string]>;

    update(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    userInfo(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        amount: BigNumber;
        reward1Debt: BigNumber;
        reward2Debt: BigNumber;
      }
    >;

    withdraw(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  accReward1PerShare(overrides?: CallOverrides): Promise<BigNumber>;

  accReward2PerShare(overrides?: CallOverrides): Promise<BigNumber>;

  claim(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  deposit(
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  depositFee(overrides?: CallOverrides): Promise<BigNumber>;

  getFundInfo(
    _user: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber]>;

  lastBlockTimeStamp(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  lastRewardBlock(overrides?: CallOverrides): Promise<BigNumber>;

  lockPeriod(overrides?: CallOverrides): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  pendingReward(
    _user: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber]>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  reward1PerBlock(overrides?: CallOverrides): Promise<BigNumber>;

  reward2PerBlock(overrides?: CallOverrides): Promise<BigNumber>;

  rewardToken1(overrides?: CallOverrides): Promise<string>;

  rewardToken2(overrides?: CallOverrides): Promise<string>;

  stakingToken(overrides?: CallOverrides): Promise<string>;

  totalStaked(overrides?: CallOverrides): Promise<BigNumber>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  treasury(overrides?: CallOverrides): Promise<string>;

  update(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  userInfo(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber] & {
      amount: BigNumber;
      reward1Debt: BigNumber;
      reward2Debt: BigNumber;
    }
  >;

  withdraw(
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    accReward1PerShare(overrides?: CallOverrides): Promise<BigNumber>;

    accReward2PerShare(overrides?: CallOverrides): Promise<BigNumber>;

    claim(overrides?: CallOverrides): Promise<void>;

    deposit(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    depositFee(overrides?: CallOverrides): Promise<BigNumber>;

    getFundInfo(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber]>;

    lastBlockTimeStamp(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    lastRewardBlock(overrides?: CallOverrides): Promise<BigNumber>;

    lockPeriod(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    pendingReward(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber]>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    reward1PerBlock(overrides?: CallOverrides): Promise<BigNumber>;

    reward2PerBlock(overrides?: CallOverrides): Promise<BigNumber>;

    rewardToken1(overrides?: CallOverrides): Promise<string>;

    rewardToken2(overrides?: CallOverrides): Promise<string>;

    stakingToken(overrides?: CallOverrides): Promise<string>;

    totalStaked(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    treasury(overrides?: CallOverrides): Promise<string>;

    update(overrides?: CallOverrides): Promise<void>;

    userInfo(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        amount: BigNumber;
        reward1Debt: BigNumber;
        reward2Debt: BigNumber;
      }
    >;

    withdraw(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "Claim(address,uint256,uint256)"(
      user?: PromiseOrValue<string> | null,
      amount1?: null,
      amount2?: null
    ): ClaimEventFilter;
    Claim(
      user?: PromiseOrValue<string> | null,
      amount1?: null,
      amount2?: null
    ): ClaimEventFilter;

    "Deposit(address,uint256)"(
      user?: PromiseOrValue<string> | null,
      amount?: null
    ): DepositEventFilter;
    Deposit(
      user?: PromiseOrValue<string> | null,
      amount?: null
    ): DepositEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;

    "Withdraw(address,uint256)"(
      user?: PromiseOrValue<string> | null,
      amount?: null
    ): WithdrawEventFilter;
    Withdraw(
      user?: PromiseOrValue<string> | null,
      amount?: null
    ): WithdrawEventFilter;
  };

  estimateGas: {
    accReward1PerShare(overrides?: CallOverrides): Promise<BigNumber>;

    accReward2PerShare(overrides?: CallOverrides): Promise<BigNumber>;

    claim(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    deposit(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    depositFee(overrides?: CallOverrides): Promise<BigNumber>;

    getFundInfo(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    lastBlockTimeStamp(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    lastRewardBlock(overrides?: CallOverrides): Promise<BigNumber>;

    lockPeriod(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    pendingReward(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    reward1PerBlock(overrides?: CallOverrides): Promise<BigNumber>;

    reward2PerBlock(overrides?: CallOverrides): Promise<BigNumber>;

    rewardToken1(overrides?: CallOverrides): Promise<BigNumber>;

    rewardToken2(overrides?: CallOverrides): Promise<BigNumber>;

    stakingToken(overrides?: CallOverrides): Promise<BigNumber>;

    totalStaked(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    treasury(overrides?: CallOverrides): Promise<BigNumber>;

    update(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    userInfo(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    withdraw(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    accReward1PerShare(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    accReward2PerShare(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    claim(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    deposit(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    depositFee(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getFundInfo(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    lastBlockTimeStamp(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    lastRewardBlock(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    lockPeriod(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pendingReward(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    reward1PerBlock(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    reward2PerBlock(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    rewardToken1(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    rewardToken2(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    stakingToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    totalStaked(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    treasury(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    update(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    userInfo(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    withdraw(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
