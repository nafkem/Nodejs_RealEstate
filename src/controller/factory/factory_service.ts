import { Request, Response } from 'express'; // Importing the Request and Response interfaces from Express
import { getName } from './name'; // Importing the getName function from the './name' module
import { createContract } from './create_contract'; // Importing the createContract function from the './create_contract' module
import { getContractByName } from './get_contract_by_name';
import { getAllContracts } from './get_all_contracts';

export class FactoryService {
  // Defining a class named FactoryService

  public FactoryContractName = async (req: Request, res: Response) => {
    // Defining an asynchronous method named FactoryContractName
    // This method accepts req and res parameters, which are instances of Request and Response from Express

    try {
      //this checks if the authKey is present
      const result = await getName(); // Calling the getName function and awaiting its result
      res.send(result ); // Sending a response with a status code of 200 and the result data
    } catch (error) {
      res.send(error); // If an error occurs, sending the error as the response
    }
  };



  public FactoryCreateContract = async (req: Request, res: Response) => {
    // Defining an asynchronous method named FactoryCreateContract
    // This method also accepts req and res parameters, which are instances of Request and Response from Express

    try {
      //this checks if the authKey is present
      let contractName = req.body.contractName; // Getting the contractName from the request body
      const result = await createContract(contractName); // Calling the createContract function with the contractName and awaiting its result
      res.send( result ); // Sending a response with a status code of 200 and the result data
    } catch (error) {
      res.send(error); // If an error occurs, sending the error as the response
    }
  };

  public Liveness = async (req: Request, res: Response) => {
    // Defining an asynchronous method named Liveness
    // This method also accepts req and res parameters, which are instances of Request and Response from Express

    try {
      //this checks if the authKey is present
      const result = 'API IS LIVE'; // Setting the result to a string 'API IS LIVE'
      res.send({ statusCode: 200, data: result }); // Sending a response with a status code of 200 and the result data
    } catch (error) {
      res.send(error); // If an error occurs, sending the error as the response
    }
  };


  public ContractByName = async (req: Request, res: Response) => {


    try {
      let contractName = req.body.contractName; 
      const result = await getContractByName(contractName)
      res.send( result ); 
    } catch (error) {
      res.send({ statusCode: 500, error: error }); 
    }
  };


  public GetAllContracts= async (req: Request, res: Response) => {


    try {
      
      const result = await getAllContracts()
      res.send(result); 
    } catch (error) {
      res.send(error); 
    }
  };
}