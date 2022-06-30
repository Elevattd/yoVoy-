import React from 'react';
import { Link } from 'react-router-dom';
import { useDeleteEventMutation } from '../../../slices/app/eventsApiSlice';
import SideBar from '../SideBar/SideBar';
import styleConfigEvent from './event-config.module.css';
import Swal from 'sweetalert2';
import usePagination from '../../../hooks/usePagination/usePagination';
import { useSelector } from 'react-redux';
import PageButtons from '../../PageButtons/PageButtons';
import SearchBar from '../../SearchBar/SearchBar';
import FilterEvent from '../../FilterEvents/FilterEvents';
import Loading from '../../Loading/Loading';

const EventsConfig = () => {
	const [deleteEvent] = useDeleteEventMutation();
  const {events} = useSelector((state: any) => state.global.allEvents);
  const pagination = usePagination(10, 'events');

	const HandleDelete = async (event: any) => {
		Swal.fire({
			title: 'Esta seguro de eliminar el Evento?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'orange',
			cancelButtonColor: '#d33',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Eliminar',
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire({
					title: 'Evento Eliminado!',
					icon: 'success',
				});
				deleteEvent(event.id);
				pagination.refresh();
			}
		});
	};

  const content = !events
    ? (
      <div className={styleConfigEvent.fondo}>
        <SideBar />
        <Loading />
      </div>
    )
    :
    (
      <React.Fragment>
        <div className={styleConfigEvent.fondo}>
          <SideBar />
          <div>
            <div className={styleConfigEvent.table_title}>
              <h1 className={styleConfigEvent.table_title_style} >Configurar Eventos</h1>
              <Link to={`/create-event`} className={styleConfigEvent.buttom}>
                <button className={styleConfigEvent.buttom_style}>Crear Evento</button>
              </Link>
            </div>
          </div>
          <div className={styleConfigEvent.searchbar}>
            <SearchBar searchEventQuery={pagination.searchEventQuery} />
            <FilterEvent filters={pagination.filters} setFilters={pagination.setFilters} refresh={pagination.refresh} />
          </div>
          <PageButtons page={pagination.page} limit={pagination.limit} pageButtonHandler={pagination.pageButtonHandler} />
          <table className={styleConfigEvent.table_config}>
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>ID</th>
                <th style={{ textAlign: "center" }}>Nombre</th>
                <th style={{ textAlign: "center" }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {events?.map((event: any, index: any) => {
                return (
                  <tr className={styleConfigEvent.componente}>
                    <th scope="row" style={{ textAlign: "center", backgroundColor: '#000450' }}>{event.id}</th>
                    {/* <td>{event.id}</td>	 */}
                    <td className={styleConfigEvent.th_config}>{event.name}</td>
                    <td className={styleConfigEvent.th_config}>
                      <Link to={`/update-event/${event.id}`} className={styleConfigEvent.buttom}>
                        <button className={styleConfigEvent.buttom_style_left}>Editar</button>
                      </Link>
                      <button
                        className={styleConfigEvent.buttom_style_right}
                        onClick={() => HandleDelete(event)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );

	return content;
};

export default EventsConfig;
