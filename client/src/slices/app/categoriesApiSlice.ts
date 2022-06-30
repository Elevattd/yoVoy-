import { apiSlice } from "../authentication/apiSlice";
import { postCategory, Category } from "../../types";

export const eventsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createCategory: builder.mutation<postCategory,{category: string}>({
      query: ({category}) => {
        return{
          url: '/api/category',
          method:'POST',
          body: {name: category}
        }
      }
    }),
    getCategories: builder.query<any,({ _: string })>({
      query: ({ _ }) =>  '/api/categories'
    }),
    getCategory: builder.query<Category, { id: any }>({
      query(id) {
        return {
          url: `/api/category/${id}`
        }
      }
    }),
    updateCategory: builder.mutation<Category[], { id: any; updateCategory: any }>({
			query: ({ id, ...updateCategory }) => {
				return {
					url: `api/category/${id}`,
					method: `PUT`,
					body: { ...updateCategory },
				};
			},
		}),
    deleteCategory: builder.mutation<Category, { id: any }>({
			query(id) {
				return {
					url: `api/category/${id}`,
					method: `Delete`,
				};
			},
		}),
  })
})

export const{
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
  useGetCategoryQuery,
  useDeleteCategoryMutation,
} = eventsApiSlice