import {  ethers } from "ethers";
import { useCallback } from "react";
import { useContracts } from "./useContracts";

export const useDeposit = () => {
  const CruizeContract = useContracts("cruize");

  return useCallback(
    async (amount: string, reserve: string) => {
      try {
        const tx = await CruizeContract?.deposit(
          ethers.utils.parseEther(amount),
          reserve,
          { value: ethers.utils.parseEther(amount) }
        );
        const tnx = await tx?.wait();
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    [CruizeContract]
  );
};
export const useWithdraw = () => {
  const CruizeContract = useContracts("cruize");
  return useCallback(
    async (amount: string, reserve: string) => {
      try {
        const tx = await CruizeContract?.withdraw(
          ethers.utils.parseEther(amount),
          reserve
        );
        const tnx = await tx?.wait();
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    [CruizeContract]
  );
};
