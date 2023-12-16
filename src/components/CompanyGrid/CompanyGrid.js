import React from 'react';

const CompanyGrid = ({ companies }) => {
  // Define a base size for the grid items
  const baseSize = 100; // Base size in pixels

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
            <span style={{ padding: '5px', textAlign: 'center' }}>
              {companyName}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default CompanyGrid;
