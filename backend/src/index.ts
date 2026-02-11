import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import { pool } from "./config/database";
import { connectRedis } from "./config/redis";
import { runMigration } from "./db/migrate";
import { initRedisCounters } from "./db/initRedis";
import { startEventSimulator } from "./services/eventSimulator";
import {
  startCounterReset,
  startDailyReset,
  startOnlineUsersSimulator,
} from "./services/counterReset";
import metricsRouter from "./routes/metrics";

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/metrics", metricsRouter);

/**
 * Health check endpoint
 * Useful for Railway and for you to verify the server is running.
 */
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

// WebSocket connection
io.on("connection", (socket) => {
  console.log("🔌 Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔌 Client disconnected:", socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    await connectRedis();
    await pool.query("SELECT NOW()");
    console.log("✅ PostgreSQL connected");
    await runMigration();
    await initRedisCounters();

    startEventSimulator(io);
    startCounterReset();
    startDailyReset();
    startOnlineUsersSimulator();

    httpServer.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`🔌 WebSocket ready on ws://localhost:${PORT}`);
      console.log(`📊 API available at http://localhost:${PORT}/api/metrics`);
      console.log(
        `📚 API Docs available at http://localhost:${PORT}/api-docs`,
      );
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
