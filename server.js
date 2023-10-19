const http = require("http");
const app = require("./app");
const dotenv = require("dotenv");

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

// Access the port variable from .env.local
const envPort = process.env.PORT || 3000;

/**
 * Normalize the given port value.
 *
 * @param {any} val - The value to be normalized.
 * @return {number|boolean|string} The normalized port value.
 */
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(envPort || "3000");
app.set("port", port);

/**
 * Handles errors that occur in the server.
 *
 * @param {Error} error - The error object that occurred.
 * @return {void} This function does not return any value.
 */
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? `pipe ${address}` : `port: ${port}`;
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges.`);
      process.exit(1);
    case "EADDRINUSE":
      console.error(`${bind} is already in use.`);
      process.exit(1);
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? `pipe ${address}` : `port ${port}`;
  console.log(`Listening on ${bind} -> ${process.env.PORT}`);
});

server.listen(port);
