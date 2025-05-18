import { Hono } from "hono";
import secretMiddleware from "src/middlewares/secretMiddleware";
import syncProAccounts from "./syncProAccounts";

const app = new Hono();

app.get("/syncProAccounts", secretMiddleware, syncProAccounts);

export default app;
