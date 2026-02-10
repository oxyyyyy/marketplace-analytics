import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import type { MarketplaceEvent } from "../types/metrics";

const SOCKET_URL = import.meta.env.VITE_WS_URL || "http://localhost:3001";

// Global socket instance (outside component)
let globalSocket: Socket | null = null;

export const useWebSocket = (onEvent: (event: MarketplaceEvent) => void) => {
  const onEventRef = useRef(onEvent);

  // Update ref when callback changes
  useEffect(() => {
    onEventRef.current = onEvent;
  }, [onEvent]);

  useEffect(() => {
    // Create socket only once globally
    if (!globalSocket) {
      console.log("🔌 Creating WebSocket connection...");

      globalSocket = io(SOCKET_URL, {
        transports: ["websocket"],
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 5,
      });

      globalSocket.on("connect", () => {
        console.log("✅ WebSocket connected:", globalSocket?.id);
      });

      globalSocket.on("disconnect", () => {
        console.log("❌ WebSocket disconnected");
      });

      globalSocket.on("connect_error", (error) => {
        console.error("WebSocket connection error:", error);
      });
    }

    // Subscribe to events
    const eventHandler = (event: MarketplaceEvent) => {
      onEventRef.current(event);
    };

    globalSocket.on("event", eventHandler);

    // Cleanup: only remove listener, don't disconnect
    return () => {
      if (globalSocket) {
        globalSocket.off("event", eventHandler);
      }
    };
  }, []); // Empty deps - run once

  return globalSocket;
};

// Cleanup function (optional, for app unmount)
export const disconnectSocket = () => {
  if (globalSocket) {
    globalSocket.disconnect();
    globalSocket = null;
  }
};
