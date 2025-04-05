import { run } from "pierre";

export const label = "Deploy";

const BUCKET_NAME = "hey-web";
const DISTRIBUTION_ID = "E24XS641URUSQM";

export default async ({ branch }) => {
  if (branch.name !== "main") {
    throw new Error("Only main branch is allowed to deploy");
  }

  await run("cd apps/web && pnpm build", {
    label: "Building web"
  });

  // Configure AWS CLI
  await run(
    `aws configure set aws_access_key_id ${process.env.AWS_ACCESS_KEY_ID}`,
    { label: "Configuring AWS Access Key" }
  );

  await run(
    `aws configure set aws_secret_access_key ${process.env.AWS_SECRET_ACCESS_KEY}`,
    { label: "Configuring AWS Secret Access Key" }
  );

  await run("aws configure set default.region us-east-1", {
    label: "Configuring AWS Region"
  });

  // Sync build output to S3
  await run(`aws s3 sync apps/web/dist/ s3://${BUCKET_NAME} --delete`, {
    label: "Uploading build to S3"
  });

  // Invalidate CloudFront cache
  await run(
    `aws cloudfront create-invalidation --distribution-id ${DISTRIBUTION_ID} --paths "/*"`,
    { label: "Invalidating CloudFront Cache" }
  );
};
