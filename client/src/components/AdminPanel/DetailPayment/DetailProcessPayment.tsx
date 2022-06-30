import React from "react";
import { useParams } from "react-router-dom";
import { useGetTicketDetailQuery } from "../../../slices/app/ticketsApiSlice";
import SideBar from "../SideBar/SideBar";
import styleProcess from './detail-process-payment.module.css'

const DetailProessPayment = () => {
    const {id}: any = useParams();
    const{
        data: ticket
      } = useGetTicketDetailQuery(id)
    return (
        <div className={styleProcess.fondo}>
            <div>
                <SideBar/>
            </div>
                        <div className={styleProcess.component}>
                            <div className={styleProcess.envolment}>
                            <p >ID de compra: {ticket?.id}</p>
                            <p >ID de usuario: {ticket?.user.id}</p>
                            <p >Nombre de usuario: {ticket?.user.name}</p>
                            <span style={{textDecoration: 'solid'}}>Estado de compra: {ticket?.status}</span>
                            <p>Detalle de estado de compra: {ticket?.status_detail}</p>
                            <p >Monto de compra:  ${ticket?.transaction_amount}</p>
                            <p >Cantiidad de tickets: {ticket?.quantity}</p>
                            <p >Nombre de evento: {ticket?.event.name}</p>
                            <p >ID de evento: {ticket?.event.id}</p>
                            {/* <p >Tipo de pago: {ticket?.paymentType}</p> */}
                            </div>
                        </div>
                    
        </div>
    )
}

export default DetailProessPayment