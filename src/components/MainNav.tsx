import style from "./MainNav.module.css";
import { Link } from "react-router-dom";

function MainNav() {
  return (
    <>
      <h3>Nav</h3>
      <nav>
        <ul>
          <li>
            <Link to="/">All Events</Link>
          </li>
          <li>
            <Link to="/add-event">Add Event</Link>
          </li>
          <li>
            <Link to="/favorites">Favorites</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default MainNav;
