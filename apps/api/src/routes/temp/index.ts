import { Hono } from "hono";
import getJumperQuotes from "./getJumperQuotes";

const app = new Hono();

app.get("/jumper/quotes", getJumperQuotes);

export default app;
