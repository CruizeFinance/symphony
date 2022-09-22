import { Signer } from "ethers";
import { IContracts } from "./types";
import { Cruize, Cruize__factory } from "../typechain";
import { contracts, DEFAULT_NETWORK } from "./constants";

// this will load the cruize smart contract .
export const LoadCruize = (singer: Signer): Cruize => {
  return Cruize__factory.connect(contracts[DEFAULT_NETWORK], singer);
};

/**
 * add new contracts loading handlers
 */
export const loaders: IContracts = {
  cruize: LoadCruize,
};
