import User from "../db/models/UserSchema.mjs";
import { GameTypes } from "./Constants.mjs";

const SortByWinsGameType = async (speedType, limit) => {
  return await User.aggregate([
    {
      $set: {
        totalGames: {
          $add: [
            `$${
              speedType === GameTypes.REGULAR
                ? "regular_wins"
                : "california_wins"
            }`,
            `$${
              speedType === GameTypes.REGULAR
                ? "regular_losses"
                : "california_losses"
            }`,
          ],
        },
      },
    },
    {
      $set: {
        percentage: {
          $cond: [
            { $eq: [`$totalGames`, 0] },
            0,
            {
              $divide: [
                `$${
                  speedType === GameTypes.REGULAR
                    ? "regular_wins"
                    : "california_wins"
                }`,
                `$totalGames`,
              ],
            },
          ],
        },
      },
    },
    { $sort: { percentage: -1, totalGames: -1, updatedAt: 1 } },
    {
      $unset: [
        "_id",
        "email",
        "salt",
        "password",
        `${
          speedType === GameTypes.REGULAR ? "california_wins" : "regular_wins"
        }`,
        `${
          speedType === GameTypes.REGULAR
            ? "california_losses"
            : "regular_losses"
        }`,
      ],
    },
  ]).limit(limit);
};

export default SortByWinsGameType;
