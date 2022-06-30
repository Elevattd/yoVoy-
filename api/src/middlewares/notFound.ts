import {Request, Response, NextFunction} from 'express'

export const notFound = (req: Request, res: Response, next: NextFunction) => {
 // eslint-disable-line no-unused-vars
  res.status(404).send(`Invalid Endpoint`)
};