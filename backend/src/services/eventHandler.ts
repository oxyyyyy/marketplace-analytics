import { pool } from "../config/database";
import { redisClient } from "../config/redis";
import { MarketplaceEvent } from "../types/events";

// Save event to PostgreSQL
async function saveEventToDatabase(event: MarketplaceEvent) {
  await pool.query(
    "INSERT INTO events (type, payload, created_at) VALUES ($1, $2, NOW())",
    [event.type, JSON.stringify(event)],
  );
}

// Update Redis counters based on event type
async function updateRedisCounters(event: MarketplaceEvent) {
  switch (event.type) {
    case "product_viewed":
      // Increment views counter
      await redisClient.incr("views:last_minute");
      break;

    case "add_to_cart":
      // Increment cart counter
      await redisClient.incr("cart:last_minute");
      break;

    case "purchase_completed": {
      // Add to today's revenue
      const amount = event.totalAmount.toString();
      await redisClient.incrByFloat("revenue:today", parseFloat(amount));

      // Save order to database
      await pool.query(
        "INSERT INTO orders (total_amount, items_count, status) VALUES ($1, $2, $3)",
        [event.totalAmount, event.itemsCount, "completed"],
      );
      break;
    }

    case "order_cancelled":
      // Update order status
      await pool.query("UPDATE orders SET status = $1 WHERE id = $2", [
        "cancelled",
        event.orderId,
      ]);
      break;
  }
}

// Main handler: save + update counters
export async function handleEvent(event: MarketplaceEvent) {
  try {
    // Save to PostgreSQL (history)
    await saveEventToDatabase(event);

    // Update Redis counters (real-time metrics)
    await updateRedisCounters(event);

    return event;
  } catch (error) {
    console.error("Error handling event:", error);
    throw error;
  }
}
