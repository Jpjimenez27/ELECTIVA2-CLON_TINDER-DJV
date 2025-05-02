import express from 'express'
import { verifyToken } from '../middlewares/tokenValidation.js';
import { acceptMatch, getChatsList, getLoggedUserInformation, getUserInformationForMatch, registerMatch } from '../controllers/usersController.js';
import { validateAccpetMatch, validateRegisterMatch } from '../middlewares/userValidations.js';
export const usersRouter = express.Router();

usersRouter.get("/getloggeduserinformation", verifyToken, getLoggedUserInformation);
usersRouter.get("/getUserinformationformatch", verifyToken, getUserInformationForMatch);
usersRouter.post("/registermatch", validateRegisterMatch, verifyToken, registerMatch);
usersRouter.put("/acceptmatch", validateAccpetMatch, verifyToken, acceptMatch);
usersRouter.get("/getchatslist", verifyToken, getChatsList);