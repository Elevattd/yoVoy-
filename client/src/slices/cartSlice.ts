import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
	cartTickets: [],
};
localStorage.getItem('cartTickets')
	? (initialState.cartTickets = JSON.parse(
			localStorage.getItem('cartTickets') as any,
	  ))
	: (initialState.cartTickets = []);

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		UPDATE_CART: (state, action) => {
			state.cartTickets = [...action.payload];
		},
	},
});

export const { UPDATE_CART } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartTickets = (state: any) => state.cart.cartTickets;
