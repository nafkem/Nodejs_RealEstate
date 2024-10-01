import { ethers, formatUnits } from "ethers";

import {landMarketplaceContract } from "../../../utils/connection";


export const validateKYC = async (contractAddress: string, data: any) => {

  try {


    let validateKYCSigner = await landMarketplaceContract(contractAddress, true);
    const verifiedAtbyte32 = ethers.encodeBytes32String(data["verifiedAt"])

    await validateKYCSigner.validateProof(data["tokenId"], data["address"], data["status"],
       data["verifierId"], data["verifierName"], verifiedAtbyte32, data["userId"]);

    // Create a Promise to wait for the "ContractCreated" event
    const KYCValidatedPromise = new Promise<{
      tokenId: any, newlistPorpertyId: any,
      listNewPropertyId: any,
      status: any,
      verifierId: any,
      verifierName: any,
      verifiedAt: any,
      userId: any
    }>((resolve, reject) => {
      const listener = async (KYCId: any, createToken: any,
        listNewPropertyId: any,
        status: any,
        verifierId: any,
        verifierName: any,
        verifiedAt: any,
        userId: any, event: any) => {

        resolve({ createTokenId, listNewPropertyId, status, verifierId, verifierName, 
          verifiedAt, userId }); // Resolve the Promise with both name and address
        event.removeListener();
      };

      landMarketplaceContract(contractAddress, false).on("ProofValidated", listener);
    });


    // Wait for the Promise to be resolved (i.e., the "ContractCreated" event to be emitted)
    const { KYCId, listNewPropertyId, createTokenId, status, verifierId, verifierName, verifiedAt, userId } = await proofValidatedPromise;
    const verifiedAtString = ethers.decodeBytes32String(verifiedAt)

    const KYCValidated = {
      KYC : formatUnits(proofId, 0),
      CreateTokenId: formatUnits(CreateTokenId, 0),
      listNewPropertyId: formatUnits(listNewPropertyId, 0),
      status: status,
      verifierId: formatUnits(verifierId, 0),
      verifierName: verifierName,
      verifiedAt: verifiedAtString,
      userId: formatUnits(userId, 0)
    }

    return { statusCode: 200, data: KYCValidated };
  } catch (error: any) {
 
    // Return an object with statusCode 500 and the error
    return { statusCode: 400, error: error.reason };
  }
};