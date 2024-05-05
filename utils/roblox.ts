import axios from "axios";

export type UserBadgeInfo = {
  badgeId: number;
  awardedDate: Date;
};

export async function getUsernameFromId(
  userId: number
): Promise<[string, any]> {
  let requestError: any = null;
  const res: any = await axios
    .get(`https://users.roproxy.com/v1/users/${userId}`)
    .catch((e) => {
      requestError = e;
    });

  if (requestError || res?.status !== 200) {
    return ["", requestError];
  }

  return [res.data.name, requestError];
}

export async function getIdFromUsername(
  usernames: string | string[]
): Promise<[number, any]> {
  const _usernames: string[] = Array.isArray(usernames)
    ? usernames
    : [usernames];

  let requestError: any = null;
  const res: any = await axios
    .post("https://users.roproxy.com/v1/usernames/users", {
      usernames: _usernames,
      excludeBannedUsers: false,
    })
    .catch((e) => {
      requestError = e;
    });
  const _data: any = res.data.data;

  let results: any = _usernames.map((username) => {
    return _data.find((result: any) => result.requestedUsername === username);
  });

  results = results.map((result: any) =>
    result !== undefined ? result.id : null
  );
  const result: number = (results.length > 1 ? results[0] : results)[0];

  return [result, requestError];
}

export async function getBadgeAwardedTimestampts(
  userId: number,
  badgeIds: number | number[]
): Promise<[UserBadgeInfo[], any]> {
  const _badgeIds: number[] = Array.isArray(badgeIds) ? badgeIds : [badgeIds];
  let requestError: any = null;

  const [username, usernameRequestError] = await getUsernameFromId(userId);

  if (usernameRequestError) {
    requestError = usernameRequestError;
    return [[], requestError];
  }

  if (username) {
    const res: any = await axios
      .get(
        `https://badges.roproxy.com/v1/users/${userId}/badges/awarded-dates?badgeIds=${_badgeIds.join(
          ","
        )}`
      )
      .catch((e) => {
        requestError = e;
      });

    return [res.data.data, requestError];
  } else {
    return [[], requestError];
  }
}
