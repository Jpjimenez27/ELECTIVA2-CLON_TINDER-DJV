import express from 'express'
import {registerUser } from "../controllers/authUserContoller.js";
import { validateRegisterUser } from '../middlewares/userValidations.js';
export const authUserRouter = express.Router();

authUserRouter.post("/registeruser", registerUser);
export default authUserRouter;