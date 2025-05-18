import { Hono } from "hono";
import secretMiddleware from "src/middlewares/secretMiddleware";
import syncHQScoreAccounts from "./syncHQScoreAccounts";
import syncProAccounts from "./syncProAccounts";

const app = new Hono();

app.get("/syncProAccounts", secretMiddleware, syncProAccounts);
app.get("/syncHQScoreAccounts", secretMiddleware, syncHQScoreAccounts);

export default app;
