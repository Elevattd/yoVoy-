import { sequelize } from '../db'
const { Comment } = sequelize.models

export const createComment = async (id: string | number, user: any,text: string) => {
    const comment = await Comment.create({eventId: id, userId: user.id, text})

    return comment
}