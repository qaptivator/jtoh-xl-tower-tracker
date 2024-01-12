enum AreaType {
  "Realm",
  "Subrealm",
}

enum ActionType {
  "Citadel",
  "Tower",
  "Obelisk",
  "Mini",
  "Event",
}

type World = {
  id: number;
  name: string;
};

type AreaRequirement = {
  diff: number; // difficulty in number
  count: number;
};

type Area = {
  id: number;
  name: string;
  requirements: AreaRequirement[];
  world: number; // world id
  type: AreaType;
};

type Action = {
  id: number;
  name: string;
  acronym: string;
  studs: number; // difficulty in number
  badge: number;
  type: ActionType;
  area: number; // area id
};

type TowerData = {
  difficulties: string[];
  worlds: World[];
  areas: Area[];
  actions: Action[];
};

export const towerdata = {
  difficulties: [
    "Easy",
    "Medium",
    "Hard",
    "Difficult",
    "Challenging",
    "Intense",
    "Remorseless",
    "Insane",
    "Extreme",
    "Terrifying",
    "Catastrophic",
  ],
  worlds: [
    {
      id: 0,
      name: "The great inferno",
    },
  ],
  areas: [
    {
      id: 0,
      name: "Ring 1",
      requirements: [
        {
          diff: 0,
          count: 0,
        },
      ],
      world: 0,
      type: AreaType.Realm,
    },
    {
      id: 1,
      name: "Ring 2",
      requirements: [
        {
          diff: 0,
          count: 0,
        },
      ],
      world: 0,
      type: AreaType.Realm,
    },
    {
      id: 2,
      name: "Ring 3",
      requirements: [
        {
          diff: 0,
          count: 0,
        },
      ],
      world: 0,
      type: AreaType.Realm,
    },
    {
      id: 3,
      name: "Ring 4",
      requirements: [
        {
          diff: 0,
          count: 0,
        },
      ],
      world: 0,
      type: AreaType.Realm,
    },
    {
      id: 4,
      name: "Forgotten Ridge",
      requirements: [
        {
          diff: 0,
          count: 0,
        },
      ],
      world: 0,
      type: AreaType.Subrealm,
    },
  ],
  actions: [
    {
      id: 0,
      name: "Tower of WHY",
      acronym: "lol",
      studs: 1.3,
      badge: 100,
      type: ActionType.Tower,
      area: 0,
    },
    {
      id: 0,
      name: "Citadel of Annoyingly Simple Trials",
      acronym: "CoAST",
      studs: 1.51,
      badge: 2144507537,
      type: ActionType.Citadel,
      area: 0,
    },
    {
      id: 0,
      name: "Citadel of Anger",
      acronym: "CoA",
      studs: 1.75,
      badge: 2144507528,
      type: ActionType.Citadel,
      area: 0,
    },
    {
      id: 0,
      name: "Not Even a Citadel",
      acronym: "NEaC",
      studs: 2,
      badge: 2144508147,
      type: ActionType.Mini,
      area: 0,
    },
    {
      id: 0,
      name: "Citadel of Madness",
      acronym: "CoM",
      studs: 2.71,
      badge: 2144507545,
      type: ActionType.Citadel,
      area: 0,
    },
    {
      id: 0,
      name: "Citadel of Vengeful Motives",
      acronym: "CoVM",
      studs: 3.62,
      badge: 2144507959,
      type: ActionType.Citadel,
      area: 0,
    },
    {
      id: 0,
      name: "Citadel of Hecc",
      acronym: "CoH",
      studs: 4.42,
      badge: 2144507559,
      type: ActionType.Citadel,
      area: 0,
    },
    {
      id: 0,
      name: "Citadel of Keyboard Yeeting",
      acronym: "CoKY",
      studs: 4.43,
      badge: 2144508030,
      type: ActionType.Citadel,
      area: 0,
    },
    {
      id: 0,
      name: "Citadel of Kill Joys",
      acronym: "CoKJ",
      studs: 4.73,
      badge: 2144507972,
      type: ActionType.Citadel,
      area: 0,
    },
    {
      id: 0,
      name: "Citadel of Stress",
      acronym: "CoS",
      studs: 5.61,
      badge: 2144508095,
      type: ActionType.Citadel,
      area: 0,
    },
    {
      id: 0,
      name: "Citadel of Screen Punching",
      acronym: "CoSP",
      studs: 5.85,
      badge: 2144508080,
      type: ActionType.Citadel,
      area: 0,
    },
    {
      id: 0,
      name: "Citadel of Rage",
      acronym: "CoR",
      studs: 6.62,
      badge: 2144508159,
      type: ActionType.Citadel,
      area: 0,
    },
    {
      id: 0,
      name: "Citadel of Impossible Expectactions",
      acronym: "CoIE",
      studs: 6.84,
      badge: 2144508116,
      type: ActionType.Citadel,
      area: 0,
    },
    {
      id: 0,
      name: "Citadel of True Skill",
      acronym: "CoTS",
      studs: 7.55,
      badge: 2144507554,
      type: ActionType.Citadel,
      area: 0,
    },
    {
      id: 0,
      name: "Obelisk of Laptop Splitting",
      acronym: "OoLS",
      studs: 7.34,
      badge: 2144508135,
      type: ActionType.Obelisk,
      area: 0,
    },
    {
      id: 0,
      name: "Thanos Citadel",
      acronym: "TC",
      studs: 8.92,
      badge: 2144508186,
      type: ActionType.Citadel,
      area: 0,
    },
  ],
} as TowerData;
