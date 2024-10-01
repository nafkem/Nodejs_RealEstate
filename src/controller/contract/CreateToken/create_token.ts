import { ethers, formatUnits } from "ethers";
import { landMarketplaceContract } from "../../../utils/connection";

// Create a new token (property)
export const createToken = async (contractAddress: string, data: any) => {
  try {
    // Get the contract with a signer for a write operation
    let tokenSigner = await landMarketplaceContract(contractAddress, true);

    // Call the smart contract's `createToken` function
    await tokenSigner.createToken(
      data["tokenURI"],        // Token URI for metadata
      ethers.parseUnits(data["price"], 18),  // Convert price to the right units
      data["ipfsHash"]         // IPFS hash for property images/documents
    );

    // Create a Promise to wait for the "TokenCreated" event
    const tokenCreatedPromise = new Promise<{
      tokenId: any;
      price: any;
      tokenURI: string;
      owner: string;
    }>((resolve, reject) => {
      const listener = async (
        tokenId: any,
        price: any,
        tokenURI: string,
        owner: string,
        event: any
      ) => {
        resolve({
          tokenId,
          price,
          tokenURI,
          owner,
        });
        event.removeListener();
      };

      // Listen for the "TokenCreated" event from the contract
      landMarketplaceContract(contractAddress, false).on("TokenCreated", listener);
    });

    // Wait for the Promise to be resolved (i.e., the "TokenCreated" event to be emitted)
    const { tokenId, price, tokenURI, owner } = await tokenCreatedPromise;

    // Format the returned data into a readable format
    const tokenData = {
      tokenId: formatUnits(tokenId, 0),
      price: formatUnits(price, 18),
      tokenURI,
      owner,
    };

    return { statusCode: 200, data: tokenData };
  } catch (error: any) {
    return { statusCode: 400, error: error.reason };
  }
};
// Get all listed properties (tokens)
export const getAllcreatedToken = async (contractAddress: any) => {
  try {
    const res = await landMarketplaceContract(contractAddress, false).getAllProperties();

    const properties = res.map((property: any) => ({
      tokenId: formatUnits(property.tokenId, 0),
      price: formatUnits(property.price, 18),
      tokenURI: property.tokenURI,
      owner: property.owner,
    }));

    return { statusCode: 200, data: properties };
  } catch (error: any) {
    return { statusCode: 400, error: error.reason };
  }
};
// Get a specific property by token ID
export const getTokenByID = async (contractAddress: string, data: any) => {
  const { tokenId } = data;
  try {
    const res = await landMarketplaceContract(contractAddress, false).getTokenById(tokenId);

    const property = {
      tokenId: formatUnits(res[0], 0),
      price: formatUnits(res[1], 18),
      tokenURI: res[2],
      owner: res[3],
    };

    return { statusCode: 200, data: property };
  } catch (error: any) {
    return { statusCode: 400, error: error.reason };
  }
};
// Update a property's price
export const updateToken = async (contractAddress: string, data: any) => {
  try {
    await landMarketplaceContract(contractAddress, true).updateToken(
      data["tokenId"],
      ethers.parseUnits(data["newPrice"], 18)
    );

    // Create a Promise to wait for the "PropertyUpdated" event
    const tokenUpdatedPromise = new Promise<{
      tokenId: any;
      newPrice: any;
    }>((resolve, reject) => {
      const listener = async (tokenId: any, newPrice: any, event: any) => {
        resolve({
          tokenId,
          newPrice,
        });
        event.removeListener();
      };

      landMarketplaceContract(contractAddress, false).on("TokenUpdated", listener);
    });

    // Wait for the Promise to be resolved
    const { tokenId, newPrice } = await tokenUpdatedPromise;

    const updatedToken
     = {
      tokenId: formatUnits(tokenId, 0),
      newPrice: formatUnits(newPrice, 18),
    };

    return { statusCode: 200, data: updatedToken
      
     };
  } catch (error: any) {
    return { statusCode: 400, error: error.reason };
  }
};
