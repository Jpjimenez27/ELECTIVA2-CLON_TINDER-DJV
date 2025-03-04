import express from 'express'
import { availableUsers, getMatches, getUserInformationByName, getUsers, loginUser, registerLikesAndDislikes,registerUser } from "./../controllers/userController.js";
import { validateGetMatches, validateGetUserInformationByName, validateLoginUser, validateRegisterLikesAndDislikes,validateRegisterUser } from '../validators/userValidations.js';
export const userRouter = express.Router();

userRouter.get("/users", getUsers);
userRouter.post("/user",validateRegisterUser,registerUser);
userRouter.post("/loginUser",validateLoginUser, loginUser);
userRouter.get("/getMatches/:id",validateGetMatches, getMatches);
userRouter.get("/availableUsers", availableUsers);
userRouter.get("/getUserInformationByName/:name",validateGetUserInformationByName, getUserInformationByName);
userRouter.post("/registerLikesAndDislikes",validateRegisterLikesAndDislikes, registerLikesAndDislikes);
export default userRouter;