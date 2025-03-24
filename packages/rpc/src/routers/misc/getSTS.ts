import { AssumeRoleCommand, STSClient } from "@aws-sdk/client-sts";
import { EVER_API, EVER_BUCKET, EVER_REGION } from "@hey/data/constants";
import { TRPCError } from "@trpc/server";
import { publicProcedure } from "../../trpc";

const params = {
  DurationSeconds: 900,
  Policy: `{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": [
          "s3:PutObject",
          "s3:GetObject",
          "s3:AbortMultipartUpload"
        ],
        "Resource": [
          "arn:aws:s3:::${EVER_BUCKET}/*"
        ]
      }
    ]
  }`
};

export const getSTS = publicProcedure.query(async () => {
  try {
    const stsClient = new STSClient({
      credentials: {
        accessKeyId: process.env.EVER_ACCESS_KEY as string,
        secretAccessKey: process.env.EVER_ACCESS_SECRET as string
      },
      endpoint: EVER_API,
      region: EVER_REGION
    });
    const command = new AssumeRoleCommand({
      ...params,
      RoleArn: undefined,
      RoleSessionName: undefined
    });
    const { Credentials: credentials } = await stsClient.send(command);

    return {
      accessKeyId: credentials?.AccessKeyId,
      secretAccessKey: credentials?.SecretAccessKey,
      sessionToken: credentials?.SessionToken
    };
  } catch {
    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
  }
});
