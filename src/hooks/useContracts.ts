import { useMemo, useState } from "react";
import { Contract,loaders } from "../utils";
import { useSigner } from "./useSigner";


export const useContracts = (name: string) => {
  const signer = useSigner();
  const [contract, setContract] = useState<Contract>();
  useMemo(() => {
    if (signer !== undefined) {
      setContract(loaders[name](signer));
    }
  }, [name]);

  return contract;
};
