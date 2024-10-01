const ContractInfo = "(string name, address contractAddress)";

export const factoryABI =[
  `function getAllSwearITContracts() public view returns (${ContractInfo}[])`,
  "function getSwearITContractByName(string) public view returns (address)",
  "function createSwearITContract(string)",
  "function name() external view returns(string)",
  "event ContractCreated(string name, address contractAddress)"
];

