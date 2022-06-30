import { sequelize } from "../db"

const { Location, City } = sequelize.models

export const getAllLocations = async (paginate:any) => {
    let options : any = {
        attributes:["id","name","address"],
        include:{
            model: City,
            attributes:["id","name"]
        }
    }

    if(paginate){
        options.limit = paginate.limit
        options.offset = paginate.offset
    }
    const locations = await Location.findAndCountAll(options)

    return locations
}


export const getAllLocationsByCity = async (id: number) => {
    const locations = await Location.findAndCountAll({
        where:{
            cityId: id
        },
        attributes:["id","name","address"],
        include:{
            model: City,
            attributes:["id","name"]
        }
    })

    return locations
}