import { Link } from 'react-router-dom';
import { useGetOrganizationEventsQuery } from '../../slices/app/organizationApiSlice';
import { useDeleteEventRequestMutation } from '../../slices/app/eventsApiSlice';
import './organization-event.css';
import Swal from 'sweetalert2';
import { BsPlusCircleFill } from "react-icons/bs";
import Loading from '../Loading/Loading';

const OrganizationEvents = () => {
	const [deleteEvent] = useDeleteEventRequestMutation();
	let {
		data: events,
		refetch,
		isFetching,
	} = useGetOrganizationEventsQuery(
		{ _: '' },
		{ refetchOnMountOrArgChange: true },
	);
	const handleDelete = async (id: any) => {
		Swal.fire({
			title: 'Esta seguro de eliminar el Evento?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'orange',
			cancelButtonColor: '#d33',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Eliminar',
		}).then(async (result) => {
			if (result.isConfirmed) {
				Swal.fire({
					title: 'La petición para eliminar el evento fue enviada, un administrador la evaluará pronto!',
					icon: 'success',
				});
				await deleteEvent({description: 'delete', body:{id}});
				refetch();
			}
		});
	};
	const content = isFetching ? (
		<Loading />
	) : (
		<div>
			<div className='container_btn_org'>

				<Link className='link_a' to="/create-event">
					<button className="btn-event-organization"> <BsPlusCircleFill className='icon_plus'/>Crear Nuevo Evento</button>
				</Link>
			</div>
			
			<div>
				<h1 style={{ color: 'white', textAlign: 'center' }}>
					Lista de Eventos
				</h1>
			</div>
			<div className="cards-event-organization">
				{events?.map((event: any) => {
					return (
						<div className="card-organization-event">
							<fieldset className="fieldset-event-organization ">
								<legend className="legend-event-organization">Evento:</legend>
								<h2 style={{ color: 'white' }}>{event.name}</h2>
								<img
									src={event.background_image}
									alt={event.name}
									style={{ width: '250px', height: '250px', objectFit: 'cover', objectPosition: 'center' }}
								/>
								<div style={{ textAlign: 'center' }}></div>
								<Link to={`/organization-events-sales/${event.id}`}>
									<button className="button-event-organization">Ventas</button>
								</Link>
								<Link to={`/update-event/${event.id}`}>
									<button className="button-event-organization">Editar</button>
								</Link>
								<button
									className="button-event-organization"
									onClick={() => handleDelete(event.id)}
								>
									Eliminar
								</button>
							</fieldset>
						</div>
					);
				})}
			</div>
		</div>
	);
	return <div>{content}</div>;
};

export default OrganizationEvents;
