import { CHAIN } from "@/constants";
import { HeadObjectCommand, PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import { EVER_API, EVER_BUCKET, EVER_REGION } from "@hey/data/constants";
import generateUUID from "@hey/helpers/generateUUID";
import { immutable } from "@lens-chain/storage-client";
import { storageClient } from "./storageClient";
import { queryClient, trpc } from "./trpc";

const FALLBACK_TYPE = "image/jpeg";
const FILE_SIZE_LIMIT = 8 * 1024 * 1024; // 8MB

const getS3Client = async (): Promise<S3> => {
  const data = await queryClient.fetchQuery(trpc.misc.sts.queryOptions());
  if (!data) {
    throw new Error("Failed to get S3 client");
  }

  return new S3({
    credentials: {
      accessKeyId: data.accessKeyId ?? "",
      secretAccessKey: data.secretAccessKey ?? "",
      sessionToken: data.sessionToken ?? ""
    },
    endpoint: EVER_API,
    region: EVER_REGION
  });
};

const uploadToIPFS = async (
  data: FileList | File[]
): Promise<{ mimeType: string; uri: string }[]> => {
  try {
    const files = Array.from(data);
    const hasLargeFile = files.some((f) => f.size > FILE_SIZE_LIMIT);
    const client = hasLargeFile ? await getS3Client() : null;

    return await Promise.all(
      files.map(async (file) => {
        const mimeType = file.type || FALLBACK_TYPE;

        // Small file — Grove
        if (file.size <= FILE_SIZE_LIMIT) {
          const res = await storageClient.uploadFile(file, {
            acl: immutable(CHAIN.id)
          });
          return { mimeType, uri: res.uri };
        }

        // Large file — S3 + IPFS
        if (client) {
          const key = `${new Date().toISOString().split("T")[0]}/${generateUUID()}`;
          await client.send(
            new PutObjectCommand({
              Bucket: EVER_BUCKET,
              Key: key,
              Body: new Uint8Array(await file.arrayBuffer()),
              ContentType: mimeType
            })
          );

          const meta = await client.send(
            new HeadObjectCommand({ Bucket: EVER_BUCKET, Key: key })
          );
          const cid = meta.Metadata?.["ipfs-hash"];

          return { mimeType, uri: cid ? `ipfs://${cid}` : "" };
        }

        return { mimeType, uri: "" };
      })
    );
  } catch {
    return [];
  }
};

export const uploadFileToIPFS = async (
  file: File
): Promise<{ mimeType: string; uri: string }> => {
  const [res] = await uploadToIPFS([file]);
  return res || { mimeType: file.type || FALLBACK_TYPE, uri: "" };
};

export default uploadToIPFS;
