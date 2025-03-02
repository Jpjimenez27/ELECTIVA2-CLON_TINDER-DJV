import { validationResult } from "express-validator"


export const validateResult=(req,resp,next)=>{
    try {
        validationResult(req).throw()
        return next()
    } catch (error) {
        resp.status(422)
        resp.send({errors:error.array()});
    } 
}