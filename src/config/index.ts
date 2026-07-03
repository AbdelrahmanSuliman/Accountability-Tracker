import dotenv from "dotenv";

dotenv.config();

//TODO:Use zod to validate schema
export const config = {
  port: process.env.PORT || "3000",
  database: {
    url: process.env.DATABASE_URL || "",
  },
  saltRounds: process.env.SALT_ROUNDS || "10",
  jwt: {
    expiresIn: process.env.JWT_EXPIRATION_TIME || "1h",
    secretKey: process.env.JWT_SECRET as any
  }
};

export default config