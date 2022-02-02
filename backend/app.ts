import express from "express";
import http from "http";
import bodyParser from "body-parser";
import detectPort from "detect-port";
import morgan from "morgan";
import cors from "cors";

import indexRouter from './routes/index';

// server setup
let port: any;
async function configServer() {
  port = 8080 || (await detectPort(8080));
}
configServer();

// express setup
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev')); // log request

// express routers
app.use('/', indexRouter);

// start
app.listen(port, () =>
  console.log(`SERVER IS RUNNING ON ${port}`),
);

export default app
