import userModel from "../db/userModel.js";
import { controllerDecorator } from "../helpers/controllerDecorator.js";
import bcrypt from "bcrypt";
import HttpError from "../helpers/HttpError.js";

export const register = controllerDecorator(async (req, res) => {
  const { email, password, name } = req.body;
  const user = await userModel.findOne({ email });
  if (user) throw HttpError(409);
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await userModel.create({
    email,
    password: hashedPassword,
    name,
  });
  res.send(newUser);
});

export const getUser = (req, res) => {};
