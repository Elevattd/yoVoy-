import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { clearEventId, getEventId } from '../../redux/actions/actions-Create';
import { AppDispatch, State } from '../../redux/store/store';
import { Location } from '../../types';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { BiDirections } from 'react-icons/bi';
import { SiGooglemaps } from 'react-icons/si';
import event_style from './EventLocations.module.css';
import style from './EventLocations.module.css';
import Loading from '../Loading/Loading';

const EventLocations: React.FC = () => {
	const dispatch: AppDispatch = useDispatch();
	const eventDetail: any = useSelector(
		(state: State) => state.global.eventDetail,
	);
	const { id }: any = useParams<{ id: string }>();

	useEffect(() => {
		dispatch(getEventId(id));
		return () => {
			dispatch(clearEventId());
		};
	}, [dispatch, id]);

	const content = !Object.keys(eventDetail).length ? (
		<section className={style.container}>
			<Loading />
		</section>
	) : (
		<div>
			<section className={style.container}>
				<h1> {`   ${eventDetail.name}`} - PRÓXIMOS SHOWS</h1>
				<div className={style.cardEvent}>
					{eventDetail &&
						eventDetail.locations?.map((location: Location) => {
							return (
								<Link
									to={`/events/${eventDetail.id}/${location.id}`}
									className={style.link}
									key={location.id}
								>
									<React.Fragment>
										<fieldset className={style.fieldset_event_detail}>
											<img
												src={eventDetail.background_image}
												alt={eventDetail.name}
												className={style.fieldset_event_img}
											/>

											<div className={style.fieldset_event_content}>
												<h4>
													<SiGooglemaps /> {location.name}
												</h4>
												<small className={event_style.small1}>
													<BiDirections />
													{location.address},{' '}
												</small>
												<small className={event_style.small1}>
													{location.city.name}.{' '}
												</small>
											</div>
										</fieldset>
									</React.Fragment>
								</Link>
							);
						})}
				</div>
			</section>
		</div>
	);

	return content;
};

export default EventLocations;
