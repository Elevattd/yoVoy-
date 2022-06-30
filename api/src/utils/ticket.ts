import { sequelize } from "../db";

const { Ticket, Event, User } = sequelize.models

export const getTicketFromDb = async (id: string | number) => {
    const ticket = await Ticket.findByPk(id,{
        attributes: ["id", "status", "status_detail", "paymentType", "transaction_amount", "quantity"],
        include: [
            {
                model: Event,
                attributes: ["id", "name"]
            },
            {
                model: User,
                attributes: ["id", "name"]
            }
        ]
    })

    return ticket
}