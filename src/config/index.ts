import ConfigSchema from "../schema/config";


export const config = {
  port: process.env.PORT,
  database: {
    url: process.env.DATABASE_URL,
  },
  saltRounds: process.env.SALT_ROUNDS,
  jwt: {
    expiresIn: process.env.JWT_EXPIRATION_TIME,
    secretKey: process.env.JWT_SECRET,
  },
};

ConfigSchema.parse(config);

export default config;
