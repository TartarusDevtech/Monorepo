import type { Response } from "express";

export const ping = async (res: Response) => {
  return res.json({ ping: "pong" });
};
