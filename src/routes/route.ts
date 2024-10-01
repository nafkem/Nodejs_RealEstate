
import { Application, Request, Response } from "express";
import { FactoryService } from "../controller/factory/factory_service";
import { ContractService } from "../controller/contract/contract_service";



export class Controller {


  private factoryService: FactoryService;
  private contractService: ContractService


  constructor(private app: Application
  ) {



    this.factoryService = new FactoryService();
    this.contractService=new ContractService()
    this.factoryRoutes()
    this.contractRoutes()
    this.livenessRoutes()
  }


  public contractRoutes() {
    //PRODUCT ROUTES
    this.app.route("/api/contract/create_product/:contractAddress").post(this.contractService.createProduct);
    this.app.route("/api/contract/get_product_by_id/:contractAddress").post(this.contractService.getProductById);
    this.app.route("/api/contract/get_all_products/:contractAddress").get(this.contractService.getAllProducts);
    //MILESTONE ROUTES
    this.app.route("/api/contract/create_product_milestone/:contractAddress").post(this.contractService.createProductMilestone);
    this.app.route("/api/contract/get_product_milestone_by_id/:contractAddress").post(this.contractService.getProductMilestoneById);
    this.app.route("/api/contract/get_all_product_milestone/:contractAddress").post(this.contractService.getAllProductMilestones);
    this.app.route("/api/contract/update_product_milestone_by_id/:contractAddress").post(this.contractService.updateAProductMilestone);
    //PROOF POINT ROUTES
    this.app.route("/api/contract/create_product_milestone_proof/:contractAddress").post(this.contractService.createProductMilestoneProof);
    this.app.route("/api/contract/validate_product_milestone_proof/:contractAddress").post(this.contractService.vaidateAProductMilestoneProof);
    this.app.route("/api/contract/get_one_milestone_proof_by_id/:contractAddress").post(this.contractService.getProductMilestoneProofById);
    this.app.route("/api/contract/get_all_milestone_proof/:contractAddress").post(this.contractService.getAllMilestonesProof);
  }

  public livenessRoutes() {
    this.app.route("/api").get(this.factoryService.Liveness);
    this.app.route("/").get(this.factoryService.Liveness);
    this.app.route("/api/").get(this.factoryService.Liveness);
    this.app.route("/api/liveness").get(this.factoryService.Liveness);
  }


  public factoryRoutes() {
  this.app.route("/api/factory/name").get(this.factoryService.FactoryContractName);
  this.app.route("/api/factory/get_contract_by_name").post(this.factoryService.ContractByName);
  this.app.route("/api/factory/get_all_contracts").get(this.factoryService.GetAllContracts);
  this.app.route("/api/factory/deploy").post(this.factoryService.FactoryCreateContract);
  }


}