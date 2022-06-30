import { apiSlice } from "../authentication/apiSlice";
import { setRequests } from "../requestSlice";

export const eventsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getRequests: builder.query<any,({ _: string })>({
      query: ({ _ }) =>  '/api/requests'
    }),
    updateRequests: builder.mutation<any, { id: any; status: string }>({
			query: ({ id, ...status }) => {
				return {
					url: `api/request/${id}`,
					method: `PUT`,
					body: status,
				};
			},
		}),
    getRequest: builder.query<any, { id: any }>({
      query(id) {
        return {
          url: `/api/request/${id}`
        }
      }
    }),
    getUserRequests: builder.mutation<any,any>({
        query: () => `/api/user/requests`,
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          try{
            const { data } = await queryFulfilled
            console.log(data)
            dispatch(setRequests(data))
          }catch(err){
            console.log('Error fetching post!')
            console.log(err)
          }
        }
    }),
  })
})

export const{
  useGetRequestQuery,
  useGetRequestsQuery,
  useUpdateRequestsMutation,
  useGetUserRequestsMutation
} = eventsApiSlice