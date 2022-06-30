import { apiSlice } from "../authentication/apiSlice";
import { getAllProvinces } from "../adminPanelSlice";

export const pronvicesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
      getProvinces: builder.mutation<any, { limit: string, offset: string}>({
			query: ({ limit, offset }) =>{
        let url = `/api/cities?limit=${limit}&offset=${offset}`;
        return{
          url,
        }
      } ,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try{
          const { data } = await queryFulfilled
          dispatch(getAllProvinces(data))
        }catch(err){
          console.log('Error fetching post!')
          console.log(err)
        }
      }
		}),
    getAllProvince: builder.query<any,({ _: string })>({
      query: ({ _ }) =>  '/api/cities'
    })
  })
})

export const{
  useGetProvincesMutation,
  useGetAllProvinceQuery,
} = pronvicesApiSlice