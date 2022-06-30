import { apiSlice } from "../authentication/apiSlice";
import { Location } from '../../types'
import { getAllLocations } from "../adminPanelSlice";


export const locationsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getLocations: builder.mutation<any, { limit: string, offset: string}>({
			query: ({ limit, offset }) =>{
        let url = `/api/locations?limit=${limit}&offset=${offset}`;
        return{
          url,
        }
      } ,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try{
          const { data } = await queryFulfilled
          dispatch(getAllLocations(data))
        }catch(err){
          console.log('Error fetching post!')
          console.log(err)
        }
      }
		}),
    getAlllcation: builder.query<any,({ _: string })>({
      query: ({ _ }) =>  '/api/locations'
    }),
    getLocation: builder.query<any, { id: any }>({
      query(id) {
        return {
          url: `/api/location/${id}`
        }
      }
    }),
    updateLocation: builder.mutation<any, { id: any; updateLocation: any }>({
			query: ({ id, ...updateLocation }) => {
				return {
					url: `api/location/${id}`,
					method: `PUT`,
					body: { ...updateLocation },
				};
			},
		}),
    createLocacion: builder.mutation<any,{name: any, latitude: any, longitude: any, address:any, cityId: any}>({
      query: ({name, latitude, longitude, address, cityId}) => {
        return{
          url: '/api/location',
          method:'POST',
          body: {
            name, 
            latitude, 
            longitude, 
            address, 
            cityId
          }
        }
      }
    }),
  })
})

export const{
  useGetLocationsMutation,
  useGetAlllcationQuery,
  useUpdateLocationMutation,
  useGetLocationQuery,
  useCreateLocacionMutation,
} = locationsApiSlice
