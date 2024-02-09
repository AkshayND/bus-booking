import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";
// import FilterModal from "./FilterModal";

export default function Header() {
  return (
    <header>
      <div className={classes.dropdown}>
        <button className={classes.dropbtn}>
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className={classes["dropdown-content"]}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            Book Tickets
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            Dashboard
          </NavLink>
        </div>
      </div>
      {/* <FilterModal ref={dialog} /> */}
    </header>
  );
}
