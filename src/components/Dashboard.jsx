import React, { useRef, useState } from "react";
import classes from "./Dashboard.module.css";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import OrderModal from "./OrderModal";
import ConfirmDeleteModal from "./ConfirmDelete";

export default function Dashboard() {
  const orderDialog = useRef();
  const deleteDialog = useRef();
  const [editedReservation, setEditedReservation] = useState();
  console.log(editedReservation);
  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  const bookedSeats = useSelector((state) => state.seats.bookedSeats);

  if (bookedSeats.length == 0) {
    return (
      <div style={{ display: "grid" }}>
        <div className={classes.card}>
          <h2>No Seats Booked!</h2>
          <p>Plesae book the tickets.</p>
          <NavLink className={classes.cta} to="/">
            Book Tickets
          </NavLink>
        </div>
      </div>
    );
  }

  const handleEdit = (seat) => {
    const changedSeat = { ...seat };
    const [firstName, lastName] = changedSeat.name.split(" ");
    changedSeat["firstName"] = firstName;
    changedSeat.lastName = lastName;
    setEditedReservation(changedSeat);
    seat = { ...changedSeat };
    orderDialog.current.open(changedSeat);
    // setEditedReservation(null);
  };

  const handleDelete = (seat) => {
    setEditedReservation(seat);
    deleteDialog.current.open();
  };

  return (
    <>
      <OrderModal
        key={"editedReservation"}
        ref={orderDialog}
        details={editedReservation}
        selectedSeat={editedReservation ? editedReservation.seatNo : ""}
      />
      <ConfirmDeleteModal
        key={"deleteDialog"}
        ref={deleteDialog}
        selectedSeat={editedReservation ? editedReservation.seatNo : ""}
      />
      <div className="table-container">
        <h2>Booking Details</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Email</th>
              <th>Name</th>
              <th>Seat No</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {bookedSeats.map((seat) => (
              <tr key={seat.seatNo}>
                <td>{new Date(seat.date).toLocaleString("en-GB", options)}</td>
                <td>{seat.email}</td>
                <td>{seat.name}</td>
                <td>{seat.seatNo}</td>
                <td style={{ width: "130px" }}>
                  <button
                    className={classes.editBtn}
                    onClick={() => handleEdit(seat)}
                  >
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <button
                    className={classes.deleteBtn}
                    onClick={() => handleDelete(seat)}
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
