import { useMemo, useState } from "react";
import { loaders } from "../utils/contracts";
import { Contract } from "../utils/types";
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
