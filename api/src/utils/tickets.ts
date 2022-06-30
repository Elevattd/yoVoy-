import { sequelize } from "../db";
import { Op } from "sequelize"
const { Ticket, User, Event, Date} = sequelize.models

export const getAllTickets = async (status: string, name:string, paginate:any) => {
    let options: any = {
        where:{},
        include: [{
        model: User,
        attributes: ["id", "name"],
        where: {}
    },{
        model: Event,
        attributes: ["id", "name"]
    }]
} 

    if(paginate){
        options.limit = paginate.limit
        options.offset = paginate.offset
    }
    if(status) options.where.status= status
    if(name) options.include[0].where.name = {[Op.iLike]: `${name}%`}

    const tickets = await Ticket.findAndCountAll(options)

    return tickets
}

export const createTickets = async(preferenceId: string, items: any, user: any) => {

    items.forEach(async (item: any) => {
        const date = await Date.findByPk(item.dateId)
        let tickets_sold = date?.getDataValue("tickets_sold")

        tickets_sold += item.quantity
        
        date?.update({tickets_sold})
        Ticket.create({
            preferenceId,
            status: "processing",
            transaction_amount: item.unit_price * item.quantity,
            quantity: item.quantity,
            userId: user.id,
            eventId: item.id,
            date: item.date,
            location: item.location
        })
    })
}

export const destroyTickets = async(preferenceId: string) =>{
    await Ticket.destroy({where:{preferenceId}})
}