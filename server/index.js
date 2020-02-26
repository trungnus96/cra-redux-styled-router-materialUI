import express from "express";
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

// port
const port = process.env.PORT || 3000;

const app = express();

if (isProd === false) {
  // only user cors middleware in development
  app.use(cors());
}

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hjs");

// logger
app.use(logger('dev'));

app.use(helmet());
app.use(compression());
app.use(bodyparser.json());

// static
app.use(express.static(path.join(__dirname, "../build"), { maxAge: 86400000 }));

// api routes
app.use("/api", api);


app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../build/index.html"));
});

app.listen(port, () => {
  console.log("Prod app started at port", port);
});
