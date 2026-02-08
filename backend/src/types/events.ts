export type EventType =
  | "product_viewed"
  | "add_to_cart"
  | "purchase_completed"
  | "order_cancelled";

export interface ProductViewedEvent {
  type: "product_viewed";
  userId: number;
  productId: number;
  category: string;
}

export interface AddToCartEvent {
  type: "add_to_cart";
  userId: number;
  productId: number;
  price: number;
}

export interface PurchaseCompletedEvent {
  type: "purchase_completed";
  orderId: number;
  totalAmount: number;
  itemsCount: number;
}

export interface OrderCancelledEvent {
  type: "order_cancelled";
  orderId: number;
  reason: string;
}

export type MarketplaceEvent =
  | ProductViewedEvent
  | AddToCartEvent
  | PurchaseCompletedEvent
  | OrderCancelledEvent;

export interface EventRecord {
  id: number;
  type: EventType;
  payload: MarketplaceEvent;
  created_at: Date;
}
