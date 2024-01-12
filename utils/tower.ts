function _getDiff(difficulty: number): string {
  return towerdata.difficulties[Math.floor(difficulty)];
}

function _getDiffPrefix(difficulty: number): string {
  const _diff = (difficulty * 100) % 100; // need to do this due to floating point errors
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

function _getFullDiff(difficulty: number): string {
  return `${_getDiff(difficulty)} ${_getDiffPrefix(difficulty)}`;
}

export const getDiff = _getDiff;
export const getDiffPrefix = _getDiffPrefix;
export const getFullDiff = _getFullDiff;
