import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { bookedSeatsActions } from "../store/seats";

const ConfirmDeleteModal = forwardRef(function ConfirmDeleteModal(
  { selectedSeat },
  ref
) {
  const dialog = useRef();
  const dispatch = useDispatch();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  const handleClose = () => {
    dialog.current.close();
  };

  const handleSave = () => {
    console.log(selectedSeat);
    dispatch(bookedSeatsActions.deleteSeat(selectedSeat));
    // dispatch(SeatMapActions.bookSeat(selectedSeat));
    handleClose();
  };

  return createPortal(
    <dialog ref={dialog} className="modal">
      <div className="modal-content">
        <h3 style={{ paddingBottom: "10px" }}>Confirm Delete</h3>
        <p>Are you sure you want to delete the reservation?</p>

        <div className="btnForm">
          <button className="closeBtn" onClick={handleClose}>
            Close
          </button>
          <button
            className="closeBtn"
            onClick={handleSave}
            style={{
              marginLeft: "10px",
              backgroundColor: "#ff6464",
              color: "white",
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </dialog>,
    document.getElementById("modal")
  );
});

export default ConfirmDeleteModal;
