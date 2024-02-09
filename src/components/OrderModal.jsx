import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { isEmail, isNotEmpty } from "../util/validation";
import useInput from "../hooks/useInput";
import Input from "./Input";
import { useDispatch } from "react-redux";
import { bookedSeatsActions } from "../store/seats";

const OrderModal = forwardRef(function OrderModal({ selectedSeat }, ref) {
  const dispatch = useDispatch();
  const dialog = useRef();
  const [details, setDetails] = useState(null);

  const {
    value: emailValue,
    handleInputBlur: handleEmailBlur,
    handleInputChange: handleEmailChange,
    hasError: emailError,
  } = useInput(
    details != null ? details.email : "",
    (value) => isEmail(value) && isNotEmpty(value)
  );

  const {
    value: firstNameValue,
    handleInputBlur: handleFirstNameBlur,
    handleInputChange: handleFirstNameChange,
    hasError: firstNameError,
  } = useInput(details != null ? details.firstName : "", (value) =>
    isNotEmpty(value)
  );

  const {
    value: lastNameValue,
    handleInputBlur: handleLastNameBlur,
    handleInputChange: handleLastNameChange,
    hasError: lastNameError,
  } = useInput(details != null ? details.lastName : "", (value) =>
    isNotEmpty(value)
  );

  useImperativeHandle(ref, () => {
    return {
      open(details) {
        if (details) {
          setDetails(details);
        } else {
          setDetails(null);
        }
        dialog.current.showModal();
      },
    };
  });

  // useEffect(() => {
  //   if (details != null) {
  //   }
  // }, []);

  const handleClose = () => {
    setDetails(null);
    handleFirstNameChange();
    handleLastNameChange();
    handleEmailChange();
    dialog.current.close();
  };

  const handleSave = () => {
    console.log(selectedSeat);
    if (firstNameError || lastNameError || emailError) {
      return;
    }
    console.log("Saved");
    const data = {
      name: firstNameValue + " " + lastNameValue,
      email: emailValue,
      seatNo: selectedSeat,
      date: Date.now(),
    };
    if (details == null) {
      dispatch(bookedSeatsActions.bookSeat(data));
    } else {
      dispatch(bookedSeatsActions.updateSeat(data));
    }
    dispatch(bookedSeatsActions.selectSeat(null));
    // dispatch(SeatMapActions.bookSeat(selectedSeat));
    handleClose();
  };

  return createPortal(
    <dialog ref={dialog} className="modal">
      <div className="modal-content">
        <form>
          <h3 style={{ textAlign: "center", paddingBottom: "10px" }}>
            {details == null ? "Book Ticket" : "Edit Reservation"}
          </h3>

          <Input
            id={"firstName"}
            label={"First Name"}
            type="text"
            name="firstName"
            error={firstNameError && "First Name is required!"}
            value={firstNameValue}
            onBlur={handleFirstNameBlur}
            onChange={handleFirstNameChange}
          />

          <Input
            id={"lastName"}
            label={"Last Name"}
            type="text"
            name="lastName"
            error={lastNameError && "Last Name is required!"}
            value={lastNameValue}
            onBlur={handleLastNameBlur}
            onChange={handleLastNameChange}
          />

          <Input
            id={"email"}
            label={"Email"}
            type="email"
            name="email"
            error={emailError && "Please enter a valid email!"}
            value={emailValue}
            onBlur={handleEmailBlur}
            onChange={handleEmailChange}
          />
        </form>

        <div className="btnForm">
          <button className="closeBtn" onClick={handleClose}>
            Close
          </button>
          <button
            className="closeBtn"
            onClick={handleSave}
            style={{
              marginLeft: "10px",
              backgroundColor: "darkblue",
              color: "white",
            }}
          >
            {details == null ? "Book" : "Save"}
          </button>
        </div>
      </div>
    </dialog>,
    document.getElementById("modal")
  );
});

export default OrderModal;
