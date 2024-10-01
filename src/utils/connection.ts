// util/connection.js

// Import the necessary modules and configuration
const { COMMON_CONFIG } = require("../config/common"); // Importing the COMMON_CONFIG object from the "../config/common" module
import { ethers } from "ethers"; // Importing the ethers library
import { factoryABI } from "../config/factory_abi"; // Importing the factoryABI from the "../config/factory_abi" module
import { contractABI } from "../config/contract_abi";

// Declaring variables to store contract instances and signers
export let andMarketplaceContract: any, txFactorySigner: any,signer:any, provider:any;

// Creating a new JSON-RPC provider using the RPC_URL from the configuration
 provider = new ethers.JsonRpcProvider(COMMON_CONFIG.NETWORK_CONFIG.RPC_URL);

// Creating a new wallet instance using the PRIVATE_KEY from the configuration and the provider
 signer= new ethers.Wallet(COMMON_CONFIG.SECURITY_CONFIG.PRIVATE_KEY, provider);

// Creating a new contract instance for the factory contract using the factory contract address, ABI, and provider
andMarketplaceContract = new ethers.Contract(COMMON_CONFIG.NETWORK_CONFIG.FACTORY_CONTRACT_ADDRESS, factoryABI, provider);

// Connecting the signer to the factory contract instance
txFactorySigner = andMarketplaceContract.connect(signer);

// Defining a function to create a new contract instance for a SwearIT contract
export const landMarketplaceContract = (address: string, w: boolean) => {
  let contractAction: any;
  // Creating a new contract instance for the SwearIT contract using the provided address, ABI, and provider
  let landMarketplaceContract = new ethers.Contract(address, contractABI, provider);

  // Checking the value of the 'w' parameter
  if (w) {
    // If 'w' is true, connecting the signer to the SwearIT contract instance
    contractAction = landMarketplaceContract.connect(signer);
  } else {
    // If 'w' is false, using the SwearIT contract instance without a signer
    contractAction = landMarketplaceContract;
  }

  // Returning the SwearIT contract instance (with or without a signer)
  return contractAction;
};