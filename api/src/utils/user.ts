import { sequelize } from "../db";
import { Op } from "sequelize"
import bcrypt from "bcrypt"

const { User, Event, Favorites, Ticket, UserRole, Organization, Request } = sequelize.models

export const getAllFavorites = async (id: string | number) => {
    const favorites = await Event.findAll({
        attributes: ["id", "background_image", "name",],
        include: {
            model: User,
            attributes: [],
            where: {
                id: id
            }
        }
    })

    return favorites
}

export const createFavorite = async (id: string | number, eventId: string) => {
    const favorite = await Favorites.create({ userId: id, eventId })

    return favorite
}

export const destroyFavorite = async (id: string | number, eventId: string) => {
    const favorite = await Favorites.destroy({
        where: {
            userId: id,
            eventId
        }
    })

    return favorite
}

export const getAllTickets = async (id: string | number) => {
    const tickets = await Ticket.findAll({
        attributes: ["paymentId", "status", "status_detail", "paymentType", "transaction_amount", "quantity", "createdAt"],
        where: {
            userId: id
        },
        include: {
            model: Event,
            attributes: ["id", "name"]
        }
    })

    return tickets
}

export const updateUserRole = async (userId: string | number, roleId: string | number) => {
    await UserRole.destroy({
        where: {
            userId,
            roleId: {
                [Op.or]: [3030, 2020]
            }
        }
    })

    if (roleId == 1010) return "Role eliminated succesfully"

    let bulk = [{ userId, roleId }]

    if (roleId == 3030) {
        const haveOrganizationRole = await UserRole.count({
            where: {
                userId,
                roleId: 2020
            }
        })

        if (!haveOrganizationRole) bulk.push({ userId, roleId: 2020 })
    }

    const roles = await UserRole.bulkCreate(bulk)

    return roles
}

export const getTicketById = async (ticketId: string | number, userId: string | number) => {
    const ticket = await Ticket.findOne({

        where: {
            id: ticketId,
            userId
        },
        attributes: ["id", "status", "status_detail", "paymentType", "transaction_amount", "quantity"],
        include: {
            model: Event,
            attributes: ["id", "name"]
        }
    })

    return ticket
}

export const resetUserPassword = async (id: string | number) => {
    let newPassword = ""

    const length = 8
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

    for (var i = 0, n = charset.length; i < length; ++i) {
        newPassword += charset.charAt(Math.floor(Math.random() * n));
    }

    const password = await bcrypt.hash(newPassword, 10)
    await User.update({password}, {where:{id}})
    return newPassword
}

export const updateUserPassword = async(id: string | number, password: string) => {
  await User.update({password}, {where:{id}})
}

export const getUserInformation = async(id: string | number) => {
    const user = await User.findByPk(id, {
        attributes: ["name","email"],
        include: {
            model: Organization,
        }
    })

    return user
}

export const getFavoriteById = async (id: string | number, eventId: string) => {
    const favorite = await Favorites.findAll({
        where: {
            userId: id,
            eventId
        }
    })
    return favorite
}

export const findAllRequests = async (userId: string | number, paginate:any ) => {
    let options:any = {
        attributes: ["id", "type", "method", "status"],
        where:{userId}
    }

    if(paginate){
        options.limit = paginate.limit
        options.offset = paginate.offset
    }

    const requests = await Request.findAndCountAll(options)

    return requests
}

export const findRequest = async (userId: string | number, id: string | number) => {
    const request = await Request.findOne({
        attributes: ["id", "type", "method", "status"],
        where:{
            userId,
            id
        }
    })
    return request
}
