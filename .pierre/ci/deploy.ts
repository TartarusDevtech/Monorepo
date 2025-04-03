import { run } from "pierre";

export const label = "Deploy";

export default async ({ branch }) => {
  if (branch.name !== "main") {
    throw new Error("Only main branch is allowed to deploy");
  }

  await run("cd apps/web && pnpm build", {
    label: "Building web"
  });

  await run(
    "aws configure set aws_access_key_id ${{ process.env.AWS_ACCESS_KEY_ID }}",
    { label: "Configuring Access Key" }
  );

  await run(
    "aws configure set aws_secret_access_key ${{ process.env.AWS_SECRET_ACCESS_KEY }}",
    { label: "Configuring Secret Access Key" }
  );

  await run("aws configure set default.region us-east-1", {
    label: "Configuring Region"
  });
};
