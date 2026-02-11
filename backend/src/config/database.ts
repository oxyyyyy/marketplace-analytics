import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

// Railway provides DATABASE_URL, fallback to individual vars
const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl:
        process.env.NODE_ENV === "production"
          ? { rejectUnauthorized: false }
          : false,
    })
  : new Pool({
      host: process.env.DB_HOST || "localhost",
      port: parseInt(process.env.DB_PORT || "5432"),
      user: process.env.DB_USER || "marketplace",
      password: process.env.DB_PASSWORD || "dev_password",
      database: process.env.DB_NAME || "marketplace_dashboard",
    });

pool.on("connect", () => {
  console.log("✅ Connected to PostgreSQL");
});

pool.on("error", (err) => {
  console.error("❌ PostgreSQL connection error:", err);
  process.exit(-1);
});

export { pool };
