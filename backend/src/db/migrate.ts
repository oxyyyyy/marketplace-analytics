import { pool } from "../config/database";
import * as fs from "fs";
import * as path from "path";

export async function runMigration() {
  try {
    console.log("🔄 Running database migration...");

    // Read SQL file
    const schemaPath = path.join(__dirname, "schema.sql");
    const schema = fs.readFileSync(schemaPath, "utf-8");

    // Execute SQL
    await pool.query(schema);

    console.log("✅ Database migration completed!");

    // Verify products were added
    const result = await pool.query("SELECT COUNT(*) FROM products");
    console.log(`📦 Products in database: ${result.rows[0].count}`);
  } catch (error) {
    console.error("❌ Migration failed:", error);
    throw error;
  }
}

// Run directly if called as main module
if (require.main === module) {
  runMigration()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("Migration error:", error);
      process.exit(1);
    });
}
