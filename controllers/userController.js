import { users, matches, loggedUser } from "../data/usersData.js";
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
    try {
        resp.status(200).send({
            title: "Login exitoso",
            token: "eyweewirniewnfkdsnfjkdsnf.smfkesnfioenwfionewif.sdfisnjfbesuif",
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
        //Colocamos quemado el núemero 1, porque vamos a suponer que está logueado con una sesión de JWT
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