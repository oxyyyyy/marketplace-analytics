// Generate random integer between min and max (inclusive)
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Pick random item from array
export function randomItem<T>(array: T[]): T {
  return array[randomInt(0, array.length - 1)];
}

// Generate random delay in milliseconds (0.5-2 seconds)
export function randomDelay(): number {
  return randomInt(500, 2000);
}
