import { sequelize } from "../db"

const { Location, City } = sequelize.models

export const findLocation = async(id: string | number) => {
    const location = await Location.findByPk(id,{
        include:{
            model: City,
            attributes: ["id", "name"]
        }
    })

    return location
}

export const createLocation = async({name, latitude, longitude, address, cityId}:any) => {
    const location = await Location.create({name, latitude, longitude, address, cityId})

    return location
}

export const updateLocation = async(id:string| number, {updateLocation}:any) => {
    await Location.update({name: updateLocation.name, address: updateLocation.address,longitude: updateLocation.longitude , latitude: updateLocation.latitude, cityId: updateLocation.cityId}, {where: {id}})
}