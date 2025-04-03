import { run } from "pierre";

export const label = "Build";

export default async () => {
  await run("cd apps/web && pnpm build", {
    label: "Building Web"
  });

  await run("cd apps/api && pnpm build", {
    label: "Building API"
  });
};
