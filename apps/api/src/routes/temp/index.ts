import { Hono } from "hono";
import getJumperQuotes from "./getJumperQuotes";
import getJumperTips from "./getJumperTips";

const app = new Hono();

app.get("/jumper/quotes", getJumperQuotes);
app.get("/jumper/tips", getJumperTips);

export default app;
