import { apiSlice } from '../authentication/apiSlice';
import { postOrganization, getOrganization } from '../../types';
import { getAllOrganizations } from '../adminPanelSlice';

export const eventsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createOrganization: builder.mutation<
			postOrganization,
			{ organization: string }
		>({
			query: ({ organization }) => {
				return {
					url: '/api/organization',
					method: 'POST',
					body: { name: organization },
				};
			},
		}),
		getOrganizations: builder.mutation<any, { limit: string, offset: string}>({
			query: ({ limit, offset }) =>{
        let url = `/api/organizations?limit=${limit}&offset=${offset}`;
        return{
          url,
        }
      } ,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try{
          const { data } = await queryFulfilled
          dispatch(getAllOrganizations(data))
        }catch(err){
          console.log('Error fetching post!')
          console.log(err)
        }
      }
		}),
		getOrganization: builder.query<any, { id: any }>({
			query(id) {
				return {
					url: `/api/organization/${id}`,
				};
			},
		}),
		getOrganizationEvents: builder.query<any, { _: string }>({
			query: ({ _ }) => '/api/organization/events',
		}),
		updateOrganization: builder.mutation<
			getOrganization,
			{ id: any; updateOrganization: any }
		>({
			query: ({ id, ...updateOrganization }) => {
				return {
					url: `api/organization/${id}`,
					method: `PUT`,
					body: { ...updateOrganization },
				};
			},
		}),
		deleteOrganization: builder.mutation<
			postOrganization,
			{ id: number | string }
		>({
			query(id) {
				return {
					url: `api/organization/${id}`,
					method: `Delete`,
				};
			},
		}),
    createOrganizationRequest: builder.mutation<any, {description: any, body: any}>({
      query: ({description, body}) => {
        return {
          url: '/api/request',
          method: 'POST',
          body:{
            description,
            type: 'organization',
            method: 'POST',
            body
          },
        };
      }
    })
	}),
});

export const {
	useCreateOrganizationMutation,
  useCreateOrganizationRequestMutation,
	useGetOrganizationsMutation,
	useGetOrganizationQuery,
	useUpdateOrganizationMutation,
	useDeleteOrganizationMutation,
	useGetOrganizationEventsQuery,
} = eventsApiSlice;
