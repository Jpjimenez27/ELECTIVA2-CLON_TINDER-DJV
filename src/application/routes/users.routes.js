import express from 'express'
import { verifyToken } from '../middlewares/tokenValidation.js';
import { acceptMatch, getLoggedUserInformation, getUserInformationForMatch, registerMatch } from '../controllers/usersController.js';
export const usersRouter = express.Router();

usersRouter.get("/getloggeduserinformation", verifyToken, getLoggedUserInformation);
usersRouter.get("/getUserinformationformatch", verifyToken, getUserInformationForMatch);
usersRouter.post("/registermatch", verifyToken, registerMatch);
usersRouter.put("/acceptmatch", verifyToken, acceptMatch);