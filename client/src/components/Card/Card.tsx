import React from 'react';
import { Link } from 'react-router-dom';
import { Event } from '../../types';
import './Card.css';


interface Props {
	event: Event;
}

const Card = ({ event }: Props) => {
	return (
		<React.Fragment>
			<Link className='Card_a' to={`/events/${event.id}`}>
				<div className='Card_bg'>
					<img  src={event.background_image} alt={event.name} />
					<div className='Card_bg_li'>
						{/* <h4>{event.name}</h4> */}
						<a href="#">Más Informacíon</a>
					</div>
					{/* <p>{event.description?.substring(0, 100)}...</p> */}

				</div>
			</Link>
		</React.Fragment>
	);
};

export default Card;
