import { Hono } from "hono";
import lensAuthorization from "./lensAuthorization";
import lensVerification from "./lensVerification";

const app = new Hono();

app.post("/authorization", lensAuthorization);
app.post("/verification", lensVerification);

export default app;
