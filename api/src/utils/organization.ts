import { sequelize } from "../db";
import { ROLES_LIST } from "../authorization/roles";

const {Organization, User, UserRole, Event} = sequelize.models



export const createOrganization = async ({name, phone_number, cbu, cuit, business_email, userId, alias}:any) => {
    const organization = await Organization.create({name,phone_number ,cbu, cuit, business_email, userId, alias})

    User.update({organizationId: organization.getDataValue("id")},
    {
        where: {
            id: userId
        }
    })

    UserRole.create({userId, roleId: ROLES_LIST.Organization})

    return organization
}

export const destroyOrganization = async (id: string | number) => {
    
    const user = await User.findOne({
        where:{
            organizationId: id
        }
    })

    await UserRole.destroy({where:{
        userId: user?.getDataValue("id"),
        roleId: ROLES_LIST.Organization
    }})

    await user?.update({organizationId: null})

    const number = await Organization.destroy({
        where: {
            id: id
        }
    })

    return number
}

export const banOrganization = async (id: string | number, ban: boolean = true) => {
    const organization = await Organization.findByPk(id)

    if(!organization) return null
    if(ban){
      organization.update({status: "banned"})
      Event.update({status: "inactive"}, {where:{organizationId: id}})
    }else{
      organization.update({status: "active"})
      Event.update({status: "active"}, {where:{organizationId: id}})
    }
    return 1
}

export const getOrganizationById = async (id: string | number) => {
    const organization = await Organization.findOne({
        where:{
            id:id
        }
    })

    return organization
}

export const updateOrganization = async (id: string | number, {updateOrganization}: any) => {
    const organization = await Organization.update({
        name: updateOrganization.name, 
        cbu: updateOrganization.cbu,
        phone_number: updateOrganization.phone_number,
        cuit: updateOrganization.cuit,
        business_email: updateOrganization.business_email,
        alias: updateOrganization.alias
    }, {
        where: {
            id: id
        }
    })

    return organization
}

export const getAllEvents = async (organizationId: string | number) => {
   const events = await Event.findAll({
    where:{
        organizationId
    }
   })

   return events
}