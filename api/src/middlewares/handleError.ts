import {Request, Response, NextFunction} from 'express'

interface error{
    status: number;
    message: string;
}

export const handleError = (err: error, req: Request, res: Response, next: NextFunction) => {
 // eslint-disable-line no-unused-vars
 const status = err.status || 500;
 const message = err.message || err;
 console.error(err);
 res.status(status).send(message);
};