import "dotenv/config";
import express from "express";
import helmet from "helmet";
import errorHandler from "./middleware/error.handler";
import limiter from "./middleware/limiter.middleware";
import authRouter from "./routes/auth.routes";
import addictionRouter from "./routes/addiction.routes";
import journalRouter from "./routes/journal.routes";
import invitationRouter from "./routes/invitation.routes";

const app = express();

// Global Middleware
app.use(helmet());
app.use(limiter);
app.use(express.json());

// Router Mounting
const router = express.Router();
router.use("/auth", authRouter);
router.use("/addictions", addictionRouter);
router.use("/journals", journalRouter);
router.use("/invitations", invitationRouter);
app.use("/api/v1", router);

// Error Handler
app.use(errorHandler);

export default app;
