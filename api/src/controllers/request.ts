import { Request, Response, NextFunction } from "express";
import { createRequest, updateRequest, findRequest } from "../utils/request";

export const postRequest = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {user, description, type, method, body } = req.body


        await createRequest(user.id, description, type, method, body)

        res.status(201).send("Request created successfully")
    }catch(error){
        next(error)
    }
}

export const putRequest = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {status} = req.body
        const {id} = req.params

        await updateRequest(id,status)

        res.status(200).send("Request updated successfully")
    }catch(error){
        next(error)
    }
}

export const getRequest = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {id} = req.params

        const request = await findRequest(id)

        if(!request) next({status:404, message: "Request not found"})
        else res.status(200).send(request)
    }catch(error){
        next(error)
    }
}
