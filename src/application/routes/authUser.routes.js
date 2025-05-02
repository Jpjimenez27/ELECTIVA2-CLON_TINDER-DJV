import express from 'express'
import {  login, registerUser, verifyExistsUser } from "../controllers/authUserContoller.js";
import { validateLogin, validateRegisterUser } from '../middlewares/userValidations.js';
export const authUserRouter = express.Router();

authUserRouter.post("/registeruser",validateRegisterUser, registerUser);
authUserRouter.get("/verifyexistsuser/:email", verifyExistsUser);
authUserRouter.post("/login",validateLogin, login);
