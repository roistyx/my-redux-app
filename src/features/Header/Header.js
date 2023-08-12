import { useSelector } from "react-redux";
import { Between } from "../../layouts/Line.js";
import Menu from "../../components/Menu.js";
import Search from "../Search/Search.js";
import TickerDisplay from "../../components/TickerDisplay.js";

import "./Header.css";

export default function Header({ backgroundColor, height, gap }) {
  console.log(backgroundColor);
  const menuItems = [
    { name: "Home", link: "/" },
    { name: "News", link: "/news" },
    { name: "Search", link: "/search" },
    { name: "Login", link: "/login" },
  ];

  return (
    <Between backgroundColor={backgroundColor}>
      <Search backgroundColor={backgroundColor} height={height} gap={gap} />
      <TickerDisplay style={{ backgroundColor, height }} />
      <Menu links={menuItems} />
    </Between>
  );
}
