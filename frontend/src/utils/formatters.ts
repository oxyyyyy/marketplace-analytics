import { format } from "date-fns";
import type { MarketplaceEvent } from "../types/metrics";

// Format number with commas (1234567 -> 1,234,567)
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("en-US").format(num);
};

// Format currency (1234.56 -> $1,234.56)
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

// Format date for charts (2026-02-07T14:23:00 -> 14:23)
export const formatChartTime = (dateString: string): string => {
  return format(new Date(dateString), "HH:mm");
};

// Format date for events table (2026-02-07T14:23:00 -> Feb 7, 14:23)
export const formatEventTime = (dateString: string): string => {
  return format(new Date(dateString), "MMM d, HH:mm");
};

// Get relative time (5 minutes ago, 1 hour ago)
export const getRelativeTime = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);

  if (diffSec < 60) return `${diffSec}s ago`;
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  return formatEventTime(dateString);
};

// Get event display text
export const getEventDisplayText = (payload: MarketplaceEvent): string => {
  switch (payload.type) {
    case "product_viewed":
      return `User #${payload.userId} viewed ${payload.category} product`;
    case "add_to_cart":
      return `User #${payload.userId} added item ($${payload.price})`;
    case "purchase_completed":
      return `Order #${payload.orderId} completed - ${formatCurrency(
        payload.totalAmount ?? 0,
      )}`;
    case "order_cancelled":
      return `Order #${payload.orderId} cancelled: ${payload.reason}`;
    default:
      return "Unknown event";
  }
};

// Get event icon
export const getEventIcon = (type: string): string => {
  switch (type) {
    case "product_viewed":
      return "👁️";
    case "add_to_cart":
      return "🛒";
    case "purchase_completed":
      return "✅";
    case "order_cancelled":
      return "❌";
    default:
      return "📊";
  }
};

// Get event color
export const getEventColor = (type: string): string => {
  switch (type) {
    case "product_viewed":
      return "#3b82f6";
    case "add_to_cart":
      return "#f59e0b";
    case "purchase_completed":
      return "#10b981";
    case "order_cancelled":
      return "#ef4444";
    default:
      return "#6b7280";
  }
};
