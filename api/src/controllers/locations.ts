import { Request, Response, NextFunction } from "express";
import { getAllLocations, getAllLocationsByCity } from "../utils/locations";

export const getLocations = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {city} = req.query
        let locations
        
        if(city) locations = await getAllLocationsByCity(Number(city))
        else locations = await getAllLocations(req.body.paginate)
        
        if(!locations.rows.length) next({status:404, message: "Locations not found"})
        else res.status(200).json(locations)

    }catch(error){
        next(error)
    }
}