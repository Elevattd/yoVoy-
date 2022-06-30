import { sequelize } from "../db";

const { Organization } = sequelize.models

export const getAllOrganizations = async (paginate: any) => {
    let options: any = {}
    if(paginate){
        options.limit = paginate.limit
        options.offset = paginate.offset
    }
    const organizations = await Organization.findAndCountAll(options)

    return organizations
}