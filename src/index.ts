import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import { drizzle } from "drizzle-orm/node-postgres";
import {config } from './config/index'

const app = express();

app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());

const db = drizzle(config.database.url);


export default app;
