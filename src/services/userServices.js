const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const createHttpError = require("http-errors");
const StatusCode = require("../utils/httpStatusCode");

const login = async ({ username, password }) => {
  try {
    const bdResponse = await findUser(username);
    if (bdResponse?.message) return bdResponse;
    const validateResponse = await validateUser(password, bdResponse.password);
    if (validateResponse?.message) return validateResponse;
    delete bdResponse.password;
    return {
      status: StatusCode.SuccessOK,
      token: jwt.sign(bdResponse, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
      }),
    };
  } catch (error) {
    let status = StatusCode.ServerErrorInternal;
    return createHttpError(status, error.message);
  }
};

const findUser = async (username) => {
  const user = await userModel.findOne({
    $or: [{ email: username }, { cpf: username }],
  });
  if (!user)
    return createHttpError(
      StatusCode.ClientErrorNotFound,
      "Usuário não encontrado"
    );
  return user.toJSON();
};

const validateUser = async (password, hashPassword) => {
  const userExist = await bcrypt.compare(password, hashPassword);

  if (!userExist)
    return createHttpError(
      StatusCode.ClientErrorUnauthorized,
      "Senha incorreta!"
    );
};

const register = async (newUser) => {
  try {
    newUser.password = await bcrypt.hash(newUser.password, 10);
    await userModel.create(newUser);
    return { status: StatusCode.SuccessCreated };
  } catch (error) {
    let status = StatusCode.ServerErrorInternal;
    if (error.name === "ValidationError" || error.code === 11000)
      status = StatusCode.ClientErrorBadRequest;
    return createHttpError(status, error.message);
  }
};

const findAllusers = async () => {
  try {
    const users = await userModel.find().select("-password");
    return { status: StatusCode.SuccessOK, users };
  } catch (error) {
    let status = StatusCode.ServerErrorInternal;
    return createHttpError(status, error.message);
  }
};
const deleteUser = async (userId) => {
  try {
    const result = await userModel.deleteOne({ _id: userId });
    return { status: StatusCode.SuccessOK, result };
  } catch (error) {
    let status = StatusCode.ServerErrorInternal;
    return createHttpError(status, error.message);
  }
};
const updateUser = async (userId, data) => {
  try {
    const result = await userModel.findByIdAndUpdate(userId, data, {
      new: true,
      runValidators: true,
    });
    return { status: StatusCode.SuccessOK, result: result.toJSON() };
  } catch (error) {
    let status = StatusCode.ServerErrorInternal;
    if (error.name === "ValidationError" || error.code === "11000")
      status = StatusCode.ClientErrorBadRequest;
    return createHttpError(status, error.message);
  }
};

module.exports = { login, register, findAllusers, deleteUser, updateUser };
