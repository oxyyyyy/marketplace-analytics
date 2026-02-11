// Event types
export type EventType =
  | "product_viewed"
  | "add_to_cart"
  | "purchase_completed"
  | "order_cancelled";

// Base event interface
export interface MarketplaceEvent {
  type: EventType;
  userId?: number;
  category?: string;
  price?: number;
  orderId?: number;
  totalAmount?: number;
  reason?: string;
}

// Event with metadata from API
export interface EventRecord {
  id: number;
  type: EventType;
  payload: MarketplaceEvent;
  timestamp: string;
}

// Summary metrics
export interface SummaryMetrics {
  usersOnline: number;
  viewsPerMinute: number;
  cartPerMinute: number;
  revenueToday: number;
}

// Chart data point
export interface ChartDataPoint {
  timestamp: string;
  count?: number;
  revenue?: number;
}

// Category stats
export interface CategoryStats {
  category: string;
  views: number;
}
