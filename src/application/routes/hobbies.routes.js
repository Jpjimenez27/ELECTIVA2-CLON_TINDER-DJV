import express from 'express'
import { getHobbies } from '../controllers/hobbiesController.js';

export const hobbiesRouter = express.Router();

hobbiesRouter.get("/gethobbies", getHobbies);