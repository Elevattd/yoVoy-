import { Request, Response, NextFunction } from "express"
import { getCitiesFromDb } from '../utils/cities'

export const getCities = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const cities = await getCitiesFromDb(req.body.paginate);

        if(!cities.rows.length) next({status:404, message: "Cities not found"})
        else res.status(200).send(cities)
        
    } catch (error) {
       next(error)
    }

}