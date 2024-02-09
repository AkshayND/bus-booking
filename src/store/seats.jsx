import { createSlice } from "@reduxjs/toolkit";

const initialBookedSeatsState = {
  selectedSeat: null,
  bookedSeats: [],
};

const bookedSeatsSlice = createSlice({
  name: "bookedSeats",
  initialState: initialBookedSeatsState,
  reducers: {
    bookSeat(state, action) {
      console.log("bookSeat");
      const details = action.payload;
      console.log(details);
      if (
        !state.bookedSeats.includes((seat) => seat.seatNo == details.seatNo)
      ) {
        console.log("added");
        state.bookedSeats.push(action.payload);
      }
      localStorage.setItem("bookedSeats", JSON.stringify(state.bookedSeats));
    },
    replaceSeats(state, action) {
      state.bookedSeats = action.payload;
    },
    updateSeat(state, action) {
      const details = action.payload;
      const index = state.bookedSeats.findIndex(
        (seat) => seat.seatNo == details.seatNo
      );
      console.log(index);
      const existingSeat = state.bookedSeats.find(
        (seat) => seat.seatNo == details.seatNo
      );
      console.log(details);
      console.log(existingSeat);
      if (existingSeat != null) {
        existingSeat.email = details.email;
        existingSeat.name = details.name;
      }
      localStorage.setItem("bookedSeats", JSON.stringify(state.bookedSeats));
    },
    deleteSeat(state, action) {
      const index = state.bookedSeats.findIndex(
        (seat) => seat.seatNo == action.payload
      );
      if (index >= 0) {
        state.bookedSeats.splice(index, 1);
      }
      localStorage.setItem("bookedSeats", JSON.stringify(state.bookedSeats));
    },
    selectSeat(state, action) {
      if (action.payload != null) {
        state.selectedSeat = action.payload;
      } else {
        state.selectedSeat = null;
      }
    },
  },
});

export const bookedSeatsActions = bookedSeatsSlice.actions;

export default bookedSeatsSlice.reducer;
