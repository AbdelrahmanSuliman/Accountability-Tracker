import express from "express";
import helmet from "helmet";
import config from "./config/index";
import logger from "./util/logger";

const app = express();

app.use(helmet());

app.use(express.json());

app.listen(config.port, () => {
    logger.info(`Server is running on port ${config.port}`)
})
export default app;
