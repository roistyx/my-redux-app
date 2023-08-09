import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../Auth/authSlice";
import { Between } from "../../layouts/Line.js";
import Menu from "../../components/Menu.js";

import "./Header.css";

export default function Header() {
  const dispatch = useDispatch();

  const { username, isLoggedIn } = useSelector((state) => state.auth);
  const { symbol, stockData } = useSelector((state) => state.search);
  const { datesQuery } = useSelector((state) => state.search);

  const menuItems = [
    { name: "Home", link: "/" },
    { name: "News", link: "/news" },
    { name: "Search", link: "/search" },
    { name: "Login", link: "/login" },
  ];

  return (
    <Between>
      <div>Hi</div>

      <div>Search:{stockData.shortName}</div>
      <div>
        <Menu links={menuItems} />
      </div>
    </Between>
    // <nav className="header">
    //   <div className="welcome-message">
    //     Hi {isLoggedIn ? username : "Guest"}!
    //   </div>
    //   <span className="search-query">Search:{searchQuery}</span>
    //   <span className="search-query">Dates:{datesQuery}</span>
    //   <button
    //     onClick={() => {
    //       dispatch(logoutUser());
    //     }}>
    //     Logout
    //   </button>
    // </nav>
  );
}
