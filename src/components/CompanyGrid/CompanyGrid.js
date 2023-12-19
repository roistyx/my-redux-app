import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStockData } from '../../features/Search/searchSlice.js';
import searchStocks from '../../api/searchStocks.js';
import Button from '../../elements/Button.js';

const CompanyGrid = ({ companies }) => {
  const dispatch = useDispatch();
  const baseSize = 100; // Base size in pixels

  const handleClick = async symbol => {
    console.log('symbol', symbol);
    const response = await searchStocks.getStockQuote(symbol);
    dispatch(setStockData(response));
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {companies.map(({ symbol, companyName, count }) => {
        // Calculate size based on count
        const size = baseSize + count * 10; // Increase size based on count

        return (
          <div
            key={symbol}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              margin: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid black',
              borderRadius: '10px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              backgroundColor: '#f0f0f0'
            }}
          >
            <span
              onClick={() => handleClick(symbol)}
              style={{ padding: '5px', textAlign: 'center' }}
            >
              {companyName}
              {/* <Button onClick={handleClick(symbol)}>{symbol}</Button> */}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default CompanyGrid;
