import { txFactorySigner, factoryContract } from "../../utils/connection";

export const getAllContracts = async () => {
  try {
    let contracts = await factoryContract.getAllSwearITContracts()
    return{ statusCode: 200, data: contracts};
  } catch (error:any) {
    return{ statusCode: 400, error: error.reason};
  }
};

