import { body } from "express-validator";
import pool from "../../../db.js";

export const getUsers = (req, resp) => {
    try {
        resp.status(200).send([{
            name:"pablito",
            lastName:"jimenez"
        }]);
    } catch (error) {
        resp.status(500).send({
            title: "Error",
            description: "Error inesperado",
            type: "error"
        });
    }
};

