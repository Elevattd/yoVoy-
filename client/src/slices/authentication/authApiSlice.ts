import { apiSlice } from "./apiSlice";
import { logOut, setCredentials } from './authSlice';
import { isLoadingOff, isLoadingOn } from "../uiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: '/api/auth/user/login',
        method: 'POST',
        body: { ...credentials }
      })
    }),
    getUserAuth: builder.query<any, void>({
      query: () => '/api/auth/user/get-auth',
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        // `onStart` side-effect
        dispatch(isLoadingOn())
        try {
          const { data } = await queryFulfilled
          // `onSuccess` side-effect
          dispatch(setCredentials({ user: data?.data, accessToken: data?.accessToken, authFetched: true }))
          dispatch(isLoadingOff())
        } catch (err) {
          // `onError` side-effect
          dispatch(setCredentials({user: null, accesToken: null, authFetched: true}))
          dispatch(isLoadingOff())
          console.log('Error fetching post!')
        }
      },
    }),
    register: builder.mutation({
      query: credentials => ({
        url: '/api/auth/user/register',
        method: 'POST',
        body: { ...credentials }
      })
    }),
    logout: builder.mutation<any,void>({
      query: () => '/api/auth/user/logout',
      async onQueryStarted(_,{dispatch,queryFulfilled}){
        try{
          await queryFulfilled
          console.log('asd')
          dispatch(logOut())
        } catch(err){console.log(err)}
      }
    }),
    recoverPassword: builder.mutation({
      query: credentials => ({
        url: '/api/auth/user/recover-password',
        method: 'PUT',
        body: { ...credentials }
      })
    }),
  })
})

export const {
  useLoginMutation,
  useGetUserAuthQuery,
  useRegisterMutation,
  useLogoutMutation,
  useRecoverPasswordMutation
} = authApiSlice