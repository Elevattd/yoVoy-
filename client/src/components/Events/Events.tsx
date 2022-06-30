import React from 'react';
import { Link } from 'react-router-dom';
import { Event } from '../../types';
import Card from '../Card/Card';
import style from "./Events.module.css"




const Events = ({ events }: any) => {
	const eventsPrueba1 = events[0]
	const eventsPrueba2 = events[1]

	const renderEvents = (): JSX.Element[] => {
		return events?.slice(2).map((event : any) => {
			return <Card key={`${event.id} ${event.name}`} event={event} />
		});
	};

	return (
		<div>
			<div className={style.div1}>
				<Link to={`/events/${eventsPrueba1?.id}`}>
					<div className={style.divhover}>
						<img src={eventsPrueba1?.background_image} alt="" />
						<div className={style.divdeprueba}>
							<div >
								<h1>{eventsPrueba1?.name}</h1>
							</div>
							<div className={style.diva} >
								<a href="#">Más Informarcíon</a>
							</div>

						</div>
					</div>
				</Link>
				{events && events.length > 1? <Link to={`/events/${eventsPrueba2?.id}`}>
					<div className={style.divhover}>
						<img src={eventsPrueba2?.background_image} alt="" />
						<div className={style.divdeprueba}>
							<div>
								<h1>{eventsPrueba2?.name}</h1>

							</div>
							<div >
								<a href="#">Más Informarcíon</a>

							</div>
						</div>
					</div>
				</Link> : null}
			</div>

			<div className={style.container}>
				{renderEvents()}
			</div>

		</div>
	)
};

export default Events;
