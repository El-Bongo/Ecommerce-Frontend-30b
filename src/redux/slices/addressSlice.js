import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allAddresses: [],
  filterAddress: [],
};

const addressSlices = createSlice ({
    name: "address",
  initialState,
  reducers:{
    getAddressData : ( state, {payload}) => {
        state.allAddresses = payload
    }
    }
})

export const { getAddressData } = addressSlices.actions;
export default addressSlices.reducer;