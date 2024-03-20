const app = require("./app");
const connectDatabase = require("./config/db");
const logger = require("./controllers/loggerController");
const { serverPort } = require("./secret");

app.listen(serverPort, () => {
  logger.log("info",`server is running at http://localhost:${serverPort}`);
  connectDatabase()
});
