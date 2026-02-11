import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

// Railway provides REDIS_URL, fallback to individual vars
const redisClient = process.env.REDIS_URL
  ? createClient({
      url: process.env.REDIS_URL,
    })
  : createClient({
      socket: {
        host: process.env.REDIS_HOST || "localhost",
        port: parseInt(process.env.REDIS_PORT || "6379"),
      },
      password: process.env.REDIS_PASSWORD || undefined,
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

export { redisClient };
