import express from 'express'
import {  login, registerUser, verifyExistsUser } from "../controllers/authUserContoller.js";
import { validateRegisterUser } from '../middlewares/userValidations.js';
import {verifyToken} from './../middlewares/tokenValidation.js'
export const authUserRouter = express.Router();

authUserRouter.post("/registeruser", registerUser);
authUserRouter.get("/verifyexistsuser/:email", verifyExistsUser);
authUserRouter.post("/login", login);
