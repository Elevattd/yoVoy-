import { createSlice } from "@reduxjs/toolkit";

const adminPanelSlice = createSlice({
  name: 'admin-panel',
  initialState:{AllUsers:null, AllOrganizations:null, AllLocations:null, AllProvinces:null, AllBanned: null},
  reducers:{
    getAllUsers:(state, action) => {
      state.AllUsers = action.payload
    },
    getAllOrganizations:(state,action)=>{
      state.AllOrganizations = action.payload
    },
    getAllLocations:(state,action)=>{
      state.AllLocations = action.payload
    },
    getAllProvinces:(state,action)=>{
      state.AllProvinces = action.payload
    },
    getAllBanned:(state,action)=>{
      state.AllBanned = action.payload
    }
  },
})

export const { getAllUsers, getAllOrganizations, getAllLocations, getAllProvinces, getAllBanned} = adminPanelSlice.actions
export default adminPanelSlice.reducer

export const selectAllUsers = (state: any) => state.admin.AllUsers
export const selectAllOrganizations = (state: any) => state.admin.AllOrganizations
export const selectAllLocations = (state: any) => state.admin.AllLocations
export const selectAllProvinces = (state: any) => state.admin.AllProvinces
export const selectAllBanned = (state: any) => state.admin.AllBanned