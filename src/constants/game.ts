export const GAME_CONFIG = {
  TOTAL_HORSES: 20,
  HORSES_PER_RACE: 10,
  TOTAL_RACES: 6,
  GENERATION_DELAY: 1000, // milliseconds
} as const;

export const RACE_DISTANCES = [1200, 1400, 1600, 1800, 2000, 2200] as const;

export const RACE_ANIMATION = {
  DURATION: 3000, // 3 seconds
  UPDATE_INTERVAL: 100, // Update every 100ms
  SPEED_BASE: 20, // Base speed factor
  SPEED_VARIATION: {
    MIN: 0.3,
    MAX: 0.4,
  },
  RANDOM_FACTOR: {
    MIN: 0.4,
    MAX: 1.3,
  },
} as const;

export const HORSE_CONDITION = {
  MIN: 1,
  MAX: 100,
} as const;
