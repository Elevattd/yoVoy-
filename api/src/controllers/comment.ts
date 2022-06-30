import { Request, Response, NextFunction } from "express"
import { createComment } from '../utils/comment'

export const postComment = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const {id} = req.params
        const {text, user} = req.body
        const comment = await createComment(id, user, text);

        res.status(201).json(comment)
    } catch (error) {
        next(error)
    }

}