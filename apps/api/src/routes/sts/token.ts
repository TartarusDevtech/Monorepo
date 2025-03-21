import { AssumeRoleCommand, STSClient } from "@aws-sdk/client-sts";
import { EVER_API, EVER_BUCKET, EVER_REGION } from "@hey/data/constants";
import type { Request, Response } from "express";
import catchedError from "src/helpers/catchedError";
import { rateLimiter } from "src/helpers/middlewares/rateLimiter";

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

export const get = [
  rateLimiter({ requests: 50, within: 1 }),
  async (_: Request, res: Response) => {
    try {
      const stsClient = new STSClient({
        credentials: {
          accessKeyId: process.env.EVER_ACCESS_KEY,
          secretAccessKey: process.env.EVER_ACCESS_SECRET
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

      return res.status(200).json({
        accessKeyId: credentials?.AccessKeyId,
        secretAccessKey: credentials?.SecretAccessKey,
        sessionToken: credentials?.SessionToken,
        success: true
      });
    } catch (error) {
      return catchedError(res, error);
    }
  }
];
