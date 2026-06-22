import { drizzle } from "drizzle-orm/node-postgres";
import { config } from "../config/index";

const db = drizzle(config.database.url);

export default db