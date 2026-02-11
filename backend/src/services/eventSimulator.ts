import { Server } from "socket.io";
import { randomDelay } from "../utils/random";
import {
  generateProductView,
  generateAddToCart,
  generatePurchase,
  generateCancellation,
} from "./eventGenerator";
import { handleEvent } from "./eventHandler";

// Event generators with their weights (probability)
const EVENT_GENERATORS = [
  { generator: generateProductView, weight: 50 }, // 50% - most common
  { generator: generateAddToCart, weight: 30 }, // 30%
  { generator: generatePurchase, weight: 15 }, // 15%
  { generator: generateCancellation, weight: 5 }, // 5% - least common
];

// Pick random event generator based on weights
function pickEventGenerator() {
  const totalWeight = EVENT_GENERATORS.reduce((sum, e) => sum + e.weight, 0);
  let random = Math.random() * totalWeight;

  for (const item of EVENT_GENERATORS) {
    random -= item.weight;
    if (random <= 0) {
      return item.generator;
    }
  }

  return EVENT_GENERATORS[0].generator;
}

// Main simulator loop
export function startEventSimulator(io: Server) {
  console.log("🎲 Event simulator started");

  async function simulateEvent() {
    try {
      // 1. Pick random event generator
      const generator = pickEventGenerator();

      // 2. Generate event
      const event = await generator();

      // 3. Handle event (save to DB, update Redis)
      await handleEvent(event);

      // 4. Broadcast to all connected clients
      io.emit("event", event);

      // Log for debugging
      console.log(`📊 Event: ${event.type}`);
    } catch (error) {
      console.error("Error simulating event:", error);
    }

    // 5. Schedule next event with random delay
    const delay = randomDelay();
    setTimeout(simulateEvent, delay);
  }

  // Start the loop
  simulateEvent();
}
