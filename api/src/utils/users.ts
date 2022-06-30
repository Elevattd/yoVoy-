import { sequelize} from '../db'
import { iUser } from '../types/user';
import { ROLES_LIST } from '../authorization/roles';
import {Model} from 'sequelize-typescript'
import { Op } from 'sequelize';
import { banOrganization } from './organization';
const { User, Role, UserRole, Organization, Event } = sequelize.models


// create new user in the database
export async function createUserInDb(user: iUser) {
  const {name, password, email} = user
  try{
    const newUser = await User.create({name, password, email})
    let id : number = newUser?.getDataValue('id')
    UserRole.create({userId: id, roleId: ROLES_LIST.User})
  }catch(error) {throw error}
}

//return every user in the database
export async function getUsersFromDb(email: string, name: string, paginate:any, order?: string, banned?: boolean) {
    let options: any= {
      include: {
        model: Role,
        attributes:['name'],
        through:{
          attributes:[]
        }
      },
      where:{status:"active"},
      distinct: true
    }
    if(paginate) {
      options.limit =paginate.limit
      options.offset = paginate.offset
    }
    if(email) options.where.email = { [Op.iLike]: `%${email}%` }
    if(name) options.where.name = { [Op.iLike]: `%${name}%` }

    const users = await User.findAndCountAll(options)
    if(order){
      users.rows.sort((a:any, b:any) => {
        if(a.name < b.name) {
          return -1
        }
        if(a.name > b.name) {
          return 1
        }
        return 0
      })
      if(order === 'ZA') {
        users.rows.reverse()
      }
    }
    return users;
}

export async function getUserFromDbByField(field: string, value: string) {
    const user = await User.findOne({
      where: {
        [field]:value
      },
      include: {
        model: Role,
        attributes:['id'],
        through:{
          attributes:[]
        }
      }
    })
    if (!user) return null;
    let username : string= user?.getDataValue('name');
    let password : string= user?.getDataValue('password');
    let email : string= user?.getDataValue('email');
    let refreshToken : string = user?.getDataValue('refreshToken');
    let rolesId : []= user?.getDataValue('roles').map((r : Model<any,any>) => r.getDataValue('id'))
    let id : number = user?.getDataValue("id");
    let organizationId: number = user?.getDataValue("organizationId")
    let status: string = user?.getDataValue("status")
     return {name: username, password, email, refreshToken, rolesId, id, organizationId, status};
}

export async function giveRoleToUser(user: iUser, role: number){

}

export async function getUserById(id: string | number) {
  const user = await User.findByPk(id, {
    include: {
      model: Role,
      through:{
        attributes: []
      }
    }
  })

  return user
}

export async function banUser(id: string | number, ban : boolean = true) {
  const user = await User.findByPk(id)

  if(!user) return 0
  const organizationId = user.getDataValue("organizationId")
  
  if(ban){
    user.update({status: "banned"})
  
    if(organizationId) banOrganization(organizationId)
  }else{
    user.update({status: "active"})
    if(organizationId) banOrganization(organizationId, false)
  }

  return 1
}


export async function updateUser(id: string | number, { updateUser }:any ){
  const user = await User.update({name: updateUser.name, email: updateUser.email},{
    where:{
      id: id
    }
  })
  
  return user
}

export const getBannedUsersFromDb = async (paginate : any, email?: any) => {
    let options: any= {
      include: {
        model: Role,
        attributes:['name'],
        through:{
          attributes:[]
        }
      },
      where:{status:"banned"},
      distinct: true
    }
    if(paginate) {
      options.limit = paginate.limit
      options.offset = paginate.offset
    }
    if(email) options.where.email = { [Op.iLike]: `%${email}%` }

  return await User.findAndCountAll(options)
}