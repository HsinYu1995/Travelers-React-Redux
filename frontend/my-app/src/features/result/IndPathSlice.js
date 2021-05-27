import { createSlice } from "@reduxjs/toolkit";
const initialState = { singlePath: "" };

export const IndPathSlice = createSlice({
  name: "setOnePath",
  initialState,
  reducers: {
    goToSinglePath: (state, action) => {
      state.singlePath = action.payload;
    },
  },
});
export const { goToSinglePath } = IndPathSlice.actions;
export const selectSinglePath = (state) => state.setOnePath.singlePath;
export default IndPathSlice.reducer;
