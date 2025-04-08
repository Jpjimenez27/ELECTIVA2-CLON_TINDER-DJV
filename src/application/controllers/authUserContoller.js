

export const getUsers = (req, resp) => {
    try {

        resp.status(200).send([{
            name: "juan",
            lastName: "perez"
        }]);
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

