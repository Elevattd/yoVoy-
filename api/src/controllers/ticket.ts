import { Response, Request, NextFunction } from "express";
import { getTicketFromDb} from "../utils/ticket"

export const getTicket = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {id} = req.params
        const ticket = await getTicketFromDb(id)

        if(!ticket) next({status: 404, message: "Ticket not found"})
        else res.status(200).json(ticket)
        
    }catch(error){
        next(error)
    }
} 
