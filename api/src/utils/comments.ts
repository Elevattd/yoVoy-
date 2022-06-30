import { sequelize } from '../db'
const {Comment, User} = sequelize.models

export const getAllCommentsByEvent = async (id: string | number) => {
    const comments = await Comment.findAll({
        where:{
            eventId: id
        },
        include:{
            model: User,
            attributes: ["id", "name"]
        }
    })

    return comments
}