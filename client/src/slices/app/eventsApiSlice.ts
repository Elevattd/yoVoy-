import { apiSlice } from '../authentication/apiSlice';
import { Event } from '../../types';

export const eventsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		updateEvent: builder.mutation<Event, { id: string; updatedEvent: any }>({
			query: ({ id, updatedEvent }) => {
				// do something
				return {
					url: `/api/event/${id}`,
					method: `PUT`,
					body: { ...updatedEvent },
				};
			},
		}),
    updateEventRequest: builder.mutation<any, {description: any, body: any}>({
      query: ({description, body}) => {
        console.log({description, type:'event', method:'PUT', body})
        return {
          url: '/api/request',
          method: 'POST',
          body:{
            description,
            type: 'event',
            method: 'PUT',
            body
          },
        };
      }
    }),
    deleteEventRequest: builder.mutation<any, {description: any, body: any}>({
      query: ({description, body}) => {
        console.log({description, type:'event', method:'PUT', body})
        return {
          url: '/api/request',
          method: 'POST',
          body:{
            description,
            type: 'event',
            method: 'DELETE',
            body
          },
        };
      }
    }),
		getEvents: builder.query<Event[] | any, { _: string }>({
			query: ({ _ }) => '/api/events',
		}),
		addEventToFavorite: builder.mutation<Event, { eventId: string }>({
			query: ({ eventId }) => {
				// do something
				return {
					url: `api/user/favorite/${eventId}`,
					method: `POST`,
				};
			},
		}),
		createEvent: builder.mutation<Event, { newEvent: any }>({
			query: ({ newEvent }) => {
				// do something
				return {
					url: `/api/event`,
					method: `POST`,
					body: { ...newEvent },
				};
			},
		}),
		getEvent: builder.query<any, { id: string }>({
			query: ({ id }) => {
				console.log({ id });
				return {
					url: `api/event/${id}`,
				};
			},
		}),
		deleteEvent: builder.mutation<Event, { id: number }>({
			query(id) {
				return {
					url: `api/event/${id}`,
					method: `Delete`,
				};
			},
		}),
	}),
});

export const {
	useUpdateEventMutation,
	useCreateEventMutation,
	useGetEventQuery,
	useGetEventsQuery,
	useDeleteEventMutation,
	useAddEventToFavoriteMutation,
  useUpdateEventRequestMutation,
  useDeleteEventRequestMutation
} = eventsApiSlice;
