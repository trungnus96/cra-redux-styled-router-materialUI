import express from "express";
import configureServer from "./configureServer";
import { SERVER_PORT_DEV } from './config';

const app = express();

// use helmet, compress, bodyParser.json
// set routes
configureServer(app);


app.listen(SERVER_PORT_DEV, () => {
  console.log("Dev server started at port", SERVER_PORT_DEV);
});