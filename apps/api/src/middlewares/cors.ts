import { cors as corsMiddleware } from "hono/cors";

const allowedOrigins = [
  "http://localhost:4783",
  "https://hey.xyz",
  "https://developer.lens.xyz"
];

export const cors = corsMiddleware({
  origin: allowedOrigins,
  allowHeaders: ["Content-Type", "X-Id-Token"],
  allowMethods: ["GET", "POST", "OPTIONS"],
  credentials: true
});

export default cors;
