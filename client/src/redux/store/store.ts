import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "../../slices/authentication/authSlice";
import rootReducer from '../reducer/reducer'
import uiSliceReducer from '../../slices/uiSlice'
import { apiSlice } from "../../slices/authentication/apiSlice";
import adminPanelReducer from '../../slices/adminPanelSlice'
import cartSliceReducer from '../../slices/cartSlice'
import requestSliceReducer from '../../slices/requestSlice'

export const store = configureStore({
    reducer:{
      global: rootReducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
      auth: authSliceReducer,
      ui: uiSliceReducer,
      admin: adminPanelReducer,
      cart:  cartSliceReducer,
      requests: requestSliceReducer
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

//se puede utilizar para el useSelector 
export type State = ReturnType<typeof store.getState>


// Se puede utilizar para el useDispatch
export type AppDispatch = typeof store.dispatch