require('dotenv').config()
import  jwt from "jsonwebtoken";
import { User } from "../models/User";
import { iUser } from "../types/user";
import { DecodedUserInfo } from "../types/utilsTypes";

export function generateAccessToken(user: any){
  return jwt.sign({
    'UserInfo':{
      'name': user.name,
      'email': user.email,
      'rolesId':user.rolesId,
      "id": user.id,
      "status": user.status,
      "organizationId": user.organizationId
    }
  }, process.env.ACCESS_TOKEN_SECRET as string, {expiresIn: '10m'})
}

export async function updateRefreshToken(user: iUser, errase: boolean = false){
  let token;
  errase 
  ? token = '' 
  : token = jwt.sign(
        {'UserInfo': {
          'name': user.name,
          'email': user.email
        }},
        process.env.REFRESH_TOKEN_SECRET as string,
        {expiresIn: '1d'}
      )
  await User.update({refreshToken: token}, {where: {name: user.name}})
  return token;
}



export function verifyRefreshToken(user:iUser){
  const token = user.refreshToken as string;
  let newToken : string | {status: number, message: string}= ''
  jwt.verify(
    token,
    process.env.REFRESH_TOKEN_SECRET as string,
    (err, decoded) => {
    let decodedUserInfo = decoded as DecodedUserInfo
    if (err ||user.name !== decodedUserInfo.UserInfo.name)  newToken =({status:403, message:`You don't have access. Token no longer valid`})
    else newToken = generateAccessToken(user)
  }
  )
  return newToken;
}

export function decodeGoogleToken(token: string){
  return jwt.decode(token)
}