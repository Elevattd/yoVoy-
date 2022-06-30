import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
	getCategories,
	getLocations,
} from '../../redux/actions/actions-Create';
import { AppDispatch, State } from '../../redux/store/store';
import { Category, Location } from '../../types';
import DatesModal from './CreateEventModal/DatesModal';
import { useCreateEvent } from './useCreateEvent';
import { useDatesModal } from './CreateEventModal/useDatesModal';
import { useCreateEventMutation } from '../../slices/app/eventsApiSlice';
import styleCreateEvent from './create-event.module.css';
import { FiEdit } from 'react-icons/fi';
import styleUpdate from "../UpdateEvent/update-event.module.css"
import { Toast } from '../../utils/alerts';
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {

	type Input = React.ChangeEvent<HTMLInputElement>
	const locSelect = useRef<any>()
	const [isOpen, openModal, closeModal] = useDatesModal(false);
	const [createEvent] = useCreateEventMutation();
	const dispatch: AppDispatch = useDispatch();

	const locations: any = useSelector(
		(state: State) => state.global.locations,
	);
	const categories: any = useSelector(
		(state: State) => state.global.categories,
	);

	const navigate = useNavigate()

	useEffect(() => {
		dispatch(getLocations());
		dispatch(getCategories());
	}, [dispatch]);

	const [
		input,
		resetState,
		handleInputChange,
		handleInputDateChange,
		currentDate,
		currentLocId,
		locsAux,
		isAlreadyAdded,
		handleAddDate,
		handleCategoryChange,
		handleLocationChange,
		handleConfirm,
		locsForSubmit,
		handleRemoveLoc,
		handleUpdateFetch,
		removeDateFromLocsAux,
		setCurrentLocId,
		removeDateFromLocsAux2
	] = useCreateEvent({ locations });

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const event = {
			...input,
			locations: locsForSubmit,
		}
		try {
			if (err.nameErr === "" &&
				err.descriptionErr === "" &&
				err.categoriesErr === "" &&
				err.locationsErr === "" &&
				err.imgErr === "") {
				await createEvent({ newEvent: event });
				resetState();
				navigate("/organization-events")
				Toast.fire({
					icon: "success",
					title: "Evento creado correctamente",
				})

			} else {
				Toast.fire({
					icon: "warning",
					title: "Debe completar los campos correctamente para poder crear un evento.",
				})
			}

		} catch (error) {
			console.log(error);
		}
	};

	const [err, setErr] = useState({
		nameErr: "Debe tener entre 4 a 50 caracteres",
		descriptionErr: "Debe tener entre 50 a 250 caracteres",
		imgErr: "Este campo debe esta completo.",
		categoriesErr: "Debe tener al menos 1 categoria",
		locationsErr: "Debe tener al menos 1 locación"
	})

	const [datesErr, setdatesErr] = useState({
		priceErr: "Debe ingresar un precio",
		locationDateErr: "Debe selecionar una locacion",
		dateInputErr: "Debe selecionar una fecha",
		ticketInputErr: "Debe ingresar numero de tickets",
	})

	useEffect(() => {
		if (input.name.length < 4) {
			setErr({ ...err, nameErr: "Debe tener entre 4 a 50 caracteres" })
		}
		if (input.name.length > 3) {
			setErr({ ...err, nameErr: "" })
		}
	}, [input.name])

	useEffect(() => {
		if (input.description.length < 50) {
			setErr({ ...err, descriptionErr: "Debe tener entre 50 a 250 caracteres" })
		}
		if (input.description.length > 49) {
			setErr({ ...err, descriptionErr: "" })
		}
	}, [input.description])

	useEffect(() => {
		if (input.categories.length === 0) {
			setErr({ ...err, categoriesErr: "Debe tener al menos 1 categoria" })
		}
		if (input.categories.length > 0) {
			setErr({ ...err, categoriesErr: "" })
		}
	}, [input.categories])

	useEffect(() => {
		if (locsForSubmit.length === 0) {
			setErr({ ...err, locationsErr: "Debe tener al menos 1 locación" })
		}
		if (locsForSubmit.length > 0) {
			setErr({ ...err, locationsErr: "" })
		}
	}, [locsForSubmit])


	useEffect(() => {
		if (input.background_image === "") {
			setErr({ ...err, imgErr: "Este campo debe esta completo." })
		} else if (input.background_image !== "") {
			if (!(/\.(jpg|png|gif)$/i).test(input.background_image)) {
				setErr({ ...err, imgErr: "Url no contiene un archivo valido" })
			} else {
				setErr({ ...err, imgErr: "" })
			}

		}
	}, [input.background_image])

	useEffect(() => {
		console.log(currentDate.price)
		if (isNaN(currentDate.price) || currentDate.price === 0) {
			setdatesErr({ ...datesErr, priceErr: "Debe ingresar un precio" })
		} else if (currentDate.price > 0) {
			setdatesErr({ ...datesErr, priceErr: "" })
		}
	}, [currentDate.price])


	useEffect(() => {
		if (currentLocId === "default" || currentLocId === "") {
			setdatesErr({ ...datesErr, locationDateErr: "Debe selecionar una locacion" })
		} else if (currentLocId !== "default") {
			setdatesErr({ ...datesErr, locationDateErr: "" })
		}
	}, [currentLocId])

	useEffect(() => {
		if (!currentDate.date) {
			setdatesErr({ ...datesErr, dateInputErr: "Debe selecionar una fecha" })
		} else {
			setdatesErr({ ...datesErr, dateInputErr: "" })
		}
	}, [currentDate.date])

	useEffect(() => {
		if (!currentDate.total_tickets) {
			setdatesErr({ ...datesErr, ticketInputErr: "Debe ingresar numero de tickets" })
		} else {
			setdatesErr({ ...datesErr, ticketInputErr: "" })
		}
	}, [currentDate.total_tickets])

	const handleAddDateClick = (e: any) => {

		if (datesErr.priceErr === "" &&
			datesErr.locationDateErr === "" &&
			datesErr.dateInputErr === "" &&
			datesErr.ticketInputErr === "" &&
			currentLocId !== "") {
			handleAddDate(e)
			setdatesErr({
				priceErr: "Debe ingresar un precio",
				locationDateErr: "Debe selecionar una locacion",
				dateInputErr: "Debe selecionar una fecha",
				ticketInputErr: "Debe ingresar numero de tickets",
			})
		} else {
			Toast.fire({
				icon: "warning",
				title: "Debe completar los datos correspondientes para poder agregar.",
			})
		}

	}

	return (
		<React.Fragment>
			<form onSubmit={handleSubmit}>
				<div className={styleCreateEvent.form_order}>
					<fieldset className={styleCreateEvent.fieldset_form}>
						{/* <label htmlFor="name">Nombre del evento:</label> */}
						<legend className={styleCreateEvent.legend_form}>
							Nombre del evento:
						</legend>
						<input
							name="name"
							type="text"
							id="name"
							placeholder="Nombre del evento"
							className={styleCreateEvent.input_create}
							onChange={handleInputChange}
							value={input.name}
						/>
						<label>{err.nameErr}</label>
					</fieldset>{' '}
					<br />
					<fieldset className={styleCreateEvent.fieldset_form}>
						{/* <label htmlFor="description">Descripcion:</label> */}
						<legend className={styleCreateEvent.legend_form}>
							Descripcion:
						</legend>
						<textarea
							name="description"
							id="description"
							placeholder="Descripcion..."
							className={styleCreateEvent.input_create}
							onChange={handleInputChange}
							value={input.description}
						/>
						<label>{err.descriptionErr}</label>
					</fieldset>{' '}
					<br />
					<fieldset className={styleCreateEvent.fieldset_form}>
						{/* <label htmlFor="background_image">Imagen:</label> */}
						<legend className={styleCreateEvent.legend_form}>Imagen:</legend>
						<input
							name="background_image"
							type="text"
							id="background_image"
							placeholder="Imagen..."
							className={styleCreateEvent.input_create_textArea}
							onChange={handleInputChange}
							value={input.background_image}
						/>
						<label>{err.imgErr}</label>
					</fieldset>{' '}
					<br />
					<fieldset className={styleCreateEvent.fieldset_form}>
						<legend className={styleCreateEvent.legend_form}>
							Seleccione las categorias:
						</legend>
						{categories?.rows?.map((category: Category) => {
							return (
								<React.Fragment key={category.id}>
									<br />
									<input
										value={category.id}
										type="checkbox"
										onChange={handleCategoryChange}
									/>
									<span>{` ${category.id}  ${category.name}`}.</span>
								</React.Fragment>
							);
						})}
						<br />
						<label>{err.categoriesErr}</label>
					</fieldset>{' '}
					<br />
					{/* MODAL */}
					<fieldset className={styleCreateEvent.fieldset_form}>
						<legend className={styleCreateEvent.legend_form}>
							Agregue detalles de el/los eventos
						</legend>
						<div className={styleCreateEvent.dateContainerForm}>
							<div className={styleUpdate.container_modal}>
								<select
									id="locationSelect"
									name="id"
									ref={locSelect}
									placeholder="Seleccione un lugar"
									className={styleCreateEvent.form_cities}
									onChange={handleLocationChange}
								>
									<option value="default">Seleccione la ciudad...</option>
									{locations?.rows?.map((location: Location) => {
										return (
											<option
												key={location.id}
												value={location.id}
												className={`${styleCreateEvent.form_citie} ${isAlreadyAdded(location.id) ? styleCreateEvent.form_citie_loaded : null}`}
												selected={location.id === parseInt(currentLocId)}
											// disabled={isAlreadyAdded(location.id)}
											>
												{`- ${location.city['name']},${location.address}, ${location.name}.`}
											</option>
										);
									})}
								</select>
								<label>{datesErr.locationDateErr}</label>
							</div>

							<div className={styleUpdate.container_pricedate}>
								<legend className={styleCreateEvent.legend_detail_form}>
									Precio
								</legend>
								<input
								    className={styleCreateEvent.input_detail_form}
									name="price"
									type="number"
									value={currentDate?.price || ""}
									placeholder="Indique el precio..."
									onChange={handleInputDateChange}
								/>
								<label>{datesErr.priceErr}</label>


								<legend className={styleCreateEvent.legend_detail_form}>
									Fecha
								</legend>
								<input type="date" name="date" value={currentDate?.date || ''} onChange={handleInputDateChange} />
								<label>{datesErr.dateInputErr}</label>
								<legend className={styleCreateEvent.legend_detail_form}>
									Tickets
								</legend>
								<input
									name="tickets"
									type="number"
									value={currentDate?.total_tickets || ""}
									placeholder="Indique numero de tikects..."
									onChange={handleInputDateChange}
								/>
								<label>{datesErr.ticketInputErr}</label>

								<button type="button" title="Agregar detalle" onClick={(e) => { handleAddDateClick(e) }}>
									+
								</button>
							</div>

						</div>

					</fieldset>{' '}
					<br />
					<fieldset className={styleCreateEvent.fieldset_form}>
						<legend className={styleCreateEvent.legend_form}>
							Localidades agregadas:
						</legend>
						{
							locsForSubmit.length > 0
								? locsForSubmit
									.map((loc: any, iLoc: any) => {
										let locData = locations?.rows?.find((location: any) => location.id === parseInt(loc.id));
										return locData ?
											(
												<div key={iLoc}>
													<span>{` ${locData.name} `}</span>
													<span>{` ${locData.address} `}</span>
													{/* <button onClick={(e) => handleRemoveLoc(e,loc.id)}>X</button> */}
													<ul>
														{loc.dates.map((date: any, i: any) => (
															<li key={i}>{`$${date.price} || ${date.date} || ${date.total_tickets} tickets`}
																<button type="button" key={i} onClick={(e: SyntheticEvent) => removeDateFromLocsAux2(i, locData.id)}>X</button>
															</li>
														))}
													</ul>
												</div>
											)
											: null
									})
								: <h1>No hay localidades cargadas para el evento</h1>
						}
						<label>{err.locationsErr}</label>
					</fieldset>{' '}
					{/* EN MODAL */}
					<button type="submit" className={styleCreateEvent.bottom_form}>
						Create
					</button>
				</div>
			</form>
		</React.Fragment>
	);
};

export default CreateEvent;
