import React from "react";
import classes from "./Seats.module.css";
import Seat from "./Seat";

export default function Seats({ seats, vertical = false, ...props }) {
  if (vertical) {
    return (
      <>
        {seats.map((seat) => (
          <Seat key={seat.id} booked={seat.booked} seatId={seat.id} vertical />
        ))}
      </>
    );
  }

  return (
    <div className={classes.seats} {...props}>
      {seats.map((seat) => (
        <Seat key={seat.id} booked={seat.booked} seatId={seat.id} />
      ))}
    </div>
  );
}
