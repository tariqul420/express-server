import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const config = {
  port: Number(process.env.PORT) || 3000,
  database_url: process.env.DATABASE_URL,
};

export default config;
