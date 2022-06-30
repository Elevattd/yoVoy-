import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { clearEventId, getEventId } from '../../redux/actions/actions-Create';
import { AppDispatch, State } from '../../redux/store/store';
import { Location } from '../../types';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { BiDirections } from 'react-icons/bi';
import { SiGooglemaps } from 'react-icons/si';
import style from './OrganizationEventSales.module.css';

const OrganizationEventSales: React.FC = () => {
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

  const getTotalPerDate = (location: any): any => {
    const sum = location.dates.reduce((acc: any, curr: any) => {
      return acc + (curr.tickets_sold * curr.price);
    }, 0)
    return sum;
  }

  const getTotalRecaudation = () => {
    const sum = eventDetail.locations.reduce((acc: any, curr: any) => {
      return acc + getTotalPerDate(curr);
    }, 0)
    return sum;
  }

	return (
		<div>
			<section className={style.container}>
				<h1> {`   ${eventDetail.name}`} - TODAS LAS FECHAS</h1>
				<div className={style.cardEvent}>
          <img
            src={eventDetail.background_image}
            alt={eventDetail.name}
            className={style.main_img}
          />
          <p className={style.p}>Recaudación Total: {eventDetail?.locations ? getTotalRecaudation() : ''}</p>
					{eventDetail &&
						eventDetail.locations?.map((location: Location) => {
							return (
									<React.Fragment key={location.id}>
										<fieldset
											className={style.fieldset_event_detail}
											key={location.id}
										>
											{/*En los 2 siguientes h4, reemplazar Lugar: y Direc: por iconos =) */}
											<div className={style.fieldset_event_content}>
												<h4>
													<SiGooglemaps /> {location.name}
												</h4>
												<small className={style.small1}>
													<BiDirections />
													{location.address},{' '}
												</small>
												<small className={style.small1}>
													{location.city.name}.{' '}
												</small>
												<h4>
													<small>{location.address}.</small>
												</h4>
                        <div className={style.dates}>
                          { 
                            location.dates.map((date: any) => {
                            return (
                              <div className={style.each_date} key={date.id}>
                                <div className={style.each_date_sub}>
                                  <p>Fecha: {date.date}</p>
                                  <p>Precio: ${date.price}</p>
                                </div>
                                <div className={style.each_date_sub}>
                                  <p>Tickets: {`${date.tickets_sold} / ${date.total_tickets || 100}`}</p>
                                  <p>Total: ${date.tickets_sold * date.price}</p>
                                </div>
                              </div>
                            )
                          })}
                          <p className={style.parcial}>Recaudación parcial: ${getTotalPerDate(location)}</p>
                        </div>
											</div>
										</fieldset>
									</React.Fragment>
							);
						})}
				</div>
			</section>
		</div>
	);
};

export default OrganizationEventSales;