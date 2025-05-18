import { Hono } from "hono";
import secretMiddleware from "src/middlewares/secretMiddleware";
import getProAccounts from "./getProAccounts";

const app = new Hono();

app.get("/pro", secretMiddleware, getProAccounts);

export default app;
