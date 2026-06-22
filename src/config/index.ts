import dotenv from "dotenv";

dotenv.config();

//TODO:Use zod to validate schema
export const config = {
  port: process.env.PORT || "3000",
  database: {
    url: process.env.DATABASE_URL || "",
  },
  saltRounds: process.env.SALT_ROUNDS || "10"
};

export default config