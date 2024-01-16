import { describe, test, expect } from "vitest";
import {
  getUsernameFromId,
  getIdFromUsername,
  getBadgeAwardedTimestampts,
} from "../utils/roblox";
import {
  roundDiff,
  getDiff,
  getDiffPrefix,
  getDiffColor,
} from "../utils/tower";

describe("roblox utils", () => {
  test("getUsernameFromId() returning valid username", async () => {
    expect(getUsernameFromId).toBeTruthy();

    const result = await getUsernameFromId(1);

    expect(result).toBeTypeOf("string");
    expect(result).toEqual("Roblox");
  });

  test("getIdFromUsername() returning valid id", async () => {
    expect(getIdFromUsername).toBeTruthy();

    const result = await getIdFromUsername("Roblox");

    expect(result).toBeTypeOf("number");
    expect(result).toEqual(1);
  });

  test("getBadgeAwardedTimestampts() returning valid timestamps", async () => {
    expect(getBadgeAwardedTimestampts).toBeTruthy();

    const result = await getBadgeAwardedTimestampts(
      156,
      [14468729, 14468788, 14468882]
    );
    const timestampts = result.map((el) => el.awardedDate);

    expect(timestampts).toBeTruthy();
    for (const timestamp in timestampts) {
      expect(parseInt(timestamp)).toBeTypeOf("number");
      expect(new Date(timestamp)).toBeTruthy();
    }
  });
});

describe("tower utils", () => {
  test("roundDiff() returning valid rounded diff", async () => {
    expect(roundDiff).toBeTruthy();

    const result = roundDiff(5.67);

    expect(result).toBeTypeOf("number");
    expect(result).toEqual(4);
  });

  test("getDiff() returning valid diff", async () => {
    expect(getDiff).toBeTruthy();

    const result = getDiff(5.67);

    expect(result).toBeTruthy();
    expect(result.name).toBeTypeOf("string");
    expect(result.color).toBeTypeOf("string");
  });

  test("getDiff() returning valid diff", async () => {
    expect(getDiff).toBeTruthy();

    const result = getDiff(5.67);

    expect(result).toBeTruthy();
    expect(result.name).toBeTypeOf("string");
    expect(result.color).toBeTypeOf("string");
  });

  test("getDiffPrefix() returning valid prefix", async () => {
    expect(getDiffPrefix).toBeTruthy();

    expect(getDiffPrefix(5.67)).toBeTypeOf("string");
    expect(getDiffPrefix(9.99)).toBeTypeOf("string");
    expect(getDiffPrefix(-1)).toBeTypeOf("string");
    expect(getDiffPrefix(0)).toBeTypeOf("string");
  });

  test("getDiffColor() returning valid color", async () => {
    expect(getDiffColor).toBeTruthy();

    expect(getDiffColor(5.67)).toBeTypeOf("string");
  });
});

//describe("towerdata utils", () => {});
