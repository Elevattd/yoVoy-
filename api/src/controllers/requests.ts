import { Request, Response, NextFunction } from "express";
import { findAllRequests } from "../utils/requests";

export const getRequests = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const requests = await findAllRequests(req.body.paginate)

        if(!requests.rows.length) next({status:404, message: "Request not found"})
        else res.status(200).send(requests)
    }catch(error){
        next(error)
    }
}
