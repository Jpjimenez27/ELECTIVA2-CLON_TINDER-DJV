import swaggerAutogen from "swagger-autogen";

const outputFile = './swagger.json';
const endPointsFiles = ['./index.js'];

const doc = {
    info: {
        title: 'API de Tinder',
        description: 'Esta API permite registrarse, realizar inicio de sesión, consultar datos y realizar match entre usuarios'
    },
    host: 'localhost:3000',
    schemes: ['http']
}

swaggerAutogen()(outputFile, endPointsFiles, doc);