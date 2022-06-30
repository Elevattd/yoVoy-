import React from 'react';
import style_ticket from './Tickets.module.css';

const Tickets = ({ ticket }: any) => {
  console.log(ticket)

  const status : any = {
    'approved': 'Aceptado',
    'in_process': 'En proceso',
    'rejected': 'Rechazado',
  }

  const formatDate = (date: any) => {
    const date_ = new Date(date);
    console.log(date_.toLocaleDateString('es-AR'));
    return `${date_.toLocaleDateString('es-AR')} - ${date_.toLocaleTimeString('es-AR')}`;
  }

	return (
		<React.Fragment>
			<div className={style_ticket.container}>
        <div className={`${style_ticket.bg} ${ticket.status === 'approved' ? style_ticket.ticket_accepted : ticket.status === 'rejected' ? style_ticket.ticket_rejected : null}`}>
					<div className={style_ticket.text}>
						<h2>{ticket.event.name}</h2>
						<h4>Cantidad de Tickets: {ticket.quantity}</h4>
						<h4>Precio: {'$' + ticket.transaction_amount}</h4>
            <h4>Fecha: {formatDate(ticket.createdAt)}</h4>
						<h4>Estado de la Compra: {status[ticket.status]}</h4>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Tickets;
