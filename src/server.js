const express = require("express");
const userRouter = require("./controllers/userController");
const PORT = 3123;
const app = express();

const startServer = () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/v1", userRouter);
  app.listen(PORT, () => {
    console.debug(`Server Started at ${PORT}\n`);
  });
};

module.exports = startServer;
