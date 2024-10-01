const dotenv = require('dotenv');
dotenv.config();
export class COMMON_CONFIG {

  static NETWORK_CONFIG = {
    RPC_URL: process.env.RPC || '',
    SERVER_PORT: process.env.PORT || 3000,
    FACTORY_CONTRACT_ADDRESS: process.env.FACTORY_CONTRACT_ADDRESS || '',
  }

  static SECURITY_CONFIG = {
    CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS || '',
   
    PRIVATE_KEY: process.env.PRIVATE_KEY || '',
  }
}

