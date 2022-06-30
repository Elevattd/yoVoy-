import React from "react";
import { Link } from "react-router-dom";
import { useGetTicketsDetailQuery } from "../../../slices/app/ticketsApiSlice";
import Loading from "../../Loading/Loading";
import SideBar from "../SideBar/SideBar";
import styleDetailPayment from './detail-paiment.module.css'

const DetailPayment = () => {
    const{
        data: datos,
        isFetching,
      } = useGetTicketsDetailQuery({_:''}, {refetchOnMountOrArgChange: true,})
    if(!datos) {
      return isFetching
        ? (
          <div className={styleDetailPayment.fondo}>
            <SideBar />
            <Loading />
          </div>
          )
        : 
        (
          <div className={styleDetailPayment.fondo}>
            <SideBar/>
            <div className={styleDetailPayment.text}>
              <h1 className={styleDetailPayment.text_style}><i> ¡UPS! No hay compras Realizadas</i></h1>
            </div>
          </div>
      )
    } else {
    return(
        <div className={styleDetailPayment.fondo}>
        <SideBar/>
        <div>
          <h1 style={{ textAlign: "center", color: 'white' }}>Detalles de compra</h1>
        </div>
      <table className={styleDetailPayment.table_payment}>
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>ID</th>
              <th style={{ textAlign: "center" }}>User</th>
              <th style={{ textAlign: "center" }}>Event</th>
              <th style={{ textAlign: "center" }}>Monto</th>
              <th style={{ textAlign: "center" }}>Cantidad</th>
              <th style={{ textAlign: "center" }}>Estado</th>
              <th style={{ textAlign: "center" }}>Acciones</th>
            </tr>
          </thead>

          <tbody>
          {datos?.rows.map((ticket: any, index: any) => {
            return (
              <tr key={index}>
                <th scope="row" style={{ textAlign: "center" }}>{ticket.id}</th>
                <td className={styleDetailPayment.th_payment}>{ticket.user.name}</td>
                <td className={styleDetailPayment.th_payment}>{ticket.event.name}</td>
                <td className={styleDetailPayment.th_payment}>$ {ticket.transaction_amount}</td>
                <td className={styleDetailPayment.th_payment}>{ticket.quantity}</td>
                <td className={styleDetailPayment.th_payment}>{ticket.status}</td>
                <td className={styleDetailPayment.th_payment}>

                  <Link to={`/detail-process-payment/${ticket.id}`}>
                  <button
                  className={styleDetailPayment.buttom_style_left}
                  >
                    Detalle
                  </button>
                  </Link>
                  </td>
              </tr>
              );
            })}
            </tbody>
        </table>
        </div>
    )}
}

export default DetailPayment