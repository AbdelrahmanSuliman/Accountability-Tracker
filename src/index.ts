import express from "express";
import helmet from "helmet";
import config from "./config/index";

const app = express();

app.use(helmet());

app.use(express.json());

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`)
})
export default app;
