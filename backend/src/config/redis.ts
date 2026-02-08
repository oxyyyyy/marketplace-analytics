import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

export const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || "6379"),
  },
});

redisClient.on("connect", () => {
  console.log("✅ Connected to Redis");
});

redisClient.on("error", (err) => {
  console.error("❌ Redis connection error:", err);
});

export const connectRedis = async () => {
  await redisClient.connect();
};
