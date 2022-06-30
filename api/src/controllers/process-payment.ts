import { Request, Response, NextFunction } from "express"
import { createPreference, updatePaymentById } from "../utils/process-payment"
import utils from "../utils/event"
import { createTickets, destroyTickets } from "../utils/tickets"
import config from "../../config"

export const process_payment = (req: Request,res: Response,next:NextFunction) => {
    try{
        const {user,list} = req.body

        Promise.all(list.map((item:any) => utils.getEventByDate(item.dateId)))
        .then((data) => {
            data = data.map((item: any, i: number) => {
                    const total_tickets = item.getDataValue("locations_m")[0].getDataValue("dates")[0].getDataValue("total_tickets")
                    const tickets_sold = item.getDataValue("locations_m")[0].getDataValue("dates")[0].getDataValue("tickets_sold")
                    
                    if(total_tickets === tickets_sold) throw {status: 400, message: "All tickets are sold"}
                    if(total_tickets < tickets_sold + list[i].quantity) throw {status: 400, message: "Can't buy more tickets than tickets left"}
                return {
                        id: String(item.getDataValue("id")),
                        title: item.getDataValue("name"),
                        currency_id: "ARS",
                        picture_url: item.getDataValue("background_image"),
                        description: item.getDataValue("description").slice(0,250) + "...",
                        category_id: "art",
                        quantity: list[i].quantity,
                        date: item.getDataValue("locations_m")[0].getDataValue("dates")[0].getDataValue("date"),
                        dateId: item.getDataValue("locations_m")[0].getDataValue("dates")[0].getDataValue("id"),
                        location: item.getDataValue("locations_m")[0].getDataValue("location").getDataValue("name"),
                        unit_price: item.getDataValue("locations_m")[0].getDataValue("dates")[0].getDataValue("price") 
                }
            })

            createPreference(data,user)
            .then((preference: any) => {
                createTickets(preference.body.id, data, user)
                res.status(200).json(preference.body.sandbox_init_point)
            })
        }).catch(error => {
            next(error)
        })

    }catch(error){
        next(error)
    }
}

export const updatePayment = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const preference_id = req.query.preference_id as string
        const payment_id = req.query.payment_id as string

        if(payment_id === "null"){
            await destroyTickets(preference_id)
            res.redirect(`${config.FRONT_HOST}`)
        }else{

            
            let status = await updatePaymentById(preference_id, payment_id)
            
            res.redirect(`${config.FRONT_HOST}/checkout/${status}`)
        }
    }catch(error:any){
        next(error)
    }
} 
