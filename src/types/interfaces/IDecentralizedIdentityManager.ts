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
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export interface IDecentralizedIdentityManagerInterface
  extends utils.Interface {
  functions: {
    "createUser(bytes32,bytes32)": FunctionFragment;
    "getUser(address)": FunctionFragment;
    "updateUser(address,bytes32,bytes32)": FunctionFragment;
    "verifyUserSignature(address,bytes32,uint8,bytes32,bytes32)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "createUser"
      | "getUser"
      | "updateUser"
      | "verifyUserSignature"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "createUser",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "getUser",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "updateUser",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "verifyUserSignature",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>
    ]
  ): string;

  decodeFunctionResult(functionFragment: "createUser", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getUser", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "updateUser", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "verifyUserSignature",
    data: BytesLike
  ): Result;

  events: {};
}

export interface IDecentralizedIdentityManager extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IDecentralizedIdentityManagerInterface;

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
    createUser(
      nickname: PromiseOrValue<BytesLike>,
      publicKey: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getUser(
      userId: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [string, string, BigNumber, BigNumber] & {
        nickname: string;
        publicKey: string;
        registrationTime: BigNumber;
        lastUpdateTime: BigNumber;
      }
    >;

    updateUser(
      userId: PromiseOrValue<string>,
      nickname: PromiseOrValue<BytesLike>,
      publicKey: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    verifyUserSignature(
      userId: PromiseOrValue<string>,
      messageHash: PromiseOrValue<BytesLike>,
      v: PromiseOrValue<BigNumberish>,
      r: PromiseOrValue<BytesLike>,
      s: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
  };

  createUser(
    nickname: PromiseOrValue<BytesLike>,
    publicKey: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getUser(
    userId: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<
    [string, string, BigNumber, BigNumber] & {
      nickname: string;
      publicKey: string;
      registrationTime: BigNumber;
      lastUpdateTime: BigNumber;
    }
  >;

  updateUser(
    userId: PromiseOrValue<string>,
    nickname: PromiseOrValue<BytesLike>,
    publicKey: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  verifyUserSignature(
    userId: PromiseOrValue<string>,
    messageHash: PromiseOrValue<BytesLike>,
    v: PromiseOrValue<BigNumberish>,
    r: PromiseOrValue<BytesLike>,
    s: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  callStatic: {
    createUser(
      nickname: PromiseOrValue<BytesLike>,
      publicKey: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    getUser(
      userId: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [string, string, BigNumber, BigNumber] & {
        nickname: string;
        publicKey: string;
        registrationTime: BigNumber;
        lastUpdateTime: BigNumber;
      }
    >;

    updateUser(
      userId: PromiseOrValue<string>,
      nickname: PromiseOrValue<BytesLike>,
      publicKey: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    verifyUserSignature(
      userId: PromiseOrValue<string>,
      messageHash: PromiseOrValue<BytesLike>,
      v: PromiseOrValue<BigNumberish>,
      r: PromiseOrValue<BytesLike>,
      s: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {};

  estimateGas: {
    createUser(
      nickname: PromiseOrValue<BytesLike>,
      publicKey: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getUser(
      userId: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    updateUser(
      userId: PromiseOrValue<string>,
      nickname: PromiseOrValue<BytesLike>,
      publicKey: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    verifyUserSignature(
      userId: PromiseOrValue<string>,
      messageHash: PromiseOrValue<BytesLike>,
      v: PromiseOrValue<BigNumberish>,
      r: PromiseOrValue<BytesLike>,
      s: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    createUser(
      nickname: PromiseOrValue<BytesLike>,
      publicKey: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getUser(
      userId: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    updateUser(
      userId: PromiseOrValue<string>,
      nickname: PromiseOrValue<BytesLike>,
      publicKey: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    verifyUserSignature(
      userId: PromiseOrValue<string>,
      messageHash: PromiseOrValue<BytesLike>,
      v: PromiseOrValue<BigNumberish>,
      r: PromiseOrValue<BytesLike>,
      s: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
