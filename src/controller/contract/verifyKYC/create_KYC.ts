import { ethers, formatUnits } from "ethers";
import { landMarketplaceContract } from "../../../utils/connection";

// Create a new token (address)
export const createverifyKYC = async (contractAddress: string, data: any) => {
  try {
    // Get the contract with a signer for a write operation
    let verifyKYCSigner = await landMarketplaceContract(contractAddress, true);

    // Call the smart contract's `createToken` function
    await verifyKYCSigner.createverifyKYC(
      data["address"],        // Token URI for metadata
      data["ipfsHash"]         // IPFS hash for address images/documents
    );

    // Create a Promise to wait for the "TokenCreated" event
    const verifyKYCCreatedPromise = new Promise<{
      address: any;
    }>((resolve, reject) => {
      const listener = async (
        address: any,
        event: any
      ) => {
        resolve({
          address,
        });
        event.removeListener();
      };

      // Listen for the "TokenCreated" event from the contract
      landMarketplaceContract(contractAddress, false).on("verifyKYCCreated", listener);
    });

    // Wait for the Promise to be resolved (i.e., the "TokenCreated" event to be emitted)
    const { address } = await verifyKYCCreatedPromise;

    // Format the returned data into a readable format
    const verifyKYCData = {
      address: formatUnits(address, 0),
    };

    return { statusCode: 200, data: verifyKYCData };
  } catch (error: any) {
    return { statusCode: 400, error: error.reason };
  }
};
// Get all verifyKYC (tokens)
export const getAllcreatedverifyKYC = async (contractAddress: any) => {
  try {
    const res = await landMarketplaceContract(contractAddress, false).getAllverifyKYC();

    const verifyKYC = res.map((address: any) => ({
      address: formatUnits(address.tokenId, 0),
    }));

    return { statusCode: 200, data: verifyKYC };
  } catch (error: any) {
    return { statusCode: 400, error: error.reason };
  }
};
// Get a specific address by token ID
export const getverifyKYCByID = async (contractAddress: string, data: any) => {
  const { tokenId } = data;
  try {
    const res = await landMarketplaceContract(contractAddress, false).getverifyKYCById(tokenId);

    const address = {
      address: formatUnits(res[0], 0),
    };

    return { statusCode: 200, data: address };
  } catch (error: any) {
    return { statusCode: 400, error: error.reason };
  }
};
// Update a address's price
export const updateverifyKYC = async (contractAddress: string, data: any) => {
  try {
    await landMarketplaceContract(contractAddress, true).updateverifyKYC(
      data["address"],
    );

    // Create a Promise to wait for the "addressUpdated" event
    const verifyKYCUpdatedPromise = new Promise<{
      address: any;
    }>((resolve, reject) => {
      const listener = async (address: any,event: any) => {
        resolve({
          address,
        });
        event.removeListener();
      };

      landMarketplaceContract(contractAddress, false).on("verifyKYCUpdated", listener);
    });

    // Wait for the Promise to be resolved
    const { address } = await verifyKYCUpdatedPromise;

    const verifyKYC
     = {
      address: formatUnits(address, 0),
    };

    return { statusCode: 200, data: verifyKYC
      
     };
  } catch (error: any) {
    return { statusCode: 400, error: error.reason };
  }
};
