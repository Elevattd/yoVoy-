import { Response, Request, NextFunction } from "express";
import { getAllTickets } from "../utils/tickets"

export const getTickets = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const status = req.query.status as string
        const name = req.query.name as string
        const tickets = await getAllTickets(status, name, req.body.paginate)
        
        if(!tickets.rows.length) next({status: 404, message: "Tickets not found"})
        else res.status(200).json(tickets)

    }catch(error){
        next(error)
    }

}
