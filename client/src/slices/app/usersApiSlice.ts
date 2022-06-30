import { apiSlice } from '../authentication/apiSlice';
import { User, Event, putRolUser } from '../../types';
import { getAllBanned, getAllUsers } from '../adminPanelSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getFavorites: builder.query<any, { _: string }>({
			query: ({ _ }) => '/api/user/favorites',
		}),
		getUsers: builder.mutation<
			any,
			{ limit: string; offset: string; email?: string; order?: string }
		>({
			query: ({ limit, offset, email = '', order = '' }) => {
				let url = `/api/users?limit=${limit}&offset=${offset}`;
				if (email.length) url += `&email=${email}`;
				if (order.length) url += `&order=${order}`;
				return {
					url,
				};
			},
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(getAllUsers(data));
				} catch (err) {
					console.log('Error fetching post!');
					console.log(err);
				}
			},
		}),
		getBanned: builder.mutation<
			any,
			{ limit: string; offset: string; email?: string}
		>({
			query: ({ limit, offset, email = ''}) => {
				let url = `/api/users/banned?limit=${limit}&offset=${offset}`;
				if (email.length) url += `&email=${email}`;
				return {
					url,
				};
			},
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(getAllBanned(data));
				} catch (err) {
					console.log('Error fetching post!');
					console.log(err);
				}
			},
		}),
		getUser: builder.query<User, { id: any }>({
			query(id) {
				console.log(id);
				return {
					url: `/api/users/${id}`,
				};
			},
		}),
		getUserData: builder.query<any, { _: string }>({
			query: ({ _ }) => '/api/user/information',
		}),
		getTickets: builder.query<any, { _: string }>({
			query: ({ _ }) => '/api/user/tickets',
		}),
		updateUser: builder.mutation<User[], { id: any; updateUser: any }>({
			query: ({ id, ...updateUser }) => {
				return {
					url: `api/users/${id}`,
					method: `PUT`,
					body: { ...updateUser },
				};
			},
		}),
		updateRolUser: builder.mutation<putRolUser, { userId: any; roleId: any }>({
			query: ({ userId, roleId }) => {
				console.log('asdgagasdg:', userId, 'gfsadgagagd:', roleId);
				return {
					url: `api/user/role`,
					method: `PUT`,
					body: { userId: userId, roleId: roleId },
				};
			},
		}),
		putPassword: builder.mutation<putRolUser, { userId: any }>({
			query: ({ userId }) => {
				return {
					url: `api/user/resetPassword`,
					method: `PUT`,
					body: { userId: userId },
				};
			},
		}),
		deleteUser: builder.mutation<User, { id: number }>({
			query(id) {
				return {
					url: `api/users/${id}`,
					method: `Delete`,
				};
			},
		}),
		unbanUser: builder.mutation<User, { email: string }>({
			query({ email }) {
				return {
					url: `api/users/_?unban=true`,
					method: `Delete`,
					body: { email },
				};
			},
		}),
		deleteEventToFavorite: builder.mutation<Event, { id: number }>({
			query(id) {
				return {
					url: `api/user/favorites/${id}`,
					method: `Delete`,
				};
			},
		}),
		getFavorite: builder.query<any, { id: any }>({
			query(id) {
				return {
					url: `/api/user/favorites/${id}`,
				};
			},
		}),
		changePassword: builder.mutation<
			any,
			{ password: string; newPassword: string }
		>({
			query({ password, newPassword }) {
				return {
					url: `/api/auth/user/change-password`,
					method: `PUT`,
					body: { password, newPassword },
				};
			},
		}),

		createCheckoutPayment: builder.mutation<Event, { newPayment: any }>({
			query: ({ newPayment }) => {
				// do something
				return {
					url: `/api/process-payment`,
					method: `POST`,
					body: { ...newPayment },
				};
			},
		}),
	}),
});

export const {
	useGetUsersMutation,
	useGetFavoritesQuery,
	useGetUserQuery,
	useGetUserDataQuery,
	useDeleteUserMutation,
	useUpdateUserMutation,
	useGetTicketsQuery,
	useUpdateRolUserMutation,
	usePutPasswordMutation,
	useDeleteEventToFavoriteMutation,
	useGetFavoriteQuery,
	useUnbanUserMutation,
	useChangePasswordMutation,
	useCreateCheckoutPaymentMutation,
  useGetBannedMutation
} = usersApiSlice;
