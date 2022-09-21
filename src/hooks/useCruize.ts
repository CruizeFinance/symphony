import { BigNumber, ethers } from "ethers"
import { useCallback } from "react"
import { getSigner, LoadCruize } from "../utils/contracts"

export const Deposit =  () => {
    return useCallback(async(amount:string,reserve:string)=>{
       const Signer   = await getSigner()
       const CruizeContract = LoadCruize(Signer)
       const tx  = await CruizeContract.deposit(ethers.utils.parseEther(amount),reserve,{value:ethers.utils.parseEther(amount)})
       const tnx  = await tx.wait()
    },[])
   
}
export const Withdraw =  () => {
    return useCallback(async(amount:string,reserve:string)=>{
       const Signer   = await getSigner()
       const CruizeContract = LoadCruize(Signer)
       const tx  = await CruizeContract.withdraw(ethers.utils.parseEther(amount),reserve)
       const tnx  = await tx.wait()
    },[])
   
}