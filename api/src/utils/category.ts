import { sequelize } from "../db";

const {Category, EventCategory} = sequelize.models


export const createCategory = async (name:string) => {
    const category = await Category.create({name: name})

    return category
}

export const findCategory = async (id:string | number) => {
    const category = await Category.findByPk(id)

    return category
}

export const destroyCategory = async (id:string | number) => {
    await EventCategory.destroy({where:{categoryId: id}})

    const category = await Category.destroy({where:{id}})
    
    return category
}

export const updateCategory = async (id:string | number,name:string) => {
    const category = await Category.update({name},{where:{id}})

    return category
}