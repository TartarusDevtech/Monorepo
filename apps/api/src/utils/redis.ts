import dotenv from "dotenv";
import type { RedisClientType } from "redis";
import { createClient } from "redis";

dotenv.config({ override: true });

const noRedisError = () =>
  console.error("[Redis] Redis client not initialized");

let redisClient: null | RedisClientType = null;

if (process.env.REDIS_URL) {
  redisClient = createClient({ url: process.env.REDIS_URL });

  redisClient.on("connect", () => console.info("[Redis] Redis connect"));
  redisClient.on("ready", () => console.info("[Redis] Redis ready"));
  redisClient.on("reconnecting", (err) =>
    console.error("[Redis] Redis reconnecting", err)
  );
  redisClient.on("error", (err) => console.error("[Redis] Redis error", err));
  redisClient.on("end", (err) => console.error("[Redis] Redis end", err));

  const connectRedis = async () => {
    console.info("[Redis] Connecting to Redis");
    await redisClient?.connect();
  };

  connectRedis().catch((error) =>
    console.error("[Redis] Connection error", error)
  );
} else {
  console.info("[Redis] REDIS_URL not set");
}

const randomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min) + min);
};

const hoursToSeconds = (hours: number): number => {
  return hours * 60 * 60;
};

// Generates a random expiry time between 1 and 3 hours
export const generateMediumExpiry = (): number => {
  return randomNumber(hoursToSeconds(1), hoursToSeconds(3));
};

// Generates a random expiry time between 4 and 8 hours
export const generateLongExpiry = (): number => {
  return randomNumber(hoursToSeconds(4), hoursToSeconds(8));
};

// Generates a random expiry time between 9 and 24 hours
const generateExtraLongExpiry = (): number => {
  return randomNumber(hoursToSeconds(9), hoursToSeconds(24));
};

export const generateForeverExpiry = (): number => {
  return hoursToSeconds(5000000);
};

export const setRedis = async (
  key: string,
  value: boolean | number | Record<string, any> | string,
  expiry = generateExtraLongExpiry()
) => {
  if (!redisClient) {
    noRedisError();
    return;
  }

  const redisValue = typeof value !== "string" ? JSON.stringify(value) : value;

  return await redisClient.set(key, redisValue, { EX: expiry });
};

export const getRedis = async (key: string) => {
  if (!redisClient) {
    noRedisError();
    return null;
  }
  return await redisClient.get(key);
};

export const delRedis = async (key: string) => {
  if (!redisClient) {
    noRedisError();
    return;
  }
  await redisClient.del(key);
};

export default redisClient;
