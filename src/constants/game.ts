export const GAME_CONFIG = {
  TOTAL_HORSES: 20,
  HORSES_PER_RACE: 10,
  TOTAL_RACES: 6,
  GENERATION_DELAY: 1000, // milliseconds
} as const;

export const RACE_DISTANCES = [1200, 1400, 1600, 1800, 2000, 2200] as const;

export const RACE_ANIMATION = {
  DURATION: 5000, // 5 seconds
  UPDATE_INTERVAL: 50, // Update every 50ms
  SPEED_BASE: 90, // Base speed factor
  SPEED_VARIATION: {
    MIN: 0.3,
    MAX: 0.4,
  },
  RANDOM_FACTOR: {
    MIN: 0.8,
    MAX: 1.2,
  },
} as const;

export const HORSE_CONDITION = {
  MIN: 1,
  MAX: 100,
} as const;
