import { check, param } from 'express-validator'
import { validateResult } from '../helpers/validateHelper.js'

export const validateRegisterUser = [
    
    check("name").exists().notEmpty().isString().withMessage("Ingrese el nombre"),
    check("age").exists().not().isEmpty().isInt().withMessage("Ingresar la edad"),
    check("gender").exists().not().isEmpty().isString().withMessage("Ingresar su genero"),
    check("location").exists().not().isEmpty().isString().withMessage("Ingresar la ubicacion"),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]


export const validateLoginUser = [
    check("email").exists().not().isEmpty().isEmail().withMessage("Por favor, ingrese un email válido"),
    check("password").exists().not().isEmpty().withMessage("Por favor, ingrese una contraseña"),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]



export const validateGetMatches = [
    param("id").exists().withMessage("El ID es obligatorio")
        .not().isEmpty().withMessage("El ID no puede estar vacío")
        .isInt().withMessage("El ID debe ser un número entero"),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

export const validateGetUserInformationByName = [
    param("name").exists().withMessage("El nombre es obligatorio")
        .not().isEmpty().withMessage("El nombre no puede estar vacío"),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

export const validateRegisterLikesAndDislikes = [
    check("idUserFrom").exists().not().isEmpty().isInt().withMessage("El id del usuario debe ser un entero"),
    check("idUserTo").exists().not().isEmpty().isInt().withMessage("El id del usuario debe ser un entero"),
    check("like").exists().not().isEmpty().isBoolean().withMessage("El parametro debe ser un booleano"),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]




