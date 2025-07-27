import { defineStore } from "pinia";
import type {
  Race,
  GameState,
  RaceResult,
  AnimationState,
} from "@/types/horse-racing";
import {
  HORSE_NAMES,
  HORSE_COLORS,
  GAME_CONFIG,
  RACE_DISTANCES,
  RACE_ANIMATION,
  HORSE_CONDITION,
} from "@/constants";
import { RaceStatus, ScheduleStatus } from "@/types/enums";
import { shuffleArray, randomBetween, generateMixedColors } from "@/utils";

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

      const shuffledNames = shuffleArray(HORSE_NAMES);

      const horseColors = generateMixedColors(numberOfHorses, HORSE_COLORS);

      this.horses = shuffledNames
        .slice(0, numberOfHorses)
        .map((name, index) => ({
          id: index + 1,
          name,
          color: horseColors[index],
          condition: randomBetween(HORSE_CONDITION.MIN, HORSE_CONDITION.MAX),
        }));
    },

    async generateRaceSchedule() {
      this.isGenerating = true;

      await new Promise((resolve) =>
        setTimeout(resolve, GAME_CONFIG.GENERATION_DELAY),
      );

      const races: Race[] = [];

      for (let i = 0; i < GAME_CONFIG.TOTAL_RACES; i++) {
        const shuffledHorses = shuffleArray(this.horses);
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

      return this.runRaceAnimation(
        race,
        horsePerformance,
        raceResults,
        updateInterval,
      );
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

    runRaceAnimation(
      race: Race,
      horsePerformance: Map<number, { speed: number; finalTime: number }>,
      raceResults: RaceResult[],
      updateInterval: number,
    ): Promise<void> {
      return new Promise<void>((resolve) => {
        const animationState = this.createAnimationState(horsePerformance);

        const runAnimation = (currentTime: number) => {
          this.handleAnimationFrame(
            currentTime,
            race,
            horsePerformance,
            raceResults,
            updateInterval,
            animationState,
            runAnimation,
            resolve,
          );
        };

        animationState.animationId = requestAnimationFrame(runAnimation);
      });
    },

    createAnimationState(
      horsePerformance: Map<number, { speed: number; finalTime: number }>,
    ): AnimationState {
      return {
        animationId: null,
        startTime: null,
        lastUpdateTime: 0,
        pausedTime: 0,
        pauseStartTime: null,
        maxExpectedTime: Math.max(
          ...Array.from(horsePerformance.values()).map((p) => p.finalTime),
        ),
      };
    },

    handleAnimationFrame(
      currentTime: number,
      race: Race,
      horsePerformance: Map<number, { speed: number; finalTime: number }>,
      raceResults: RaceResult[],
      updateInterval: number,
      animationState: AnimationState,
      runAnimation: (time: number) => void,
      resolve: () => void,
    ) {
      // Initialize start time
      if (animationState.startTime === null) {
        animationState.startTime = currentTime;
      }

      if (!this.schedule) {
        this.cleanupAnimation(animationState);
        resolve();
        return;
      }

      // Handle pause state
      if (this.isPaused) {
        this.handlePauseState(
          currentTime,
          race,
          animationState,
          runAnimation,
          resolve,
        );
        return;
      }

      // Update horse positions
      this.updateHorsePositions(
        currentTime,
        race,
        horsePerformance,
        updateInterval,
        animationState,
      );

      // Check race completion
      if (this.isRaceComplete(currentTime, race, animationState)) {
        this.finishRace(race, raceResults, animationState);
        resolve();
      } else {
        animationState.animationId = requestAnimationFrame(runAnimation);
      }
    },

    handlePauseState(
      currentTime: number,
      race: Race,
      animationState: AnimationState,
      runAnimation: (time: number) => void,
      resolve: () => void,
    ) {
      race.status = RaceStatus.PAUSED;

      // Record when pause started
      if (animationState.pauseStartTime === null) {
        animationState.pauseStartTime = currentTime;
      }

      this.cleanupAnimation(animationState);

      const pauseCheck = (pauseCheckTime: number) => {
        if (!this.schedule) {
          resolve();
          return;
        }

        if (!this.isPaused) {
          race.status = RaceStatus.RUNNING;

          if (animationState.pauseStartTime !== null) {
            animationState.pausedTime +=
              pauseCheckTime - animationState.pauseStartTime;
            animationState.pauseStartTime = null;
          }

          animationState.animationId = requestAnimationFrame(runAnimation);
        } else {
          requestAnimationFrame(pauseCheck);
        }
      };
      requestAnimationFrame(pauseCheck);
    },

    updateHorsePositions(
      currentTime: number,
      race: Race,
      horsePerformance: Map<number, { speed: number; finalTime: number }>,
      updateInterval: number,
      animationState: AnimationState,
    ) {
      // Throttle updates
      if (currentTime - animationState.lastUpdateTime >= updateInterval) {
        const startTime = animationState.startTime ?? currentTime;
        const elapsedTime =
          (currentTime - startTime - animationState.pausedTime) / 1000;

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

        animationState.lastUpdateTime = currentTime;
      }
    },

    isRaceComplete(
      currentTime: number,
      race: Race,
      animationState: AnimationState,
    ): boolean {
      // Check if all horses finished
      const allHorsesFinished = race.horses.every(
        (horse) => (horse.position ?? 0) >= race.distance,
      );

      // Check safety timeout
      const startTime = animationState.startTime ?? currentTime;
      const adjustedElapsedTime =
        (currentTime - startTime - animationState.pausedTime) / 1000;
      const safetyTimeout =
        !!animationState.startTime &&
        adjustedElapsedTime >= animationState.maxExpectedTime + 1;

      return allHorsesFinished || safetyTimeout;
    },

    finishRace(
      race: Race,
      raceResults: RaceResult[],
      animationState: AnimationState,
    ) {
      this.cleanupAnimation(animationState);

      // Ensure all horses are at finish line
      race.horses.forEach((horse) => {
        horse.position = race.distance;
      });

      race.results = raceResults;
      race.status = RaceStatus.FINISHED;
    },

    cleanupAnimation(animationState: AnimationState) {
      if (animationState.animationId) {
        cancelAnimationFrame(animationState.animationId);
        animationState.animationId = null;
      }
    },
  },
});
