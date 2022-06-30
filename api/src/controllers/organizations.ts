import { Request, Response, NextFunction } from "express"
import {getAllOrganizations} from '../utils/organizations'

export const getOrganizations = async (req: Request, res: Response, next: NextFunction) => {
    try {
     const organizations = await getAllOrganizations(req.body.paginate)

     if(!organizations.rows.length) next({status: 404, message: "Organizations not Found"})
     else res.status(200).json(organizations)

    } catch (error) {
        next(error)
    }
}