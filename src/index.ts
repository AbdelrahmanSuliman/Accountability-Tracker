import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";

dotenv.config();

const app = express();

app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());


export default app;
