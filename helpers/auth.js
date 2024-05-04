import userModel from "../db/userModel.js";
import HttpError from "./HttpError.js";
import { controllerDecorator } from "./controllerDecorator.js";
import bcrypt from "bcrypt";


export const auth = controllerDecorator(async (req, res, next)=> {
    const data = req.headers.authorization;
    if (!data) {
        throw HttpError(401);
    } 
    const [method, base64Data] = data.split(" ");
    if (method !== "Basic")
    throw HttpError(401);
const [email, password] = Buffer.from(base64Data, "base64").toString().split(":")
const user = await userModel.findOne({email});
if(!user) {
    throw HttpError(401);

}
const isMatch = await bcrypt.compare(password, user.password);
if(!isMatch) {
    throw HttpError(401);

}
req.user = user;
next()
})