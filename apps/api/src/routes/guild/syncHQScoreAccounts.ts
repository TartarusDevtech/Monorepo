import { Errors } from "@hey/data/errors";
import type { Context } from "hono";
import lensPg from "src/utils/lensPg";
import syncAddressesToGuild from "src/utils/syncAddressesToGuild";

const syncHQScoreAccounts = async (ctx: Context) => {
  try {
    const hqScoreAccounts = await lensPg.query(
      `
        SELECT DISTINCT account 
        FROM ml.account_score
        WHERE score > 90;
      `
    );

    const addresses = hqScoreAccounts.map((account) =>
      `0x${account.account.toString("hex")}`.toLowerCase()
    );

    const data = await syncAddressesToGuild({
      addresses,
      roleId: 173446,
      requirementId: 471245
    });

    return ctx.json(data);
  } catch {
    return ctx.json({ success: false, error: Errors.SomethingWentWrong }, 500);
  }
};

export default syncHQScoreAccounts;
