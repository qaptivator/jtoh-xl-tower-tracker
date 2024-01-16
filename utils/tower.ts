import { towerdata } from "./towerdata";

export function clamp(number: number, min: number, max: number): number {
  return Math.max(min, Math.min(number, max));
}

export function roundDiff(difficulty: number): number {
  return Math.floor(Math.max(difficulty - 1, 0));
}

export function getDiff(difficulty: number): Difficulty {
  return towerdata.difficulties[roundDiff(difficulty)];
}

export function getDiffPrefix(difficulty: number): string {
  const _diff = (Math.max(difficulty - 1, 0) * 100) % 100; // need to do this due to floating point errors
  switch (true) {
    case _diff >= 89:
      return "Peak";
    case _diff >= 78:
      return "High-Peak";
    case _diff >= 67:
      return "High";
    case _diff >= 56:
      return "Mid-High";
    case _diff >= 45:
      return "Mid";
    case _diff >= 33:
      return "Low-Mid";
    case _diff >= 22:
      return "Low";
    case _diff >= 11:
      return "Bottom-Low";
    case _diff >= 1:
      return "Bottom";
    default:
      return "Baseline";
  }
}

export function getDiffColor(difficulty: number): string {
  return getDiff(difficulty).color;
}
