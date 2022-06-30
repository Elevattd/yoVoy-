import { ActionType } from './index';
import { Dispatch } from 'redux';
// import { Action } from "./action-Type";
import axios from 'axios';
import { Filter } from '../../types';
import { UPDATE_CART } from '../../slices/cartSlice';
import { Toast } from '../../utils/alerts';

// Ejemplo de como se puede realizar las acciones

export const addToCart = (ticket: any) => async (dispatch: Dispatch) => {
	const cart = localStorage.getItem('cartTickets')
		? JSON.parse(localStorage.getItem('cartTickets') as any)
		: [];
	const inCart = cart.find((item: any) => item.dateId === ticket.dateId);
	if (!inCart) {
		const newTicket = {
			...ticket,
			quantity: 1,
		};
		cart.push(newTicket);
		// localstorage
		localStorage.setItem('cartTickets', JSON.stringify(cart));
		// redux
		dispatch(UPDATE_CART(cart));
		Toast.fire({
			icon: 'success',
			title: 'Agregado al carrito con exito',
		});
	}
};

export const clearCart = () => async (dispatch: Dispatch) => {
	localStorage.removeItem('cartTickets');
	dispatch(UPDATE_CART([]));
};

export const deleteFromCart = (ticket: any) => async (dispatch: Dispatch) => {
	const cart = localStorage.getItem('cartTickets')
		? JSON.parse(localStorage.getItem('cartTickets') as any)
		: [];
	const newCart = cart.filter((item: any) => item.dateId !== ticket.dateId);

	localStorage.setItem('cartTickets', JSON.stringify(newCart));
	dispatch(UPDATE_CART(newCart));
	Toast.fire({
		icon: 'warning',
		title: 'Ticket eliminado con exito',
	});
};

export const changeQuantity =
	(ticket: any, quantity: number) => async (dispatch: Dispatch) => {
		const cart = localStorage.getItem('cartTickets')
			? JSON.parse(localStorage.getItem('cartTickets') as any)
			: [];
		const newCart = cart.map((item: any) => {
			if (item.dateId === ticket.dateId) {
				item.quantity = quantity;
			}
			return item;
		});
		localStorage.setItem('cartTickets', JSON.stringify(newCart));
		dispatch(UPDATE_CART(newCart));
	};

export const getAllEvent = (limit: any = '', offset: any = '') => {
	return async function (dispatch: Dispatch) {
		try {
			let url = `/api/events`;
			if (limit?.length) url += `?limit=${limit}`;
			if (limit?.length && offset?.length) url += `&offset=${offset}`;
			const event = await axios.get(url);
			console.log(event);
			dispatch({
				type: ActionType.GET_ALL_EVENT,
				payload: event.data,
			});
		} catch (error) {
			console.error('Error la acciones de allEvent');
		}
	};
};

export const getSearchEvent = (
	name: string | number,
	limit: any = '',
	offset: any = '',
) => {
	return async function (dispatch: Dispatch) {
		try {
			let url = `/api/events?search=${name}`;
			if (limit?.length) url += `&limit=${limit}`;
			if (limit?.length && offset?.length) url += `&offset=${offset}`;
			const searchEvent = await axios.get(url);
			dispatch({
				type: ActionType.SEARCH_EVENT,
				payload: searchEvent.data,
			});
		} catch {
			dispatch({
				type: ActionType.DONT_EVENTS,
				payload: ['no hay eventos', 'bySearch'],
			});
		}
	};
};

export const getCategories = () => {
	return async function (dispatch: Dispatch) {
		try {
			const categories = await axios.get(`/api/categories`);
			dispatch({
				type: ActionType.GET_CATEGORIES,
				payload: categories.data,
			});
		} catch ({ error }) {
			console.error('Error en getCategories');
		}
	};
};

export const getEventByCategory = (
	filters: Filter[],
	limit: any = '',
	offset: any = '',
	name: any = '',
) => {
	let endPoint = `/api/events?`;
	let queries = [];
	if (filters[0]) {
		queries.push(`${filters[0].filter}=${filters[0].id}`);
	}
	if (filters[1]) {
		queries.push(`${filters[1].filter}=${filters[1].id}`);
	}
	endPoint = endPoint + queries.join('&');
	if (limit?.length) endPoint += `&limit=${limit}`;
	if (limit?.length && offset?.length) endPoint += `&offset=${offset}`;
	if (name?.length) endPoint += `&search=${name}`;
	return async function (dispatch: Dispatch) {
		try {
			const getEventByCategory = await axios.get(endPoint);
			dispatch({
				type: ActionType.GET_EVENT_BY_CATEGORY,
				payload: getEventByCategory.data,
			});
		} catch (error) {
			dispatch({
				type: ActionType.DONT_EVENTS,
				payload: ['no hay eventos', 'byFilter'],
			});
		}
	};
};

export const getEventId = (id: string | number) => {
	return async function (dispatch: Dispatch) {
		try {
			const eventId = await axios.get(`/api/event/${id}`);
			dispatch({
				type: ActionType.GET_EVENT_ID,
				payload: eventId.data,
			});
		} catch (error) {
			console.error('Error la acciones de eventId');
		}
	};
};

export const clearEventId = () => {
	return {
		type: ActionType.CLEAR_EVENT_ID,
	};
};

export const getCities = () => {
	return async function (dispatch: Dispatch) {
		try {
			const cities = await axios.get('/api/cities');
			dispatch({
				type: ActionType.GET_CITIES,
				payload: cities.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
};

export const putUpdateEvent = (id: any) => {
	return async function (dispatch: Dispatch) {
		try {
			const updateEvent = await axios.put(`/api/event/${id}`);
			dispatch({
				type: ActionType.PUT_UPDATE_EVENT,
				payload: updateEvent.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
};

export const postCreateCategory = (payload: any) => {
	return async function () {
		try {
			const response = await axios.post('/api/category', payload);
			return response;
		} catch (error) {
			console.log(error);
		}
	};
};
export const getLocations = (city?: string | number) => {
	return async function (dispatch: Dispatch) {
		try {
			const locations = await axios.get(`/api/locations?city=${city || ''}`);
			dispatch({
				type: ActionType.GET_LOCATIONS,
				payload: locations.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
};

export const postCreateEvent = (payload: any) => {
	return async function () {
		try {
			const response = await axios.post('/api/event', payload);
			return response;
		} catch (error) {
			console.log(error);
		}
	};
};

/* action for the component comments */

export const clearComment = () => {
	return {
		type: ActionType.GET_COMMENTS,
		payload: undefined,
	};
};

export const getComments = (id: string | number) => {
	return async function (dispatch: Dispatch) {
		try {
			const eventId = await axios.get(`/api/comments/${id}`);
			dispatch({
				type: ActionType.GET_COMMENTS,
				payload: eventId.data,
			});
		} catch (error) {
			console.error('Error la acciones de CommentsId');
		}
	};
};

export const postCreateComments = (payload: any) => {
	return async function () {
		try {
			const response = await axios.post('/api/comment', payload);
			return response;
		} catch (error) {
			console.log(error);
		}
	};
};

export const getSearchUser = (user: any) => {
	return { type: ActionType.SEARCH_USER, payload: user.data };
};

export const getFilterUsers = (user: any) => {
	return { type: ActionType.GET_FILTER_USER, payload: user.data };
};
