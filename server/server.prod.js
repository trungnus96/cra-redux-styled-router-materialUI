import express from "express";
import path from 'path';
import configureServer from "./configureServer";
import { SERVER_PORT_PROD } from "./config";

const app = express();

// use helmet, compress, bodyParser.json
configureServer(app);

app.use(express.static(path.join(__dirname, '../build'), { maxAge: 86400000 }));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build/index.html'));
});

app.listen(SERVER_PORT_PROD, () => {
  console.log("Prod server started at port", SERVER_PORT_PROD);
});