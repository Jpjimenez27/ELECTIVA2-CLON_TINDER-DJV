import express from 'express'
import { verifyToken } from '../middlewares/tokenValidation.js';
import { getLoggedUserInformation, getUserInformationForMatch, registerMatch } from '../controllers/usersController.js';
export const usersRouter = express.Router();

usersRouter.get("/getloggeduserinformation", verifyToken, getLoggedUserInformation);
usersRouter.get("/getUserinformationformatch", verifyToken, getUserInformationForMatch);
usersRouter.post("/registermatch", verifyToken, registerMatch);