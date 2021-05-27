import { configureStore } from "@reduxjs/toolkit";
import routeReducer from "../features/Route/RouteSlice";
import singlePathReducer from "../features/result/IndPathSlice";

export const store = configureStore({
  reducer: {
    setPath: routeReducer,
    setOnePath: singlePathReducer,
  },
});
