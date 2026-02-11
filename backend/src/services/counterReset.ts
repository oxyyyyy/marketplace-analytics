import { redisClient } from "../config/redis";

// Reset minute counters every minute
export function startCounterReset() {
  setInterval(async () => {
    try {
      // Reset views and cart counters
      await redisClient.set("views:last_minute", "0");
      await redisClient.set("cart:last_minute", "0");

      console.log("🔄 Reset minute counters");
    } catch (error) {
      console.error("Error resetting counters:", error);
    }
  }, 60000); // Every 60 seconds
}

// Reset daily revenue at midnight
export function startDailyReset() {
  // Calculate milliseconds until next midnight
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const msUntilMidnight = tomorrow.getTime() - now.getTime();

  // Schedule first reset at midnight
  setTimeout(async () => {
    await redisClient.set("revenue:today", "0");
    console.log("🔄 Reset daily revenue");

    // Then repeat every 24 hours
    setInterval(
      async () => {
        await redisClient.set("revenue:today", "0");
        console.log("🔄 Reset daily revenue");
      },
      24 * 60 * 60 * 1000,
    ); // 24 hours
  }, msUntilMidnight);
}

// Update online users count (simulate)
export function startOnlineUsersSimulator() {
  setInterval(async () => {
    // Simulate online users (random between 50-200)
    const onlineUsers = Math.floor(Math.random() * 150) + 50;
    await redisClient.set("users:online", onlineUsers.toString());
  }, 5000); // Every 5 seconds
}
