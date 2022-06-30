import React, { useEffect, useState, useRef, SyntheticEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  getCategories,
  getLocations,
} from '../../redux/actions/actions-Create';
import { AppDispatch, State } from '../../redux/store/store';
import { Category, Location } from '../../types';
import DatesModal from '../CreateEvent/CreateEventModal/DatesModal'
import { useCreateEvent } from '../CreateEvent/useCreateEvent';
import { useDatesModal } from '../CreateEvent/CreateEventModal/useDatesModal';
import { useGetEventQuery, useUpdateEventRequestMutation } from "../../slices/app/eventsApiSlice"
import { useNavigate, useParams } from "react-router-dom";
import styleUpdateEvent from './update-event.module.css'
import { FiEdit } from "react-icons/fi";
import styleCreateEvent from '../CreateEvent/create-event.module.css'
import { Toast } from '../../utils/alerts';

const UpdateEvent = () => {
  const locSelect = useRef<any>()
  const [isOpen, openModal, closeModal] = useDatesModal(false);
  const [updateEvent] = useUpdateEventRequestMutation();
  const dispatch: AppDispatch = useDispatch();
  const { eventId } = useParams();
  const { data: eventInfo } = useGetEventQuery({ id: eventId as string | '1' }, { refetchOnMountOrArgChange: true })

  const navigate = useNavigate()
  // const [categoriesChecked, setCategoriesChecked] = useState<any>([])

  const locations: any = useSelector(
    (state: State) => state.global.locations,
  );
  const categories: any = useSelector(
    (state: State) => state.global.categories,
  );

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

  useEffect(() => {
    dispatch(getLocations());
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (eventInfo) {
      const categories = eventInfo.categories.map((c:any)=>c.name)
      // setCategoriesChecked(categories)
      if (!(Object.keys(eventInfo).length > 1)) navigate('/')
      else {
        handleUpdateFetch(eventInfo)
      }
    }
  }, [eventInfo])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const event = {
      ...input,
      locations: locsForSubmit
    }
    try {
      if (err.nameErr === "" &&
        err.descriptionErr === "" &&
        err.categoriesErr === "" &&
        err.locationsErr === ""&&
				err.imgErr === "") {
        eventId && await updateEvent({ description: 'actualizado' , body:{id: eventId, ...event} })
        resetState();
        navigate(`/events/${eventInfo.id}`)
        Toast.fire({
					icon: "success",
					title: "Evento actualizado correctamente",
				})
      } else {
        Toast.fire({
					icon: "warning",
					title: "Debe completar los campos correctamente para poder actualizar el evento.",
				})
      }

    } catch (error) { console.log(error) }
  };

  const [err, setErr] = useState({
    nameErr: "",
    descriptionErr: "",
    imgErr: "",
    categoriesErr: "",
    locationsErr: ""
  })

  const [datesErr, setdatesErr] = useState({
    priceErr: "Debe ingresar un precio",
		locationDateErr: "Debe seleccionar una locación",
		dateInputErr: "Debe seleccionar una fecha",
		ticketInputErr: "Debe ingresar número de tickets",
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
      setErr({ ...err, categoriesErr: "Debe tener al menos 1 categoría" })
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
      setErr({ ...err, imgErr: "Este campo debe estar completo." })
    } else if (input.background_image !== "") {
      if (!(/\.(jpg|png|gif)$/i).test(input.background_image)) {
        setErr({ ...err, imgErr: "Url no contiene un archivo válido" })
      } else {
        setErr({ ...err, imgErr: "" })
      }

    }
  }, [input.background_image])

  useEffect(() => {
    if (isNaN(currentDate.price) || currentDate.price === 0) {
      setdatesErr({ ...datesErr, priceErr: "Debe ingresar un precio" })
    } else if (currentDate.price > 0) {
      setdatesErr({ ...datesErr, priceErr: "" })
    }
  }, [currentDate.price])


  useEffect(() => {
    if (currentLocId === "default" || currentLocId === "") {
      setdatesErr({ ...datesErr, locationDateErr: "Debe selecionar una locación" })
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
      setdatesErr({ ...datesErr, ticketInputErr: "Debe ingresar número de tickets" })
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
        locationDateErr: "Debe selecionar una locación",
        dateInputErr: "Debe selecionar una fecha",
        ticketInputErr: "Debe ingresar número de tickets",
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
        <div className={styleUpdateEvent.form_order}>
          <fieldset className={styleUpdateEvent.fieldset_form}>
            {/* <label htmlFor="name">Nombre del evento:</label> */}
            <legend className={styleUpdateEvent.legend_form}>
              Nombre del evento:
            </legend>
            <input
              name="name"
              type="text"
              id="name"
              placeholder="Nombre del evento"
              className={styleUpdateEvent.input_create}
              onChange={handleInputChange}
              value={input.name}
            />
            <label>{err.nameErr}</label>
          </fieldset>{' '}
          <br />
          <fieldset className={styleUpdateEvent.fieldset_form}>
            {/* <label htmlFor="description">Descripcion:</label> */}
            <legend className={styleUpdateEvent.legend_form}>
              Descripción:
            </legend>
            <textarea
              name="description"
              id="description"
              placeholder="Descripción..."
              className={styleUpdateEvent.input_create_textArea}
              onChange={handleInputChange}
              value={input.description}
            />
            <label>{err.descriptionErr}</label>
          </fieldset>{' '}
          <br />
          <fieldset className={styleUpdateEvent.fieldset_form}>
            {/* <label htmlFor="background_image">Imagen:</label> */}
            <legend className={styleUpdateEvent.legend_form}>Imagen:</legend>
            <input
              name="background_image"
              type="text"
              id="background_image"
              placeholder="Imagen..."
              className={styleUpdateEvent.input_create}
              onChange={handleInputChange}
              value={input.background_image}
            />
            <label>{err.imgErr}</label>
          </fieldset>{' '}
          <br />
          <fieldset className={styleUpdateEvent.fieldset_form}>
            <legend className={styleUpdateEvent.legend_form}>
              Seleccione las categorías:
            </legend>
            {categories?.rows?.map((category: Category) => {
              return (
                <React.Fragment key={category.id}>
                  <br />
                  <input
                    checked={input.categories.includes(category.id)}
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
              <div className={styleUpdateEvent.container_modal}>
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
              <div className={styleUpdateEvent.container_pricedate}>
              <legend className={styleCreateEvent.legend_detail_form}>
									Precio
								</legend>
                <input
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
									Disponibilidad de Tickets
								</legend>
                <input
                  name="tickets"
                  type="number"
                  value={currentDate?.total_tickets || ""}
                  placeholder="Indique número de tikects..."
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
          <button type="submit" className={styleUpdateEvent.bottom_form}>
            Actualizar
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default UpdateEvent;