import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import SeatBooking from "./components/SeatBooking";
import Layout from "./components/Layout";
import Error from "./components/Error";
import Dashboard from "./components/Dashboard";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { bookedSeatsActions } from "./store/seats";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <SeatBooking /> },
      { path: "dashboard", element: <Dashboard /> },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const seats = JSON.parse(localStorage.getItem("bookedSeats"));
    if (seats) {
      dispatch(bookedSeatsActions.replaceSeats(seats));
    }
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
