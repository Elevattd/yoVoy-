import { Request, Response, NextFunction } from "express"
import { getAllCommentsByEvent } from '../utils/comments'

export const getCommentsByEvent = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const {id} = req.params
        const comments = await getAllCommentsByEvent(id);

        if(!comments.length) next({status: 404, message:"Comments not found"})
        else res.status(200).send(comments)
        
    } catch (error) {
        next(error)
    }

}