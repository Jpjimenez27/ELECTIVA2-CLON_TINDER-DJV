import pool from "./../../infrastructure/databases/mySqlRepository.js";


export const getUsers = async (req, resp) => {
    try {
        const [rows] = await pool.query("select * from hobbies");
        resp.status(200).send(rows);
    } catch (error) {
        resp.status(500).send({
            title: "Error",
            description: "Error inesperado",
            type: "error"
        });
    }
};

export const registerUser = (req, resp) => {
    try {
        console.log(req.body);
        resp.status(200).send({
            name: "diego",
            lastName: "madrid"
        });
    } catch (error) {
        resp.status(500).send({
            title: "Error",
            description: "Error inesperado",
            type: "error"
        });
    }
};

