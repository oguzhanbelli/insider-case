import { defineStore } from "pinia";
import type { Race, GameState, RaceResult } from "@/types/horse-racing";
import {
  HORSE_NAMES,
  HORSE_COLORS,
  GAME_CONFIG,
  RACE_DISTANCES,
  RACE_ANIMATION,
  HORSE_CONDITION,
} from "@/constants";
import { RaceStatus, ScheduleStatus } from "@/types/enums";

export const useHorseRacingStore = defineStore("horseRacing", {
  state: (): GameState => ({
    horses: [],
    schedule: null,
    isGenerating: false,
    isRacing: false,
    isPaused: false,
  }),

  getters: {
    currentRace: (state): Race | null => {
      if (!state.schedule) return null;
      return state.schedule.races[state.schedule.currentRaceIndex] || null;
    },

    completedRaces: (state): Race[] => {
      if (!state.schedule) return [];
      return state.schedule.races.filter(
        (race) => race.status === RaceStatus.FINISHED,
      );
    },
  },

  actions: {
    generateHorses() {
      const numberOfHorses = GAME_CONFIG.TOTAL_HORSES;

      const shuffledNames = [...HORSE_NAMES].sort(() => Math.random() - 0.5);
      const shuffledColors = [...HORSE_COLORS].sort(() => Math.random() - 0.5);

      this.horses = shuffledNames
        .slice(0, numberOfHorses)
        .map((name, index) => ({
          id: index + 1,
          name,
          color: shuffledColors[index],
          condition:
            Math.floor(Math.random() * HORSE_CONDITION.MAX) +
            HORSE_CONDITION.MIN,
        }));
    },

    async generateRaceSchedule() {
      this.isGenerating = true;

      await new Promise((resolve) =>
        setTimeout(resolve, GAME_CONFIG.GENERATION_DELAY),
      );

      const races: Race[] = [];

      for (let i = 0; i < GAME_CONFIG.TOTAL_RACES; i++) {
        const shuffledHorses = [...this.horses].sort(() => Math.random() - 0.5);
        const selectedHorses = shuffledHorses
          .slice(0, GAME_CONFIG.HORSES_PER_RACE)
          .map((horse) => ({
            ...horse,
            position: 0,
          }));

        races.push({
          id: i + 1,
          round: i + 1,
          distance: RACE_DISTANCES[i],
          horses: selectedHorses,
          status: RaceStatus.PENDING,
        });
      }

      this.schedule = {
        races,
        currentRaceIndex: 0,
        status: ScheduleStatus.NOT_STARTED,
      };

      this.isGenerating = false;
    },

    async startRacing() {
      // Guard clause
      if (
        !this.schedule ||
        !this.schedule.races ||
        this.schedule.races.length === 0
      ) {
        return;
      }
      if (this.isRacing) {
        return;
      }

      this.isRacing = true;
      this.isPaused = false;
      this.schedule.status = ScheduleStatus.RUNNING;

      try {
        for (
          let raceIndex = 0;
          raceIndex < this.schedule.races.length;
          raceIndex++
        ) {
          if (!this.schedule || !this.schedule.races) {
            break;
          }

          this.schedule.currentRaceIndex = raceIndex;
          await this.runSingleRace(this.schedule.races[raceIndex]);

          if (this.isPaused || !this.schedule) {
            break;
          }
        }

        if (this.schedule && !this.isPaused) {
          this.schedule.status = ScheduleStatus.FINISHED;
        }
      } catch (error) {
        console.error("Error during racing:", error);
      } finally {
        this.isRacing = false;
      }
    },

    toggleRacing() {
      if (!this.isRacing) {
        if (!this.schedule) {
          return;
        }
        this.startRacing();
      } else {
        this.isPaused = !this.isPaused;

        // Update current race status based on pause state
        if (this.schedule && this.currentRace) {
          if (this.isPaused && this.currentRace.status === RaceStatus.RUNNING) {
            this.currentRace.status = RaceStatus.PAUSED;
          } else if (
            !this.isPaused &&
            this.currentRace.status === RaceStatus.PAUSED
          ) {
            this.currentRace.status = RaceStatus.RUNNING;
          }
        }
      }
    },

    async runSingleRace(race: Race) {
      // Race validation
      if (!race || !race.horses || race.horses.length === 0) {
        return;
      }

      race.status = RaceStatus.RUNNING;

      race.horses.forEach((horse) => {
        horse.position = 0;
      });

      const updateInterval = RACE_ANIMATION.UPDATE_INTERVAL;
      const raceResults: RaceResult[] = [];
      const horsePerformance: Map<
        number,
        { speed: number; finalTime: number }
      > = new Map();

      race.horses.forEach((horse) => {
        const baseTime = race.distance / RACE_ANIMATION.SPEED_BASE;
        const conditionFactor = (101 - horse.condition) / 100;
        const randomFactor =
          RACE_ANIMATION.RANDOM_FACTOR.MIN +
          Math.random() *
            (RACE_ANIMATION.RANDOM_FACTOR.MAX -
              RACE_ANIMATION.RANDOM_FACTOR.MIN);
        const finalTime = baseTime * conditionFactor * randomFactor;
        const speed = race.distance / finalTime;

        horsePerformance.set(horse.id, { speed, finalTime });

        raceResults.push({
          position: 0,
          horse,
          time: finalTime,
        });
      });

      raceResults.sort((a, b) => a.time - b.time);
      raceResults.forEach((result, index) => {
        result.position = index + 1;
      });

      return new Promise<void>((resolve) => {
        let animationId: number | null = null;
        let startTime: number | null = null;
        let lastUpdateTime = 0;
        let pausedTime = 0; // Track total paused duration
        let pauseStartTime: number | null = null; // When current pause started

        // Calculate maximum expected race time based on slowest horse
        const maxExpectedTime = Math.max(
          ...Array.from(horsePerformance.values()).map((p) => p.finalTime),
        );

        const runAnimation = (currentTime: number) => {
          if (startTime === null) {
            startTime = currentTime;
          }

          if (!this.schedule) {
            if (animationId) {
              cancelAnimationFrame(animationId);
            }
            resolve();
            return;
          }

          if (this.isPaused) {
            race.status = RaceStatus.PAUSED;
            // Record when pause started
            if (pauseStartTime === null) {
              pauseStartTime = currentTime;
            }

            if (animationId) {
              cancelAnimationFrame(animationId);
              animationId = null;
            }

            const pauseCheck = (pauseCheckTime: number) => {
              if (!this.schedule) {
                resolve();
                return;
              }

              if (!this.isPaused) {
                race.status = RaceStatus.RUNNING;

                if (pauseStartTime !== null) {
                  pausedTime += pauseCheckTime - pauseStartTime;
                  pauseStartTime = null;
                }

                animationId = requestAnimationFrame(runAnimation);
              } else {
                requestAnimationFrame(pauseCheck);
              }
            };
            requestAnimationFrame(pauseCheck);
            return;
          }

          // Throttle updates
          if (currentTime - lastUpdateTime >= updateInterval) {
            const elapsedTime = (currentTime - startTime - pausedTime) / 1000;

            race.horses.forEach((horse) => {
              const performance = horsePerformance.get(horse.id);
              if (performance) {
                const expectedPosition = performance.speed * elapsedTime;
                const currentPosition = Math.min(
                  race.distance,
                  Math.floor(expectedPosition),
                );
                horse.position = Math.max(horse.position || 0, currentPosition);
              }
            });

            lastUpdateTime = currentTime;
          }

          // Only check if all horses have completed the race distance
          const allHorsesFinished = race.horses.every(
            (horse) => (horse.position ?? 0) >= race.distance,
          );

          // Adjust safety timeout to account for paused time
          const adjustedElapsedTime =
            (currentTime - startTime - pausedTime) / 1000;
          const safetyTimeout =
            startTime && adjustedElapsedTime >= maxExpectedTime + 1;

          if (allHorsesFinished || safetyTimeout) {
            if (animationId) {
              cancelAnimationFrame(animationId);
            }

            // Ensure all horses are at finish line
            race.horses.forEach((horse) => {
              horse.position = race.distance;
            });

            race.results = raceResults;
            race.status = RaceStatus.FINISHED;
            resolve();
          } else {
            animationId = requestAnimationFrame(runAnimation);
          }
        };

        animationId = requestAnimationFrame(runAnimation);
      });
    },

    resetGame() {
      if (this.isRacing) {
        this.isRacing = false;
        this.isPaused = false;
      }

      setTimeout(() => {
        this.schedule = null;
        this.isGenerating = false;
      }, 100);
    },
  },
});
