// import { Action } from 'history';
import { count } from 'console';
import { ActionType } from '../actions';
import { Action } from '../actions/action-Type';

const initialState = {
	allEvents: {},
	eventDetail: [],
	categories: [],
	cities: [],
	locations: [],
	allComments: [],
	userSearch: [],
	cartLength: false,

	// 	eventsFiltered: [],
};

const rootReducer = (state = initialState, action: Action) => {
	switch (action.type) {
		case ActionType.GET_ALL_EVENT:
			return {
				...state,
				allEvents: { count: action.payload.count, events: action.payload.rows },
			};
		// case ActionType.EVENT  ejemplo de case.
		case ActionType.SEARCH_EVENT:
			return {
				...state,
				allEvents: { count: action.payload.count, events: action.payload.rows },
			};
		case ActionType.GET_EVENT_ID:
			return {
				...state,
				eventDetail: action.payload,
			};
		case ActionType.CLEAR_EVENT_ID:
			return {
				...state,
				eventDetail: [],
			};
		case ActionType.GET_CATEGORIES:
			return {
				...state,
				categories: action.payload,
			};
		case ActionType.GET_EVENT_BY_CATEGORY:
			return {
				...state,
				allEvents: { count: action.payload.count, events: action.payload.rows },
			};
		case ActionType.GET_CITIES:
			return {
				...state,
				cities: action.payload,
			};
		case ActionType.POST_CREATE_CATEGORY:
			return {
				...state,
			};
		case ActionType.GET_LOCATIONS:
			return {
				...state,
				locations: action.payload,
			};
		case ActionType.PUT_UPDATE_EVENT:
			return {
				...state,
			};
		case ActionType.POST_CREATE_EVENT:
			return {
				...state,
			};
		case ActionType.DONT_EVENTS:
			return {
				...state,
				allEvents: { events: action.payload },
			};

		case ActionType.GET_COMMENTS:
			return {
				...state,
				allComments: action.payload,
			};
		case ActionType.POST_CREATE_COMMENTS:
			return {
				...state,
			};

		case ActionType.SEARCH_USER:
			return {
				...state,
				userSearch: action.payload,
			};
		case ActionType.GET_FILTER_USER:
			return {
				...state,
				userSearch: action.payload,
			};
		default:
			return state;
	}
};

export default rootReducer;
