import { Router } from "express";
import {
  getCurrentMetrics,
  getViewsHistory,
  getRevenueHistory,
  getRecentEvents,
  getCategoryStats,
} from "../services/metricsService";

const router = Router();

/**
 * @swagger
 * /api/metrics/summary:
 *   get:
 *     summary: Get current real-time metrics
 *     description: Returns current online users, views per minute, cart additions, and today's revenue from Redis cache
 *     tags: [Metrics]
 *     responses:
 *       200:
 *         description: Current metrics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 usersOnline:
 *                   type: integer
 *                   example: 142
 *                   description: Number of users currently online
 *                 viewsPerMinute:
 *                   type: integer
 *                   example: 87
 *                   description: Product views in the last minute
 *                 cartPerMinute:
 *                   type: integer
 *                   example: 23
 *                   description: Cart additions in the last minute
 *                 revenueToday:
 *                   type: number
 *                   format: float
 *                   example: 15234.50
 *                   description: Total revenue for today in USD
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to get metrics
 */
router.get("/summary", async (req, res) => {
  try {
    const metrics = await getCurrentMetrics();
    res.json(metrics);
  } catch (error) {
    console.error("Error getting summary metrics:", error);
    res.status(500).json({ error: "Failed to get metrics" });
  }
});

/**
 * @swagger
 * /api/metrics/views-history:
 *   get:
 *     summary: Get product views history
 *     description: Returns minute-by-minute product view counts for the last 30 minutes
 *     tags: [Metrics]
 *     responses:
 *       200:
 *         description: Views history data for charting
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                     example: "2026-02-07T14:23:00.000Z"
 *                     description: Minute timestamp (rounded down)
 *                   count:
 *                     type: integer
 *                     example: 23
 *                     description: Number of product views in this minute
 *       500:
 *         description: Server error
 */
router.get("/views-history", async (req, res) => {
  try {
    const history = await getViewsHistory();
    res.json(history);
  } catch (error) {
    console.error("Error getting views history:", error);
    res.status(500).json({ error: "Failed to get views history" });
  }
});

/**
 * @swagger
 * /api/metrics/revenue-history:
 *   get:
 *     summary: Get revenue history
 *     description: Returns hourly revenue data for the last 6 hours
 *     tags: [Metrics]
 *     responses:
 *       200:
 *         description: Revenue history data for charting
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                     example: "2026-02-07T09:00:00.000Z"
 *                     description: Hour timestamp
 *                   revenue:
 *                     type: number
 *                     format: float
 *                     example: 892.34
 *                     description: Total revenue for this hour in USD
 *       500:
 *         description: Server error
 */
router.get("/revenue-history", async (req, res) => {
  try {
    const history = await getRevenueHistory();
    res.json(history);
  } catch (error) {
    console.error("Error getting revenue history:", error);
    res.status(500).json({ error: "Failed to get revenue history" });
  }
});

/**
 * @swagger
 * /api/metrics/recent-events:
 *   get:
 *     summary: Get recent events stream
 *     description: Returns the last 20 events from the marketplace (product views, cart additions, purchases, cancellations)
 *     tags: [Metrics]
 *     responses:
 *       200:
 *         description: Recent events list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 234
 *                     description: Event ID
 *                   type:
 *                     type: string
 *                     enum: [product_viewed, add_to_cart, purchase_completed, order_cancelled]
 *                     example: product_viewed
 *                     description: Type of event
 *                   payload:
 *                     type: object
 *                     description: Event-specific data (varies by type)
 *                     example:
 *                       type: product_viewed
 *                       userId: 456
 *                       productId: 3
 *                       category: electronics
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                     example: "2026-02-07T14:25:30.000Z"
 *                     description: When the event occurred
 *       500:
 *         description: Server error
 */
router.get("/recent-events", async (req, res) => {
  try {
    const events = await getRecentEvents();
    res.json(events);
  } catch (error) {
    console.error("Error getting recent events:", error);
    res.status(500).json({ error: "Failed to get recent events" });
  }
});

/**
 * @swagger
 * /api/metrics/category-stats:
 *   get:
 *     summary: Get category statistics
 *     description: Returns view counts by product category for the last 24 hours, sorted by popularity
 *     tags: [Metrics]
 *     responses:
 *       200:
 *         description: Category statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   category:
 *                     type: string
 *                     example: electronics
 *                     description: Product category name
 *                   views:
 *                     type: integer
 *                     example: 342
 *                     description: Number of views for this category
 *       500:
 *         description: Server error
 */
router.get("/category-stats", async (req, res) => {
  try {
    const stats = await getCategoryStats();
    res.json(stats);
  } catch (error) {
    console.error("Error getting category stats:", error);
    res.status(500).json({ error: "Failed to get category stats" });
  }
});

export default router;
