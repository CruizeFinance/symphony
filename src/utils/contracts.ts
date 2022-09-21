import { Cruize, Cruize__factory } from "../typechain";
import { contracts, DEFAULT_NETWORK } from "./constants";
import { ethers, Signer } from "ethers";

// this will load the cruize smart contract .
export const LoadCruize = (singer: Signer):Cruize => {
    return Cruize__factory.connect(contracts[DEFAULT_NETWORK], singer);
  };

export const getSigner = async (): Promise<Signer> => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    return provider.getSigner();
  };