import { Request, Response, NextFunction } from "express"
import { getEventsFromDb, getEventsFromDbBySearch, getEventsFromDbByFilter } from '../utils/events'

export const getEvents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const search = req.query.search as string
        const category = req.query.category as string
        const location = req.query.location as string
        const city = req.query.city as string
        const organization = req.query.organization as string
        const date = req.query.date as string
        const nextDays = req.query.nextDays as string
        let events;
        // if (search) events = await getEventsFromDbBySearch(search.trim(), req.body.paginate)
        if(category || location || organization || city || date || nextDays || search) events = await getEventsFromDbByFilter(req.body.paginate, category,location,organization, city, date, nextDays, search)
        else events = await getEventsFromDb(req.body.paginate)

        if(!events.rows.length) next({status: 404, message: `Event/s not found`})
        else res.status(200).json(events)

    } catch (error) {
        next(error)
    }

}