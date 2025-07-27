/**
 * Fisher-Yates shuffle algorithm for proper randomization
 * More reliable than Array.sort(() => Math.random() - 0.5)
 */
export function shuffleArray<T>(array: readonly T[]): T[] {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

/**
 * Generate a cryptographically secure random number between min and max (inclusive)
 */
export function secureRandom(min: number, max: number): number {
  const range = max - min + 1;
  const bytesNeeded = Math.ceil(Math.log2(range) / 8);
  const maxValid = Math.floor(256 ** bytesNeeded / range) * range - 1;

  const randomBytes = new Uint8Array(bytesNeeded);

  let randomValue;
  do {
    crypto.getRandomValues(randomBytes);
    randomValue = randomBytes.reduce((acc, byte, index) => {
      return acc + byte * 256 ** index;
    }, 0);
  } while (randomValue > maxValid);

  return min + (randomValue % range);
}

/**
 * Simple but reliable random number generator for non-crypto use
 */
export function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
