import { pool } from "../config/database";
import { randomInt, randomItem } from "../utils/random";
import { MarketplaceEvent } from "../types/events";

const CATEGORIES = ["electronics", "shoes", "clothing", "accessories"];
const CANCEL_REASONS = [
  "Changed mind",
  "Found better price",
  "Item not needed",
  "Ordered by mistake",
];

// Get random product from database
async function getRandomProduct() {
  const result = await pool.query(
    "SELECT id, category, price FROM products ORDER BY RANDOM() LIMIT 1",
  );
  return result.rows[0];
}

// Generate product_viewed event
export async function generateProductView(): Promise<MarketplaceEvent> {
  const product = await getRandomProduct();

  return {
    type: "product_viewed",
    userId: randomInt(1, 1000),
    productId: product.id,
    category: product.category,
  };
}

// Generate add_to_cart event
export async function generateAddToCart(): Promise<MarketplaceEvent> {
  const product = await getRandomProduct();

  return {
    type: "add_to_cart",
    userId: randomInt(1, 1000),
    productId: product.id,
    price: parseFloat(product.price),
  };
}

// Generate purchase_completed event
export async function generatePurchase(): Promise<MarketplaceEvent> {
  const itemsCount = randomInt(1, 5);
  const totalAmount = parseFloat((Math.random() * 500 + 50).toFixed(2));

  return {
    type: "purchase_completed",
    orderId: randomInt(1000, 9999),
    totalAmount,
    itemsCount,
  };
}

// Generate order_cancelled event
export async function generateCancellation(): Promise<MarketplaceEvent> {
  return {
    type: "order_cancelled",
    orderId: randomInt(1000, 9999),
    reason: randomItem(CANCEL_REASONS),
  };
}
