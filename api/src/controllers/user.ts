import { Request, Response, NextFunction } from "express"
import { sendMail } from "../mailer"
import { createFavorite, findAllRequests, findRequest, getAllFavorites, getAllTickets, updateUserRole, destroyFavorite, getTicketById, resetUserPassword, getUserInformation,getFavoriteById} from "../utils/user"
import { getUserById } from "../utils/users"


export const getFavorites = async (req: Request,res: Response,next:NextFunction) =>{
    try{
        const {user} = req.body 
        const favorites = await getAllFavorites(user.id)

        if(!favorites.length) next({status: 404, message: `Events not found`})
        else res.status(200).json(favorites)

    }catch(error){
        next(error)
    }
}

export const postFavorite = async (req: Request,res: Response,next:NextFunction) =>{
    try{
        const {user} = req.body
        const eventId = req.params.eventId as string

        const favorite = await createFavorite(user.id, eventId)
        
         res.status(201).json(favorite)
    }catch(error){
        next(error)
    }
}

export const deleteFavorite = async (req: Request,res: Response,next:NextFunction) =>{
    try{
        const {user} = req.body
        const {eventId} = req.params

        const favorite = await destroyFavorite(user.id, eventId)
        
         res.status(200).json(favorite)
    }catch(error){
        next(error)
    }
}

export const getTickets = async (req: Request,res: Response,next:NextFunction) =>{
    try{
        const {user} = req.body
        const tickets = await getAllTickets(user.id)
        
        if(!tickets.length) next({status: 404, message: "Tickets not Found"})
        else res.status(201).json(tickets)
        
    }catch(error){
        next(error)
    }
}

export const putUserRole = async (req: Request,res: Response,next:NextFunction) =>{
    try{
        const {userId, roleId} = req.body
        
        const user = await updateUserRole(userId, roleId)

        res.status(201).json(user)
    }catch(error){
        next(error)
    }
}

export const getTicket = async (req: Request,res: Response,next:NextFunction) =>{
    try{
        const {user} = req.body
        const {ticketId} = req.params
        
        const ticket = await getTicketById(ticketId, user.id)

        if(!ticket)next({status:404, message: "Ticket not found"})
        else res.status(200).json(ticket)
    }catch(error){
        next(error)
    }
}

export const resetPassword = async (req: Request,res: Response,next:NextFunction) =>{
    try{
        const {userId}= req.body
        const user : any = await getUserById(userId)
        if (!user) next({status: 404, message: "User not found"})
        const newPassword = await resetUserPassword(userId)
        const mailOptions = {
            to: user.email,
            subject: 'Reseteo de contraseña',
            text: `Su contraseña ha sido reseteada a ${newPassword}\nPor favor, cambie su contraseña cuando inicie sesion`
          }

        await sendMail(mailOptions)
        res.send({message: 'Se ha enviado un email con la nueva contraseña'})
    }catch(error){
        next(error)
    }
}

export const getUserProfile = async (req: Request,res: Response,next:NextFunction) =>{
    try{
        const {user}= req.body
        
        const userProfile = await getUserInformation(user.id)

        res.status(200).json(userProfile)
    }catch(error){
        next(error)
    }
}

export const getFavorite = async (req: Request,res: Response,next:NextFunction) =>{
    try{

        const {user} = req.body
        const {eventId} = req.params

        console.log(user, eventId)

        const userFavorite = await getFavoriteById(user.id, eventId)

        res.status(200).json(userFavorite)
    }catch(error){
        next(error)
    }
}

export const getRequests = async (req: Request,res: Response,next:NextFunction) =>{
    try{
        const {user, paginate} = req.body

        const requests = await findAllRequests(user.id, paginate)
        if(!requests.rows.length) next({status:404, message: "Requests not found"})
        else res.status(200).json(requests)
    }catch(error){
        next(error)
    }
}

export const getRequest = async (req: Request,res: Response,next:NextFunction) =>{
    try{
        const {user} = req.body
        const {id} = req.params

        const request = await findRequest(user.id, id)
        if(!request) next({status:404, message: "Request not found"})
        else res.status(200).json(request)
    }catch(error){
        next(error)
    }
}