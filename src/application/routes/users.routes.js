import express from 'express'
import { verifyToken } from '../middlewares/tokenValidation.js';
import { getUserInformation } from '../controllers/usersController.js';
export const usersRouter = express.Router();

usersRouter.get("/getuserinformation", verifyToken, getUserInformation);