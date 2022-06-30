import mercadopago from "mercadopago"
import { Model } from "sequelize"
import config from "../../config"
import { sequelize } from "../db"
import { sendMail } from "../mailer"

const { Ticket, User, Event } = sequelize.models

export const createPreference= (items:any, user: any) => {

    mercadopago.configure({
        access_token: config.ACCESS_TOKEN
    })

    const preference = mercadopago.preferences.create({
        payer:{
            name: user.name,
            surname: user.surname || "",
            email: user.email || "test@userTest.com",
            identification:{
                type: "DNI",
                number: user.DNI || "12345678"
            }
        },
        items,
        back_urls:{
            success: `${config.API_HOST}/api/process-payment/update`,
            failure: `${config.API_HOST}/api/process-payment/update`,
            pending: `${config.API_HOST}/api/process-payment/update`,
        }
    })

    return preference
}


export const updatePaymentById = async(preferenceId: string, paymentId: string) => {
    mercadopago.configure({
        access_token: config.ACCESS_TOKEN
    })

    const {body}  = await mercadopago.payment.findById(Number(paymentId))

    let tickets = await Ticket.findAll({
      include:[
        {
          model: User,
          attributes: ["email","name"]
        },
        {
          model: Event,
          attributes: ["name"]
        }
     ],
      where:{
        preferenceId
      }
    })
    let flag = false
    tickets.forEach(async (ticket: Model<any>)=> {


      ticket.update({status: body.status , status_detail: body.status_detail , paymentId , paymentType: body.payment_type_id})
    
      let mailOptions
      const userMail = ticket?.getDataValue("user").getDataValue("email")
      // approved, rejected, in_process, pending
      const mailTicket = {
        ticketId: ticket?.getDataValue("id"),
        eventName: ticket?.getDataValue('event').getDataValue('name'), 
        paymentId: ticket?.getDataValue('paymentId'),
        paymentType: ticket?.getDataValue('paymentType'),
        quantity: ticket?.getDataValue('quantity'),
        buyerName: ticket?.getDataValue('user').getDataValue('name'),
        date: ticket.getDataValue("date"),
        location: ticket.getDataValue("location")
      }
      let text: string;
      let confirmation_email = ticket.getDataValue("confirmation_email")

      if(!confirmation_email && !flag){
        switch(body.status){
          case 'approved':
            text = `Hola ${ticket?.getDataValue("user").getDataValue("name")}, tu pago ha sido aprobado. Dentro de unos minutos te estaremos enviando el ticket del evento.`
            break;
          case 'rejected':
            text = `Hola ${ticket?.getDataValue("user").getDataValue("name")}, tu pago ha sido rechazado. Por favor, intenta nuevamente en unos minutos.`
            break;
          case 'in_process':
            text = `Hola ${ticket?.getDataValue("user").getDataValue("name")}, tu pago está en proceso. Por favor, espera unos minutos y te llegará un mail con más información.`
            break;
          case 'pending':
            text = `Hola ${ticket?.getDataValue("user").getDataValue("name")}, tu pago está pendiente. Una vez realizado el pago en ${body.payment_method_id} recibiras tu entrada.`
            break;
          default:
            text = `Hola ${ticket?.getDataValue("user").getDataValue("name")}, tu pago ha sido procesado. Dentro de unos minutos te estaremos enviando el ticket del evento.`
        }
            
        mailOptions = {
          to: userMail,
          subject: 'Recibimos tu pago en YoVoy',
          text
        }
        sendMail(mailOptions)
        Ticket.update({confirmation_email: true}, {where:{preferenceId}})
        flag = true
      }
      let ticket_email = ticket.getDataValue("ticket_email")
      if (body.status === 'approved' && !ticket_email ){
        mailOptions = {
          to: userMail,
          subject: '¡Tu pago ha sido aprobado! Aqui esta tu ticket para el evento',
          text: `Hola ${ticket?.getDataValue("user").getDataValue("name")}, tu pago ha sido aprobado. Aqui esta tu ticket para el evento:
          Evento: ${mailTicket.eventName}
          Lugar: ${mailTicket.location}
          Fecha: ${mailTicket.date}
          Comprador: ${mailTicket.buyerName}
          Id de Ticket: ${mailTicket.ticketId}
          Id de pago: ${mailTicket.paymentId}
          Tipo de pago: ${mailTicket.paymentType}
          Cantidad: ${mailTicket.quantity}
          `
        }
        sendMail(mailOptions)
        ticket.update({ticket_email: true})
      }
    })
    return body.status
}