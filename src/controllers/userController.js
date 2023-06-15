const express = require("express");
const userServices = require("../services/userServices");
const authorizer = require("../middlewares/authorizer");
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const newUser = req.body;
  const serviceResponse = await userServices.register(newUser);
  return res.status(serviceResponse.status).send(serviceResponse);
});

userRouter.post("/login", async (req, res) => {
  const login = req.body;
  const serviceResponse = await userServices.login(login);
  return res.status(serviceResponse.status).send(serviceResponse);
});

userRouter.get("/user", authorizer, async (_, res) => {
  const serviceResponse = await userServices.findAllusers();
  return res.status(serviceResponse.status).send(serviceResponse);
});

userRouter.delete("/user/:userId", authorizer, async (req, res) => {
  const userId = req.params.userId;
  const serviceResponse = await userServices.deleteUser(userId);
  return res.status(serviceResponse.status).send(serviceResponse);
});

userRouter.patch("/user/:userId", authorizer, async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;
  const serviceResponse = await userServices.updateUser(userId, data);
  return res.status(serviceResponse.status).send(serviceResponse);
});

module.exports = userRouter;
