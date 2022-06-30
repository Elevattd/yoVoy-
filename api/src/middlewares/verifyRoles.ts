import {Request, Response, NextFunction} from 'express'

export const verifyRoles = (...allowedRoles : number[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    if (!req.body.rolesId) return next({status:401 , message:'Unauthorized'});
    const rolesArray : number[] = [...allowedRoles];
    const userRoles = req.body.rolesId
    console.log(rolesArray)
    console.log(req.body.rolesId)
    const result = userRoles.map((role : number) => rolesArray.includes(role)).find((val : boolean) => val === true);
    if (!result) return next({status:401 , message:'Unathorized'});
    next();
  }
}