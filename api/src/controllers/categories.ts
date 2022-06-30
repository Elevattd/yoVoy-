import { Request, Response, NextFunction } from "express"
import {getCategoriesFromDb} from '../utils/categories'

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
     const categories = await getCategoriesFromDb()

     if(!categories.rows.length) next({status:404, message:"Categories not found"})
     else res.status(200).json(categories)
     
    } catch (error) {
        next(error)
    }

}