import compression from "compression";
import helmet from "helmet";
import bodyparser from "body-parser";
import cors from "cors";
import { isProd } from "./config";

function configureServer(server){
  if(isProd === false){
    // only user cors middleware in development
    server.use(cors());
  }

  server.use(helmet());
  server.use(compression());
  server.use(bodyparser.json());
}

module.exports = configureServer;