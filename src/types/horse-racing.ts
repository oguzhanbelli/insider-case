import { RaceStatus, ScheduleStatus } from "@/types/enums";

export interface Horse {
  id: number;
  name: string;
  color: string;
  condition: number; // 1-100
  position?: number; // current position in race
}

export interface Race {
  id: number;
  round: number;
  distance: number;
  horses: Horse[];
  results?: RaceResult[];
  status: RaceStatus;
}

export interface RaceResult {
  position: number;
  horse: Horse;
  time: number; // race completion time in seconds
}

export interface RaceSchedule {
  races: Race[];
  currentRaceIndex: number;
  status: ScheduleStatus;
}

export interface GameState {
  horses: Horse[];
  schedule: RaceSchedule | null;
  isGenerating: boolean;
  isRacing: boolean;
  isPaused: boolean;
}
