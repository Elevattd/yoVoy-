require('dotenv').config()
import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken';
import { DecodedUserInfo } from '../types/utilsTypes';
import { getUserById } from '../utils/users';

// authenticate the token send by header on the request

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]
  const bearer = req.headers.authorization?.split(' ')[0]
  console.log(token)
  if (!token || bearer !== 'Bearer') return next({status:401, message:'You need a valid token to access this route'})
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, async (err, decoded) => {
    let user = decoded as any;
    if (err) return next({status:403, message:`You don't have access. Token no longer valid`})
    const userExists : any = await getUserById(user.UserInfo?.id);
    if (!userExists) return next({status: 400, message: `User does not exist`})
    if (userExists.status === "banned") return next({status:403, message:`You don't have access. You are banned`})
    req.body.user = user.UserInfo;
    req.body.rolesId = user.UserInfo.rolesId
    next();
  })
}