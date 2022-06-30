import { sequelize } from "../db";
import { iEvent } from "../types/event";
import { Model } from "sequelize-typescript";

const {Event, Category, Date, Location, Organization, EventLocation, City, EventCategory} = sequelize.models


export default {

    getEventById: async (id: string): Promise<iEvent | null> => {
        const event = await Event.findOne({
            where:{
                status: "active",
                id
            },
            attributes: ["id", "name", "description", "background_image"],
            include: [
                {     
                    model: Organization,
                    attributes: ["id", "name"],
                    where:{
                        status: "active"
                    }
                },
                {
                    model: Location,
                    attributes: ["id", "name", "address", "latitude", "longitude"],
                    include: [
                        {
                            model: City,
                            attributes: ["id","name"]
                        },
                        {
                            model: EventLocation,
                            attributes: ["id"],
                            where:{
                                eventId: id
                            },
                            include: [
                                {
                                model: Date,
                                attributes:["id", "date", "price", "total_tickets", "tickets_sold"]
                                }
                        ]   
                        }
                    ],
                    through: {
                        attributes: []
                    }
                },
                {
                    model: Category,
                    attributes: ["id","name"],
                    through: {
                        attributes: []
                    }
                }
            ]
        })
        if(!event) return null
        return {
            id: event?.getDataValue("id"),
            name: event?.getDataValue("name"),
            background_image: event?.getDataValue("background_image"),
            description: event?.getDataValue("description"),
            locations: event?.getDataValue("locations").map((location: Model<any>) => {
                return {
                    id: location.getDataValue("id"),
                    name: location.getDataValue("name"),
                    address: location.getDataValue("address"),
                    latitude: location.getDataValue("latitude"),
                    longitude: location.getDataValue("longitude"),
                    city: {
                        id: location.getDataValue("city").getDataValue("id"),
                        name: location.getDataValue("city").getDataValue("name")
                    },
                    dates: location.getDataValue("events_dates")[0]
                    .getDataValue("dates").map((date: Model<any>) => {
                            return {
                                id: date.getDataValue("id"),
                                price: date.getDataValue("price"),
                                date: date.getDataValue("date"),
                                total_tickets: date.getDataValue("total_tickets"),
                                tickets_sold: date.getDataValue("tickets_sold")
                            }
                        })
                    ,
                    
                }
            }),
            organization: {
                id: event?.getDataValue("organization")?.getDataValue("id"),
                name: event?.getDataValue("organization")?.getDataValue("name"),
            },
            categories: event?.getDataValue("categories").map((category: Model<any>) => {
                return {
                    id: category.getDataValue("id"),
                    name: category.getDataValue("name")
                }
            })
        }
    },
    
    createEvent: async ({
        name,
        description,
        background_image,
        categories,
        locations,
        user
    }: any) => {
        let event = await Event.create({name, description, background_image, organizationId: user.organizationId})
        let eventId = event.getDataValue("id")
        categories.forEach(async (id:number) => {
            EventCategory.create({eventId, categoryId: id})
        });

        locations.forEach(async (location: any) => {
            let eventLocation = await EventLocation.create({eventId, locationId: location.id})
            let eventLocationId = eventLocation.getDataValue("id")

            location.dates.forEach((date:any) => {
                Date.create({...date, eventLocationId})
            })
        })
        
        return event
    },

    destroyEvent: async ({id}: any) => {
        let event = await Event.findOne({
            where: {id: id},
            attributes: ["id"],
            include: [
                {
                    model: EventLocation,
                    include: [
                        {
                            model: Date,
                            attributes: ["id"]
                        }
                    ]
                }
            ]
        })

        event?.getDataValue("locations_m").forEach((l: Model<any>) => {
            l.getDataValue("dates").forEach(async (d: Model<any>) => {
                await Date.destroy({where:{id: d.getDataValue("id")}})
            })
        })

        event?.destroy()

    },

    updateEvent: async ({
        id,
        name,
        background_image,
        description,
        categories,
        locations
    }: any) => {

        const event = await Event.update(
            {
            name, 
            background_image, 
            description
            }, {
            where: {
                id: id
            }
            })

        await EventCategory.destroy({
            where: {
                eventId: id
            }
        })

        categories.forEach((category:number) => {
            EventCategory.create({eventId: id, categoryId: category})
        })

        const eventsLocations = await EventLocation.findAll({
            where:{
                eventId:id
            }
        })

        for (let i = 0; i < eventsLocations.length; i++) {
            await Date.destroy({
                where:{
                    eventLocationId: eventsLocations[i].getDataValue("id")
                }
            })

            EventLocation.destroy({
                where:{
                    id: eventsLocations[i].getDataValue("id")
                }
            })
        }

        locations.forEach(async (location: any) => {
          let eventLocation = await EventLocation.create({eventId: id, locationId: location.id})

          location.dates.forEach((date:any) => {
                Date.create({price: date.price, date: date.date, eventLocationId: eventLocation.getDataValue("id")})
          })
        })

        return event
    },

    getEventByDate: (dateId:string) => {
        let event = Event.findOne({
            attributes: ["id","name","background_image", "description"],
            include:[
                {
                model: Organization,
                attributes: ["id","name"]
                },
                {
                    model:EventLocation,
                    attributes:["id"],
                    include:[
                        {
                        model: Date,
                        attributes:["id","price","date", "total_tickets", "tickets_sold"],
                        where:{
                            id: dateId
                        }
                        },
                        {
                            model: Location,
                            attributes: ["id", "name"],
                        }
                    ]
                }
            ]
        })

        return event 
    }
}