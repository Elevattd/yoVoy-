import { Request, Response, NextFunction } from "express"
import { getUsersFromDb, getUserById, banUser, updateUser, getUserFromDbByField, getBannedUsersFromDb } from "../utils/users"

export const getUsers = (req: Request,res: Response,next:NextFunction) => {
  let name = req.query.name as string
  let email = req.query.email as string
  const order = req.query.order as string

  getUsersFromDb(email, name, req.body.paginate, order).then(users => res.send(users)).catch(error => next(error))

}
export const getUser = async (req: Request,res: Response,next:NextFunction) => {
  try{
    const {id} = req.params
    const user = await getUserById(id)

    if(!user) next({status: 404, message: "User not found"})
    else res.status(200).json(user)

  }catch(error){
    next(error)
  }
}
export const createUser = (req: Request,res: Response,next:NextFunction) => {

}
export const deleteUser = async (req: Request,res: Response,next:NextFunction) => {
  try{
    let {id} = req.params
    const {email} = req.body
    const {unban} = req.query
    let user : any;
    if (unban){
      user = await getUserFromDbByField('email',email) as any
      if(!user) next({status: 404, message: "User not found"})
      id = user.id
      user = await banUser(id,false) 
    } 
    else user = await banUser(id)
    
    if(!user) next({status: 404, message: "User not found"})
    else res.status(200).json(`User ${unban ? 'unbanned' : 'banned'} succesfully`)
    
  }catch(error){
    next(error)
  }
}

export const putUser = async (req: Request,res: Response,next:NextFunction) => {
  try{
    const {id} = req.params

    const user = await updateUser(id, req.body)

    res.status(200).json(user)
  }catch(error){
    next(error)
  }
}

export const getBanned = async (req: Request,res: Response,next:NextFunction) => {
    let email = req.query.email as string
  try{
    const users = await getBannedUsersFromDb(req.body.paginate, email)
    if (!users) next({status: 404, message: "Users not found"})
    else res.status(200).json(users)
  }catch(error){
    next(error)
  }
}


