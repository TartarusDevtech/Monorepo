import { run } from "pierre";

export const label = "Deploy";

export default async ({ branch }) => {
  if (branch.name !== "main") {
    throw new Error("Only main branch is allowed to deploy");
  }

  await run("cd apps/web && pnpm build", {
    label: "Building web"
  });
};
