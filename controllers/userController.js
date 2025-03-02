import { body } from "express-validator";
import { users, matches, loggedUser, } from "../data/usersData.js";
import pool from "../db.js";

export const getUsers = (req, resp) => {
    try {
        resp.status(200).send(users);
    } catch (error) {
        resp.status(500).send({
            title: "Error",
            description: "Error inesperado",
            type: "error"
        });
    }
};

export const getMatches = (req, resp) => {
    try {
        const { id } = req.params;
        const userMatches = matches.filter(x => (x.userFrom == id || x.userTo == id) && x.like == true);
        resp.status(200).send(userMatches);
    } catch (error) {
        resp.status(500).send({
            title: "Error",
            description: "Ha ocurrido un error inesperado",
            type: "error"
        });
    }
}

export const loginUser = async (req, resp) => {
    const {email, password} = req.body;
    try {
        resp.status(200).send({
            title: "Login exitoso",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNzA5MjM2MDAwLCJleHAiOjE3MDkyMzk2MDB9.R5J67nJhbb3YRjvgZ1vZT7zJFXCj_OuBBbdcbxDMEPM",
            type: "success"
        });
    } catch (error) {
        resp.status(500).send({
            title: "Error",
            description: "Ha ocurrido un error inesperado iniciando sesión",
            type: "error"
        });
    }
}

export const availableUsers = async (req, resp) => {
    try {
        const loggedUser = users.find(user => user.id === 1);
        const preferences = new Set(loggedUser.preferencias);
        const similarUsers = users.filter(user =>
            user.id !== loggedUser.id && user.preferencias.some(pref => preferences.has(pref))
        );
        resp.status(200).send(similarUsers);
    } catch (error) {
        resp.status(500).send({
            title: "Error",
            description: "Ha ocurrido un error inesperado",
            type: "error"
        });
    }
}

export const getUserInformationByName = async (req, resp) => {
    try {
        const { name } = req.params;
        const user = users.find(x => x.nombre == name);
        resp.status(200).send(user);
    } catch (error) {
        resp.status(500).send({
            title: "Error",
            description: "Ha ocurrido un error inesperado",
            type: "error"
        });
    }
}

export const registerLikesAndDislikes = async (req, resp) => {
    const {idUserFrom, idUserTo, like} = req.body;
    try {
        resp.status(201).send({
            title: "Registro exitoso",
            token: "Se ha registrado un swipe exitosmente",
            type: "success"
        });
    } catch (error) {
        resp.status(500).send({
            title: "Error",
            description: "Ha ocurrido un error inesperado",
            type: "error"
        });
    }
}

export const registerUser = async (req, resp) => {
    const {name, age, gender, location} = req.body;
    try {
        resp.status(201).send({
            title: "Registro exitoso",
            token: "Se ha registrado  exitosmente",
            type: "success"
        });
    } catch (error) {
        resp.status(500).send({
            title: "Error",
            description: "Ha ocurrido un error inesperado",
            type: "error"
        });
    }
}