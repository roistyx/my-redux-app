import { useSelector } from "react-redux";
import { Between } from "../../layouts/Line.js";
import Menu from "../../components/Menu.js";
import Search from "../Search/Search.js";
import TickerDisplay from "../../components/TickerDisplay.js";
import "./Header.css";

export default function Header({ backgroundColor, height, gap }) {
  const { stockData } = useSelector((state) => state.search);
  console.log(stockData);

  const menuItems = [
    { name: "Home", link: "/" },
    { name: "News", link: "/news" },
    { name: "Search", link: "/search" },
    { name: "Login", link: "/login" },
  ];

  return (
    <Between backgroundColor={backgroundColor}>
      {stockData.symbol ? (
        <TickerDisplay style={{ backgroundColor, height }} />
      ) : (
        <Search backgroundColor={backgroundColor} height={height} gap={gap} />
      )}
      {stockData.symbol ? <Menu links={menuItems} /> : null}
    </Between>
  );
}
