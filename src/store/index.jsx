import { configureStore } from "@reduxjs/toolkit";
import seatsReducer from "./seats";

const store = configureStore({
  reducer: { seats: seatsReducer },
});

export default store;
