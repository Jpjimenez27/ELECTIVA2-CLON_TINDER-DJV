import express from 'express'
import { verifyToken } from '../middlewares/tokenValidation.js';
import { acceptMatch, getChatsList, getLoggedUserInformation, getMessages, getUserInformationForMatch, getUserInformationForMatchFilter, registerChat, registerMatch } from '../controllers/usersController.js';
import { validateAccpetMatch, validateRegisterMatch, validateChat } from '../middlewares/userValidations.js';
export const usersRouter = express.Router();

usersRouter.get("/getloggeduserinformation", verifyToken, getLoggedUserInformation);
usersRouter.get("/getUserinformationformatch", verifyToken, getUserInformationForMatch);
usersRouter.post("/getUserinformationformatchfilter", verifyToken, getUserInformationForMatchFilter);
usersRouter.post("/registermatch", validateRegisterMatch, verifyToken, registerMatch);
usersRouter.put("/acceptmatch", validateAccpetMatch, verifyToken, acceptMatch);
usersRouter.get("/getchatslist", verifyToken, getChatsList);
usersRouter.post("/registerchat", validateChat, verifyToken, registerChat);
usersRouter.get("/getmessages/:idMatch", verifyToken, getMessages);