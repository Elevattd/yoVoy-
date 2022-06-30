import { Request, Response, NextFunction } from "express";
import { findLocation, createLocation, updateLocation } from "../utils/location";

export const getLocation = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {id} = req.params
        
        const location = await findLocation(id)
        
        if(!location) next({status:404, message: "Location not found"})
        else res.status(200).json(location)

    }catch(error){
        next(error)
    }
}

export const postLocation = async (req: Request, res: Response, next: NextFunction) => {
    try{
        
        const location = await createLocation(req.body)
        
        res.status(201).json(location)

    }catch(error){
        next(error)
    }
}

export const putLocation = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {id} = req.params
        
        const location = await updateLocation(id, req.body)

        res.status(200).json(location)
    }catch(error){
        next(error)
    }
}

