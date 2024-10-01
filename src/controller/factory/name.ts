import { factoryContract } from "../../utils/connection";

/**
 * This function retrieves the name of the contract from the factoryContract instance.
 * @returns {Promise<Object>} An object containing either the contract name or an error.
 */
export const getName = async () => {
  try {
    // Call the `name` method on the factoryContract instance to retrieve the contract name
    let name = await factoryContract.name();

    // If the name is retrieved successfully, return an object with statusCode 200 and the contract name
    return{ statusCode: 200, data: name};
  } catch (error:any) {
    // Return an object with statusCode 500 and the error
    return{ statusCode: 400, error: error.reason};
  }
};