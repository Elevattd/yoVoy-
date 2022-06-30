import { Response, Request, NextFunction} from "express";
import utils from "../utils/event"


export const getEventById = async (req: Request, res: Response, next: NextFunction) => {
    try{

        const {id} = req.params
        
        const event = await utils.getEventById(id)
        
        if(!event) next({status:404, message: "Event not found"})
        else res.status(200).json(event)

    }catch(error){
        next(404)
    }
} 

export const postEvent = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const eventCreated = await utils.createEvent(req.body)

        res.status(201).json(eventCreated)
    }catch(error){
        next(error)
    }
}

export const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {id} = req.params 
        await utils.destroyEvent({id})

        res.status(200).json("An event was eliminated")
    }catch(error){
        next(error)
    }
}

export const putEvent = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {id} = req.params
        const eventUpdated = await utils.updateEvent({id, ...req.body})

        if(!eventUpdated[0]) next({status:404, message: "Event not Found"})
        else res.status(201).json("The event was updated")

    }catch(error){
        next(error)
    }
}

export const getEventByDate = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {id} = req.params

        const event = await utils.getEventByDate(id)
        
        if(!event) next({status: 404, message: "Event not found"})
        else res.status(200).json(event)
        
    }catch(error){
        next(error)
    }
}

