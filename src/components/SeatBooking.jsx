import { useEffect, useRef, useState } from "react";
import Seat from "./Seat";
import classes from "./SeatBooking.module.css";
import carHandleImg from "../assets/car_handle.png";
import OrderModal from "./OrderModal";
import { useSelector } from "react-redux";
import Seats from "./Seats";

const SEAT_MAP = {
  upper: {
    A: [
      { id: "UA1", booked: false },
      { id: "UA2", booked: false },
      { id: "UA3", booked: false },
      { id: "UA4", booked: false },
      { id: "UA5", booked: false },
      { id: "UA6", booked: false },
    ],
    B: [
      { id: "UB1", booked: false },
      { id: "UB2", booked: false },
      { id: "UB3", booked: false },
      { id: "UB4", booked: false },
      { id: "UB5", booked: false },
      { id: "UB6", booked: false },
    ],
    C: [
      { id: "UC1", booked: false },
      { id: "UC2", booked: false },
      { id: "UC3", booked: false },
      { id: "UC4", booked: false },
      { id: "UC5", booked: false },
      { id: "UC6", booked: false },
    ],
    S: [
      { id: "US1", booked: false },
      { id: "US2", booked: false },
    ],
  },
  lower: {
    A: [
      { id: "LA1", booked: false },
      { id: "LA2", booked: false },
      { id: "LA3", booked: false },
      { id: "LA4", booked: false },
      { id: "LA5", booked: false },
      { id: "LA6", booked: false },
    ],
    B: [
      { id: "LB1", booked: false },
      { id: "LB2", booked: false },
      { id: "LB3", booked: false },
      { id: "LB4", booked: false },
      { id: "LB5", booked: false },
      { id: "LB6", booked: false },
    ],
    C: [
      { id: "LC1", booked: false },
      { id: "LC2", booked: false },
      { id: "LC3", booked: false },
      { id: "LC4", booked: false },
      { id: "LC5", booked: false },
      { id: "LC6", booked: false },
    ],
    S: [
      { id: "LS1", booked: false },
      { id: "LS2", booked: false },
    ],
  },
};

const SeatBooking = () => {
  const orderDialog = useRef();

  const [seatMap, setSeatMap] = useState({ ...SEAT_MAP });

  const bookedSeats = useSelector((state) => state.seats.bookedSeats);
  const selectedSeat = useSelector((state) => state.seats.selectedSeat);

  useEffect(() => {
    const initialSeatMap = JSON.parse(JSON.stringify(SEAT_MAP));
    console.log(bookedSeats);
    console.log({ ...SEAT_MAP });
    for (let seat of bookedSeats) {
      const seatNo = seat.seatNo;
      const seatNoArr = seatNo.split("");
      const deck = seatNoArr[0] == "U" ? "upper" : "lower";
      const row = seatNoArr[1];
      const seatArr = [...initialSeatMap[deck][row]];
      const index = seatArr.findIndex((seat) => seat.id == seatNo);
      seatArr[index].booked = true;
      initialSeatMap[deck][row] = [...seatArr];
    }
    setSeatMap({ ...initialSeatMap });
  }, [bookedSeats]);

  const openBookingDialog = () => {
    orderDialog.current.open();
  };

  return (
    <>
      <OrderModal selectedSeat={selectedSeat} ref={orderDialog} />
      {selectedSeat && (
        <button
          onClick={openBookingDialog}
          style={{
            float: "right",
            backgroundColor: "darkblue",
            color: "white",
          }}
        >
          Book
        </button>
      )}
      <h3>Lower Deck</h3>
      <div className={classes.deck}>
        <div className={classes.carHandle}>
          <img
            width={40}
            height={40}
            src={carHandleImg}
            alt="Car handle icon"
          />
        </div>
        <div className={classes.seatContainer}>
          <Seats seats={seatMap.lower.A} />
          <Seats seats={seatMap.lower.B} />
          <Seats style={{ marginTop: "auto" }} seats={seatMap.lower.C} />
        </div>
        <div className={classes.sideSeats} style={{ marginLeft: "auto" }}>
          <Seats seats={seatMap.lower.S} vertical />
        </div>
      </div>

      <h3>Upper Deck</h3>
      <div className={classes.deck}>
        <div
          className={classes.carHandle}
          style={{ width: "40px", border: 0 }}
        ></div>
        <div className={classes.seatContainer}>
          <Seats seats={seatMap.upper.A} />
          <Seats seats={seatMap.upper.B} />
          <Seats style={{ marginTop: "auto" }} seats={seatMap.upper.C} />
        </div>

        <div className={classes.sideSeats} style={{ marginLeft: "auto" }}>
          <Seats seats={seatMap.upper.S} vertical />
        </div>
      </div>
    </>
  );
};

export default SeatBooking;
