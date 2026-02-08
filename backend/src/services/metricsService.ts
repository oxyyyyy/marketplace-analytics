import { pool } from "../config/database";
import { redisClient } from "../config/redis";

// Get current real-time metrics from Redis
export async function getCurrentMetrics() {
  const [usersOnline, viewsPerMinute, cartPerMinute, revenueToday] =
    await Promise.all([
      redisClient.get("users:online"),
      redisClient.get("views:last_minute"),
      redisClient.get("cart:last_minute"),
      redisClient.get("revenue:today"),
    ]);

  return {
    usersOnline: parseInt(usersOnline || "0"),
    viewsPerMinute: parseInt(viewsPerMinute || "0"),
    cartPerMinute: parseInt(cartPerMinute || "0"),
    revenueToday: parseFloat(revenueToday || "0"),
  };
}

// Get views history for chart (last 30 minutes)
export async function getViewsHistory() {
  const result = await pool.query(`
    SELECT 
      DATE_TRUNC('minute', created_at) AS minute,
      COUNT(*) AS count
    FROM events
    WHERE type = 'product_viewed'
      AND created_at >= NOW() - INTERVAL '30 minutes'
    GROUP BY minute
    ORDER BY minute ASC
  `);

  return result.rows.map((row) => ({
    timestamp: row.minute,
    count: parseInt(row.count),
  }));
}

// Get revenue history for chart (last 6 hours)
export async function getRevenueHistory() {
  const result = await pool.query(`
    SELECT 
      DATE_TRUNC('hour', created_at) AS hour,
      SUM((payload->>'totalAmount')::numeric) AS revenue
    FROM events
    WHERE type = 'purchase_completed'
      AND created_at >= NOW() - INTERVAL '6 hours'
    GROUP BY hour
    ORDER BY hour ASC
  `);

  return result.rows.map((row) => ({
    timestamp: row.hour,
    revenue: parseFloat(row.revenue || "0"),
  }));
}

// Get recent events stream (last 20 events)
export async function getRecentEvents() {
  const result = await pool.query(`
    SELECT id, type, payload, created_at
    FROM events
    ORDER BY created_at DESC
    LIMIT 20
  `);

  return result.rows.map((row) => ({
    id: row.id,
    type: row.type,
    payload: row.payload,
    timestamp: row.created_at,
  }));
}

// Get statistics by category
export async function getCategoryStats() {
  const result = await pool.query(`
    SELECT 
      payload->>'category' AS category,
      COUNT(*) AS views
    FROM events
    WHERE type = 'product_viewed'
      AND created_at >= NOW() - INTERVAL '24 hours'
    GROUP BY payload->>'category'
    ORDER BY views DESC
  `);

  return result.rows.map((row) => ({
    category: row.category,
    views: parseInt(row.views),
  }));
}
