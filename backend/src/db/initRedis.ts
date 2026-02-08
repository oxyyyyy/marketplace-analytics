import { redisClient } from "../config/redis";

export async function initRedisCounters() {
  try {
    console.log("🔄 Initializing Redis counters...");

    // Set initial values
    await redisClient.set("users:online", "0");
    await redisClient.set("views:last_minute", "0");
    await redisClient.set("cart:last_minute", "0");
    await redisClient.set("revenue:today", "0");

    console.log("✅ Redis counters initialized!");

    // Verify
    const online = await redisClient.get("users:online");
    console.log(`👥 Users online: ${online}`);
  } catch (error) {
    console.error("❌ Redis initialization failed:", error);
    throw error;
  }
}
