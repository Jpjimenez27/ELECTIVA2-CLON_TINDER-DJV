import express from 'express'
import { verifyToken } from '../middlewares/tokenValidation.js';
import { getLoggedUserInformation } from '../controllers/usersController.js';
export const usersRouter = express.Router();

usersRouter.get("/getloggeduserinformation", verifyToken, getLoggedUserInformation);