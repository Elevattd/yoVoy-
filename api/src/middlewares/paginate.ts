import {Request, Response, NextFunction} from 'express'

export const handlePaginate = (req: Request, res: Response, next: NextFunction) => {
    let limit: any = req.query.limit as string
    let offset: any = req.query.offset as string
    if(limit === undefined || offset === undefined) next()
    else{
        limit = Number(limit)
        offset = Number(offset)
        if(Number.isNaN(limit) || Number.isNaN(offset)) next()
        else{
            req.body.paginate = {limit, offset}
            next()
        }
    }
};