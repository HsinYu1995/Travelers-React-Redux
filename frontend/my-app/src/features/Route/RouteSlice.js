import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userFirstName: "N/A",
  userLastName: "N/A",
  email: "N/A",
  path: "",
  search: false,
};
export const RouteSlice = createSlice({
  name: "setPath",
  initialState,
  reducers: {
    putSpecificPath: (state, action) => {
      state.path = action.payload.path;
      state.search = action.payload.search;
    },

    removeSpecificPath: (state) => {
      state.path = "";
    },
  },
});
export const { putSpecificPath, removeSpecificPath } = RouteSlice.actions;
export const selectUserFirstName = (state) => state.setPath.userFirstName;
export const selectUserLastName = (state) => state.setPath.userLastName;
export const selectUserEmail = (state) => state.setPath.email;
export const selectUserPath = (state) => state.setPath.path;
export const selectUserSearch = (state) => state.setPath.search;
export default RouteSlice.reducer;
