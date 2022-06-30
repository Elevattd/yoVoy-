import React, { useState } from 'react';
import { AppDispatch } from '../../redux/store/store';
import { useDispatch } from 'react-redux';
import { getSearchEvent } from '../../redux/actions/actions-Create';
import './SearchBar.css';
import { Toast } from '../../utils/alerts';
import { useGetEventsQuery } from '../../slices/app/eventsApiSlice';

type FormElement = React.FormEvent<HTMLFormElement>;
type Input = React.ChangeEvent<HTMLInputElement>;

const SearchBar = ({ searchEventQuery }: any) => {
	const dispatch: AppDispatch = useDispatch();
	const [input, setInput] = useState('');
	const {
		data: events,
		refetch,
		isFetching,
	} = useGetEventsQuery({ _: '' }, { refetchOnMountOrArgChange: true });
	const eventos = events?.rows?.map((e: any) => e.name);

	function onSubmit(e: FormElement) {
		e.preventDefault();
		input
			? searchEventQuery(e, input)
			: Toast.fire({
					title: 'Ingrese el nombre de un Evento',
					icon: 'warning',
			  });
		setInput('');
	}
	function onSubmitSelect(e: any) {
		input
			? searchEventQuery(input, e)
			: Toast.fire({
					title: 'Ingrese el nombre de un Evento',
					icon: 'warning',
			  });
		setInput(e);
	}
	function onInputChange(e: Input) {
		setInput(e.target.value);
	}

	return (
		<React.Fragment>
			<form onSubmit={onSubmit}>
				<input
					className="searchBar-bg-input1"
					type="text"
					onChange={onInputChange}
					value={input}
					placeholder="Buscar..."
				/>
				<input className="searchBar-bg-input2" type="submit" value="🔍" />
				<div className="searchBar-autoSuggest">
					{input &&
						eventos
							?.filter((item: any) => {
								const searchTerm = input.toLowerCase();
								const name = item.toLowerCase();

								return (
									searchTerm &&
									name.startsWith(searchTerm) &&
									name !== searchTerm
								);
							})
							.slice(0, 10)
							.map((e: any) => (
								<div
									className="searchBar-autoSuggest-row"
									onClick={() => onSubmitSelect(e)}
									key={e}
								>
									{e}
								</div>
							))}
				</div>
			</form>
		</React.Fragment>
	);
};

export default SearchBar;
