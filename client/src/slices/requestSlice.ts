import { createSlice } from "@reduxjs/toolkit";
import { State } from "../redux/store/store";

const requestSlice = createSlice({
  name: 'requests',
  initialState:{requests: null},
  reducers:{
    setRequests: (state, action) => {
      state.requests = action.payload
    }
  },
})

export const { setRequests } = requestSlice.actions
export default requestSlice.reducer

export const selectUserRequests = (state: State) => state.requests.requests
