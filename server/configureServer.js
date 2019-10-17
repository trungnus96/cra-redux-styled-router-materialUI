import path from "path";
import compression from "compression";
import helmet from "helmet";
import bodyparser from "body-parser";
import cors from "cors";

import logger from "morgan";

// config
import { isProd } from "./config";

// api
import api from "./api";

function configureServer(server) {
  if (isProd === false) {
    // only user cors middleware in development
    server.use(cors());
  }

  // view engine setup
  server.set("views", path.join(__dirname, "views"));
  server.set("view engine", "hjs");

  // logger
  server.use(logger('dev'));

  server.use(helmet());
  server.use(compression());
  server.use(bodyparser.json());

  // api routes
  server.use("/api", api);
}

module.exports = configureServer;
