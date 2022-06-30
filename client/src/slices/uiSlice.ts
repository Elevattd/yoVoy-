import { createSlice } from "@reduxjs/toolkit";
import { State } from "./../redux/store/store";

const uiSlice = createSlice({
  name: 'ui',
  initialState:{isLoading: false},
  reducers:{
    isLoadingOn:(state) => {
      state.isLoading = true
    },
    isLoadingOff:(state) => {
      state.isLoading = false
    },
    getState: (state) => state
  },
})

export const { isLoadingOn, isLoadingOff} = uiSlice.actions
export default uiSlice.reducer

export const selectIsLoading = (state: State) => state.ui.isLoading