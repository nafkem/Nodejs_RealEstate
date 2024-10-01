import { txFactorySigner, factoryContract } from "../../utils/connection";

export const createContract = async (contractName: string) => {
  try {
    await txFactorySigner.createSwearITContract(contractName);

    // Create a Promise to wait for the "ContractCreated" event
    const contractCreatedPromise = new Promise<{ name: string; contractAddress: string }>((resolve, reject) => {
      const listener = async (name: any, contractAddress: any, event: any) => {

        resolve({ name, contractAddress }); // Resolve the Promise with both name and address
        event.removeListener();
      };

      factoryContract.on("ContractCreated", listener);
    });

    // Wait for the Promise to be resolved (i.e., the "ContractCreated" event to be emitted)
    const { name, contractAddress } = await contractCreatedPromise;

    // Now you can return both the contract name and address
    
   return { statusCode: 200, data: { name,contractAddress} }
  } catch (error:any) {
    return{ statusCode: 400, error: error.reason};
  }
};