// Importing the server instance from the 'app' file
import server from './app';
import { COMMON_CONFIG } from './config/common';


// Listening for incoming connections on the specified port.
// If process.env.PORT is defined, it will use that port, otherwise, it will default to CONSTANTS.DATA.PORT
server.listen(process.env.PORT || 3000, () => console.log(`Listening on localhost:${COMMON_CONFIG.NETWORK_CONFIG.SERVER_PORT}`));
