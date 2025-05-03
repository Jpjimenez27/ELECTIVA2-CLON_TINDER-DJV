import { body, check, param } from 'express-validator'
import { validateResult } from '../../../helpers/validateHelper.js'

export const validateRegisterUser = [

    body("firstName").exists().notEmpty().isString().withMessage("Primer nombre es obligatorio"),
    body("lastName").exists().notEmpty().isString().withMessage("Primer apellido es obligatorio"),
    body("email").exists().notEmpty().isEmail().withMessage("Ingresar un email válido"),
    body("birthDate").exists().notEmpty().isString().withMessage("La fecha de nacimiento es obligatoria"),
    body("gender").exists().notEmpty().isString().withMessage("El género es obligatorio"),
    body("country").exists().notEmpty().isString().withMessage("El país es obligatorio"),
    body("city").exists().notEmpty().isString().withMessage("La ciudad es obligatoria"),
    body("height").exists().notEmpty().isNumeric().withMessage("La estatura es obligatoria"),
    body("password").exists().notEmpty().isString().isLength({ min: 8 }).withMessage("La contraseña con minimo 8 caracteres"),
    body("description").exists().notEmpty().isString().isLength({ min: 20, max: 250 }).withMessage("La descripción debe tener entre 20 y 250 caracteres"),
    body("hobbies").isArray({ min: 3 }).withMessage("Debe tener al menos 3 hobbies"),
    body("images").isArray({ min: 1, max: 5 }).withMessage("Debe tener entre 1 y 5 fotos"),

    (req, res, next) => {
        validateResult(req, res, next);
    }
];

export const validateLogin = [
    body("email").exists().withMessage("El correo es obligatorio")
        .not().isEmpty().withMessage("El correo no puede estar vacío").isEmail().withMessage("El correo es invalido"),
    body("password").exists().withMessage("La contraseña es obligatoria").not().isEmpty().withMessage("La contraseña no puede estar vacia"),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

export const validateExistsUser = [
    body("email").exists().withMessage("El correo es obligatorio")
        .not().isEmpty().withMessage("El correo no puede estar vacío").isEmail().withMessage("El correo es invalido"),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

export const validateAccpetMatch = [
    body("userTo").exists().withMessage("El id es obligatorio")
        .not().isEmpty().withMessage("El id no puede estar vacío").isInt().withMessage("El id debe ser entero"),
    body("isMatch").exists().withMessage("iMatch es obligatorio").not().isEmpty().withMessage("isMatch no puede ir vacío").isBoolean().withMessage("debe ser un boolenao"),
    (req, res, next) => {
        validateResult(req, res, next)
    }

]

export const validateRegisterMatch = [
    body("userTo").exists().withMessage("El id es obligatorio")
        .not().isEmpty().withMessage("El id no puede estar vacío").isInt().withMessage("El id debe ser entero"),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

export const validateGetUserInformationByName = [
    param("email").exists().withMessage("El nombre es obligatorio")
        .not().isEmpty().isEmail().withMessage("El nombre no puede estar vacío"),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

export const validateChat = [
    body("idMatch").exists().withMessage("ID de match es obligatorio")
        .not().isEmpty().isInt().withMessage("El ID debe ser un número entero"),
    body("message").exists().withMessage("El mensaje es obligatorio"),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]