import axios from "axios";

type UserBadgeInfo = {
  badgeId: number;
  awardedDate: Date;
};

export async function getUsernameFromId(userId: number): Promise<string> {
  const res: any = await axios
    .get(`https://users.roproxy.com/v1/users/${userId}`)
    .catch((e) => {});
  if (res.status === 200) {
    return res.data.name;
  } else {
    return "";
  }
}

export async function getIdFromUsername(
  usernames: string | string[]
): Promise<number> {
  const _usernames: string[] = Array.isArray(usernames)
    ? usernames
    : [usernames];

  const res: any = await axios
    .post("https://users.roproxy.com/v1/usernames/users", {
      usernames: _usernames,
      excludeBannedUsers: false,
    })
    .catch((e) => {});
  const _data: any = res.data.data;

  let results = _usernames.map((username) => {
    return _data.find((result: any) => result.requestedUsername === username);
  });

  results = results.map((result) => (result !== undefined ? result.id : null));

  return results.length > 1 ? results : results[0];
}

export async function getBadgeAwardedTimestampts(
  userId: number,
  badgeIds: number | number[]
): Promise<UserBadgeInfo[]> {
  const _badgeIds: number[] = Array.isArray(badgeIds) ? badgeIds : [badgeIds];

  if (await getUsernameFromId(userId)) {
    const res: any = await axios
      .get(
        `https://badges.roproxy.com/v1/users/${userId}/badges/awarded-dates?badgeIds=${_badgeIds.join(
          ","
        )}`
      )
      .catch((e) => {});

    return res.data.data;
  } else {
    return [];
  }
}
