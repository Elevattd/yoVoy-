import { Request, Response, NextFunction } from "express"
import { createOrganization, getOrganizationById, destroyOrganization, updateOrganization, getAllEvents, banOrganization} from "../utils/organization"


export const postOrganization = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {name, cuit, phone_number, business_email, cbu, user} = req.body
        
        const organization = await createOrganization({name,cuit, phone_number, business_email ,cbu ,userId: user.id})

        res.status(201).json(organization)
    }catch(error){
        next(error)
    }
}

export const deleteOrganization = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const {id} = req.params

        const number = await banOrganization(id)

        if(!number) next({status:404, message: "Organization not found"})
        else res.status(200).json("Organization banned succesfully")
        
    }catch(error){
        next(error)
    }

}

export const getOrganization = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {id} = req.params

        const organization = await getOrganizationById(id)

        if(!organization) next({status: 404, message: "Organization not found"})
        else res.status(200).json(organization)

    }catch(error){
        next(error)
    }
}

export const putOrganization = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {id} = req.params

        const organization = await updateOrganization(id, req.body)

        res.status(200).json(organization)
    }catch(error){
        next(error)
    }
}

export const getEvents = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const {user} = req.body

        const events = await getAllEvents(user.organizationId)

        if(!events) next({status:404, message: "Events not found"})
        else res.status(200).json(events)
        
    }catch(error){
        next(error)
    }
}
