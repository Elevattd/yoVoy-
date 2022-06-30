import React, { AriaAttributes, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
	getCategories,
	getEventByCategory,
	getCities,
	getLocations,
} from '../../redux/actions/actions-Create';
import { AppDispatch, State } from '../../redux/store/store';
import { Category, City, Location, Filter } from '../../types';

import filterStyle from './FilterEvents.module.css';

const FilterEvent = ({filters, setFilters, refresh}: any) => {
	const dispatch: AppDispatch = useDispatch();
	const categories: any = useSelector(
		(state: State) => state.global.categories,
	);
	const cities: any = useSelector(
		(state: State) => state.global.cities,
	);
	const locations: any = useSelector(
		(state: State) => state.global.locations,
	);

	const [citySelected, setCitySelected] = useState<string>("")

	useEffect(() => {
		dispatch(getCategories());
		dispatch(getCities());
	}, [dispatch]);

	useEffect(() => {
		dispatch(getLocations())
	}, [cities])

	const handleCategoryFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const categoryFilt: Filter = {
			filter: 'category',
			id: e.target.value,
		};
		setFilters([categoryFilt, filters[1]]);
	};

	const handleCitiesFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(getLocations(e.target.value));
		const CityFilt: Filter = {
			filter: "city",
			id: e.target.value
		}
		setCitySelected(e.target.value)
		setFilters([filters[0], CityFilt])
	}

	const handleLocationFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const LocationFilt: Filter = {
			filter: 'location',
			id: e.target.value,
		};
		if (e.target.value !== '') {
			setFilters([filters[0], LocationFilt]);
		} else {
			const CityFilt: Filter = {
				filter: 'city',
				id: citySelected,
			};
			setFilters([filters[0], CityFilt]);
		}

	};

	const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const DateFilt: Filter = {
			filter: 'date',
			id: e.target.value,
		};
		setFilters([DateFilt]);
	};
	const filtBynextDays = (days: string) => {
		const nextDaysFilt: Filter = {
			filter: 'nextDays',
			id: days,
		};
		setFilters([nextDaysFilt]);
	};

	return (
		<div className={filterStyle.bg_div}>
			<div className={filterStyle.bg_div1}>
				<select onChange={handleCategoryFilter}>
					<option className={filterStyle.option} key={"allCategories"} value="">todas las categorias</option>
          {
          categories?.rows?.length && categories.rows.map((c: any) => (
						<option className={filterStyle.option} key={c.name} value={c.id}>
							{c.name}
						</option>
					))}
				</select>

				<select id='cityFilter' onChange={handleCitiesFilter}>
					<option className="optionCity" key={"allCities"} value="">todas las provincias</option>
          {cities?.rows?.length && cities.rows.map((city: any) => (
						<option id={`city${city.id}`} key={city.name} value={city.id}>
							{city.name}
						</option>
					))}
				</select>

				<select onChange={handleLocationFilter}>
					<option key={"allLocations"} value="">todas las locaciones</option>
          {locations?.rows?.length && locations.rows.map((l: any) => (
            <option key={`${l.id} ${l.name}`} value={l.id}>
							{l.name}
						</option>
					))}
				</select>

				<input
					type={'date'}
					onChange={(e) => {
						handleDateChange(e);
					}}
					className={filterStyle.input_filter}
				/>
			</div>
			<div className={filterStyle.buttons_container}>
        <div className={filterStyle.button1530}>
          <button
            className={filterStyle.btn1}
            onClick={() => {
              filtBynextDays('15');
            }}
          >
            Proximos 15 dias
          </button>
          <button
            className={filterStyle.btn2}
            onClick={() => {
              filtBynextDays('30');
            }}
          >
            Proximos 30 dias
          </button>
        </div>
				<button
					className={filterStyle.btn2}
          onClick={() => refresh(true)}
				>
					Limpiar filtros
				</button>
			</div>
		</div>
	);
};

export default FilterEvent;
