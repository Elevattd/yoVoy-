import { ActionType } from './index';

interface GetAllEventAction {
	type: ActionType.GET_ALL_EVENT;
	payload: any; // Se deja any para que no tire error pero especificar que tipo de datos va a manejar. ejemplo payload: string | number
}

interface GetSearchAction {
	type: ActionType.SEARCH_EVENT;
	payload: any;
}

interface getEventIdAction {
	type: ActionType.GET_EVENT_ID;
	payload: any;
}

interface clearEventIdAction {
	type: ActionType.CLEAR_EVENT_ID;
}

interface getCategoriesAction {
	type: ActionType.GET_CATEGORIES;
	payload: any;
}

interface getEventByCategoryAction {
	type: ActionType.GET_EVENT_BY_CATEGORY;
	payload: any;
}

interface getCitiesAction {
	type: ActionType.GET_CITIES;
	payload: any;
}

interface putUpdateEvent {
	type: ActionType.PUT_UPDATE_EVENT;
}

interface postCreateCategory {
	type: ActionType.POST_CREATE_CATEGORY;
}

interface getLocationsAction {
	type: ActionType.GET_LOCATIONS;
	payload: any;
}

interface postCreateEvent {
	type: ActionType.POST_CREATE_EVENT;
}

interface getDonEventsAction {
	type: ActionType.DONT_EVENTS;
	payload: any;
}
interface getComments {
	type: ActionType.GET_COMMENTS;
	payload: any;
}
interface postCreateComments {
	type: ActionType.POST_CREATE_COMMENTS;
	payload: any;
}

interface getSearchUserAction {
	type: ActionType.SEARCH_USER;
	payload: any;
}

interface getFilterUserAction {
	type: ActionType.GET_FILTER_USER;
	payload: any;
}

export type Action =
	| GetAllEventAction
	| GetSearchAction
	| getEventIdAction
	| clearEventIdAction
	| getCategoriesAction
	| getEventByCategoryAction
	| getCitiesAction
	| putUpdateEvent
	| postCreateCategory
	| getLocationsAction
	| postCreateEvent
	| getComments
	| postCreateComments
	| getDonEventsAction
	| getSearchUserAction
	| getFilterUserAction
