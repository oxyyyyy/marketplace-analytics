import { pool } from "../config/database";
import * as fs from "fs";
import * as path from "path";

export async function runMigration() {
  try {
    console.log("🔄 Running database migration...");

    // Try multiple paths (local vs production)
    const possiblePaths = [
      path.join(__dirname, "schema.sql"),
      path.join(__dirname, "../db/schema.sql"),
      path.join(process.cwd(), "src/db/schema.sql"),
    ];

    let schema: string | null = null;

    for (const schemaPath of possiblePaths) {
      if (fs.existsSync(schemaPath)) {
        schema = fs.readFileSync(schemaPath, "utf-8");
        console.log(`📄 Found schema at: ${schemaPath}`);
        break;
      }
    }

    if (!schema) {
      throw new Error("schema.sql not found");
    }

    await pool.query(schema);
    console.log("✅ Database migration completed!");

    const result = await pool.query("SELECT COUNT(*) FROM products");
    console.log(`📦 Products in database: ${result.rows[0].count}`);
  } catch (error) {
    console.error("❌ Migration failed:", error);
    throw error;
  }
}

if (require.main === module) {
  runMigration()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
