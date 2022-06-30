import { sequelize } from '../db'
import { Op } from "sequelize";
const { Event, Organization, Date, Category, Location } = sequelize.models
import utils from './event'
import makeDate, { dateParse, getNextDaysByMount, isTheNextDaysChecker } from './makeDate';

const attributes = ["id", "name", "background_image", "description"]

//trae todos los eventos de la base de datos
export async function getEventsFromDb(paginate: any) {
    let options: any = { attributes: attributes, where:{status:"active"} }
    if(paginate){
        options.limit = paginate.limit,
        options.offset = paginate.offset
    }
    const events = await Event.findAndCountAll(options)
    return events
}

//trae los eventos de la base de datos que conincidan con la busqueda del searchBar.
export async function getEventsFromDbBySearch(search: string, paginate: any) {
    let options: any =  {
        attributes: attributes,
        where: {
            status: "active",
            name: {
                [Op.iLike]: `%${search}%`
            }
        }
    }

    if(paginate){
        options.limit = paginate.limit,
        options.offset = paginate.offset
    }
    const eventsSearched = await Event.findAndCountAll(options)

    return eventsSearched
}

//trae los eventos correspondiente a una fecha, recibe la fecha a buscar y un array con ids de eventos
//para poder buscar los eventos uno por uno y chequear si pertenecen a la fecha.
export async function getEventsFromDbByDate(date: string, EventsIds:any) {
    let eventsByDate: any = [], i = 0;
    while (i < EventsIds.length) { 
        let event: any = await utils.getEventById(EventsIds[i])
        event.locations?.forEach((location: any) => {
            location.dates.forEach((d: any) => {
                if (makeDate(d.date) === makeDate(date)) {
                    eventsByDate.push(event)
                }
            })
        })
        i++
    }
    return eventsByDate
}

//trae los eventos si se encuentran dentro de los siguientes dias indicados, recibe los siguientes dias y un array con ids de eventos
//para poder buscar los eventos uno por uno y chequear si pertenecen en los siguienten dias indicados.
export async function getEventsFromDbByNextDate(nextDays: number, EventsIds:any) {
    let eventsByDate: any = []
    for (let i = 0 ; i< EventsIds.length; i++) { 
        let event: any = await utils.getEventById(EventsIds[i])
        event.locations?.forEach((location: any) => {
            location.dates.forEach((d: any) => {
                if (isTheNextDaysChecker(nextDays, d.date)) {
                    eventsByDate.push(event)
                }
            })
        })
    }
    let auxSet = new Set(eventsByDate)
    let resultEvents = Array.from(auxSet)
    return resultEvents
}

//trae los eventos filtrados por categoria y locacion.
export async function getEventsFromDbByFilter(paginate: any, category?: string, location?: string, organization?: string, city?: string, date?: string, nextDays?:string, search?:string):Promise<any> {
    let options: any = { include: [], where:{status:"active"} }

    if(search){
        options.where.name = {
          [Op.iLike]: `%${search}%`        
        }
    }

    if (organization) {
        options.include.push({
            model: Organization,
            where: { id: organization },
            attributes: []
        })
    }
    if (city) {
        options.include.push({
            model: Location,
            where: { cityId: city },
            attributes: []
        })
    }
    if (category) {
        options.include.push({
            model: Category,
            where: { id: category },
            attributes: []
        })
    }
    if (location && !city) {
        options.include.push({
            model: Location,
            where: { id: location },
            attributes: []
        })
    }
    if(paginate && !nextDays && !date){
        options.limit = paginate.limit,
        options.offset = paginate.offset
    }

    options.attributes = attributes
    const events = await Event.findAndCountAll(options)

    let eventsByDate;

    if (date) {
        const EventsIds: any = []
        events.rows.forEach((e: any) => { EventsIds.push(e.id) })
        eventsByDate = await getEventsFromDbByDate(date, EventsIds)

        return {count:eventsByDate.length, rows: eventsByDate.splice(paginate.offset, paginate.limit)}
    }else if (nextDays) {
        const EventsIds: any = []
        events.rows.forEach((e: any) => { EventsIds.push(e.id) })
        eventsByDate = await getEventsFromDbByNextDate(Number(nextDays), EventsIds)
        return {count:eventsByDate.length, rows: eventsByDate.splice(paginate.offset, paginate.limit)}
    }

    return events
}
