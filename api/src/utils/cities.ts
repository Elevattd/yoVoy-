import { sequelize } from '../db'
const {City} = sequelize.models

export async function getCitiesFromDb(paginate: any) {
    let options: any = {}
    if(paginate){
        options.limit = paginate.limit
        options.offset = paginate.offset
    }
    const cities = await City.findAndCountAll(options)
    return cities
}