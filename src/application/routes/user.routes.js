import express from 'express'
import {getUsers, registerUser } from "../controllers/authUserContoller.js";
import { validateRegisterUser } from '../middlewares/userValidations.js';
export const userRouter = express.Router();

userRouter.get("/users", getUsers);
userRouter.post("/registeruser",validateRegisterUser,registerUser);
// userRouter.post("/user",validateRegisterUser,registerUser);
// userRouter.post("/loginUser",validateLoginUser, loginUser);
// userRouter.get("/getMatches/:id",validateGetMatches, getMatches);
// userRouter.get("/availableUsers", availableUsers);
// userRouter.get("/getUserInformationByName/:name",validateGetUserInformationByName, getUserInformationByName);
// userRouter.post("/registerLikesAndDislikes",validateRegisterLikesAndDislikes, registerLikesAndDislikes);
export default userRouter;