const path = require("path");

// Set canonical production database URL before any Next.js or Prisma initialization.
// This ensures the running process always uses the verified production database,
// regardless of how Passenger starts the application or what working directory is active.
process.env.DATABASE_URL =
  "file:/home/u318730766/domains/stackspacer.com/nodejs/prisma/dev.db";

const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3000, () => {
    // eslint-disable-next-line no-console
    console.log("> Ready on http://localhost:3000");
  });
}).catch((err) => {
  // eslint-disable-next-line no-console
  console.error("Failed to start Next.js server:", err);
  process.exit(1);
});
