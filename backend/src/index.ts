import "dotenv/config";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import config from "./config/index";
import logger from "./util/logger";
import errorHandler from "./middleware/error.handler";
import authRouter from "./routes/auth.routes";
import addictionRouter from "./routes/addiction.routes";
import journalRouter from "./routes/journal.routes";
import invitationRouter from "./routes/invitation.routes";
import limiter from "./middleware/limiter.middleware";

const app = express();
dotenv.config();
//Global Middleware
app.use(helmet());
app.use(limiter);
app.use(express.json());

//Router Mounting
const router = express.Router();
router.use("/auth", authRouter);
router.use("/addiction", addictionRouter);
router.use("/journal", journalRouter);
router.use("/invitation", invitationRouter);
app.use("/api/v1", router);

app.use(errorHandler);

app.listen(config.port, () => {
  logger.info(`Server is running on port ${config.port}`);
});

export default app;
