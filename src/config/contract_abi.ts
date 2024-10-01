const ProductInfo = "(uint256 productId, string productName,bytes32 createdAt,uint256 organizationId,string organizationName,string productUrl,uint256 milestoneCount,uint256 proofCount, uint256 validatedProofsCount)";
const MilestoneInfo = "(uint256 productId,uint256 milestoneId,string milestoneName,bytes32 createdAt,uint256 userId,bool completed,uint256 proofCount)";
const ProofInfo = "(uint256 proofId,uint256 milestoneId,string proofName,uint256 organizationId,string evidences,string conditions,bytes32 createdAt,uint256 userId,uint256 validationsCount)"
const ProofValidation = "(uint256 proofId,uint256 milestoneId,uint256 productId,string status,uint256 verifierId,string verifierName,bytes32 verifiedAt, uint256 userId)"

export const contractABI = [

  //Products
  "function createProduct(uint256 _productId,string _productName,bytes32 _createdAt,uint256 _organizationId,string _organizationName,string  _productUrl)",
  `function getProductById(uint256 _productId) public view returns(${ProductInfo})`,
  `function getAllProducts() public view returns(${ProductInfo}[])`,

  //Milestones
  "function createMilestone(uint256 _productId,uint256 _milestoneId,string _milestoneName, bytes32 _createdAt, uint256 _userId)",
  `function getMilestoneById(uint256 _milestoneId) public view returns(${MilestoneInfo})`,
  "function setMilestoneCompleted(uint256 _milestoneId)",
  `function getProductMilestones(uint256 _productId) public view returns(${MilestoneInfo}[])`,

  //Proofs
  "function createProof(uint256 _proofId,uint256 _milestoneId,string _proofName,uint256 _organizationId, string _evidences, string _conditions,bytes32 _createdAt,uint256 _userId)",
  "function validateProof(uint256 _proofId,uint256 _productId,string _status, uint256 _verifierId,string _verifierName,bytes32 _verifiedAt,uint256 _userId)",
  `function getMilestoneProofById(uint256 _proofId) public view returns(${ProofInfo})`,
  `function getAllMilestoneProofsById(uint256 _milestoneId) public view returns(${ProofInfo}[])`,
  `function getProofValidationsByProofId(uint256 _proofId) public view returns (${ProofValidation}[])`,

  //EVENTS
  "event ProductCreated(uint indexed productId,string productName,bytes32 createdAt,uint organizationId,string organizationName,string productUrl,uint256 milestoneCount,uint256 proofCount,uint256 validatedProofsCount)",
  "event MilestoneCreated(uint indexed productId,uint256 milestoneId,string milestoneName,bytes32 createdAt,uint userId, bool completed, uint256 proofCount)",
  "event ProofCreated(uint256 indexed proofId,uint256 milestoneId,string proofName,uint256 organizationId,string evidences,string conditions,bytes32 createdAt,uint256 userId)",
  "event ProofValidated(uint256 indexed proofId,uint256 milestoneId,uint256 productId,string status,uint256 verifierId,string verifierName,bytes32 verifiedAt,uint256 userId)"
];

