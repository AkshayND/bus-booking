import { bookedSeatsActions } from "../store/seats";
import classes from "./Seat.module.css";
import { useSelector, useDispatch } from "react-redux";

const Seat = ({ booked, seatId, vertical = false }) => {
  const selectedSeat = useSelector((state) => state.seats.selectedSeat);
  const dispatch = useDispatch();

  const selected = selectedSeat == seatId;

  let className = classes.seat;
  if (booked) {
    className += " " + classes.booked;
  } else if (selected) {
    className += " " + classes.selected;
  }

  if (vertical) {
    className += " " + classes.vertical;
  }

  const handleSelect = () => {
    if (booked) {
      return;
    }
    if (selected) {
      dispatch(bookedSeatsActions.selectSeat(null));
    } else {
      dispatch(bookedSeatsActions.selectSeat(seatId));
    }
  };

  return (
    <div className={className} onClick={handleSelect}>
      <div className={classes.seatEnd}></div>
    </div>
  );
};

export default Seat;
