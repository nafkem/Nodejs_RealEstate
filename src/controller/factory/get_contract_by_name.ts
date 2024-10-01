import { txFactorySigner, factoryContract } from "../../utils/connection";

export const getContractByName = async (contractName: string) => {
  try {
    let contractAddress = await factoryContract.getSwearITContractByName(contractName);
    return{ statusCode: 200, data:contractAddress};
  } catch (error:any) {
    return{ statusCode: 400, error: error.reason};
  }
};