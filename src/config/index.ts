import dotenv from "dotenv";

dotenv.config();

//Use zod to validate schema
export const config = {
  port: process.env.PORT || "3000",
  database: {
    url: process.env.DATABASE_URL || "",
  },
};
