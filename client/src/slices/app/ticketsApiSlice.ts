import { apiSlice } from "../authentication/apiSlice";
import { getTickets } from "../../types";

export const eventsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getTicketsDetail: builder.query<any,{_: string}>({
      query: ({_}) => {
        return{
          url: '/api/tickets',
        }
      }
    }),
    getTicketDetail: builder.query<getTickets, { id: any }>({
			query(id) {
				return {
					url: `/api/ticket/${id}`,
				};
			},
		}),
  })
})

export const{
  useGetTicketsDetailQuery,
  useGetTicketDetailQuery
} = eventsApiSlice