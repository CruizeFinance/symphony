import { ethers, Signer } from "ethers";
import { useMemo, useState } from "react";

export const useSigner = (): Signer | undefined => {
  const [signer, setSigner] = useState<Signer>();

  useMemo(async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      setSigner(provider.getSigner());
    } catch (error) {
      console.log(error);
    }
  }, []);
  return signer;
};
