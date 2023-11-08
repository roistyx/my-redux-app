import { useSelector } from 'react-redux';
import { Between } from '../../layouts/Line.js';
import Menu from '../../components/Menu.js';
import Search from '../Search/Search.js';
import TickerDisplay from '../../components/TickerDisplay.js';
import Drawer from '../Drawer/Drawer';

import './Header.css';

export default function Header({ backgroundColor, height, gap }) {
  const { stockData } = useSelector((state) => state.search);
  console.log(stockData.symbol);

  const menuItems = [
    { name: 'Home', link: '/' },
    { name: 'News', link: '/news' },
    { name: 'Search', link: '/search' },
    { name: 'Financials', link: '/financials' },
    { name: 'Chat', link: '/chat' },
  ];

  return (
    <Between gap="0" backgroundColor={backgroundColor}>
      {stockData.symbol ? (
        <TickerDisplay style={{ backgroundColor, height }} />
      ) : (
        <Search
          backgroundColor={backgroundColor}
          height={height}
          gap={gap}
        />
      )}
      {stockData.symbol ? <Drawer links={menuItems} /> : null}
    </Between>
  );
}
