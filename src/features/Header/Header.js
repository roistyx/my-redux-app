import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../Auth/authSlice";

import "./Header.css";

export default function Header() {
  const dispatch = useDispatch();

  const { username, isLoggedIn } = useSelector((state) => state.auth);
  const { searchQuery } = useSelector((state) => state.search);
  const { datesQuery } = useSelector((state) => state.search);

  return (
    <nav className="header">
      <div className="welcome-message">
        Hi {isLoggedIn ? username : "Guest"}!
      </div>
      <span className="search-query">Search:{searchQuery}</span>
      <span className="search-query">Dates:{datesQuery}</span>
      <button
        onClick={() => {
          dispatch(logoutUser());
        }}>
        Logout
      </button>
    </nav>
  );
}
