import React from 'react';

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

function GenerateBalanceSheet({ data }) {
  const calculateTotals = () => {
    return {
      totalAssets: data.Assets.value,
      totalLiabilities: data.Liabilities.value,
      totalEquity: data.StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest.value,
    };
  };

  const { totalAssets, totalLiabilities, totalEquity } = calculateTotals();

  return (
    <div>
      <h2>Balance Sheet</h2>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Label</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="3"><strong>Assets</strong></td>
          </tr>
          {Object.keys(data).filter(key => key.includes('Asset')).map(key => (
            <tr key={key}>
              <td>Asset</td>
              <td>{data[key].label}</td>
              <td>{formatCurrency(data[key].value)}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="3"><strong>Liabilities</strong></td>
          </tr>
          {Object.keys(data).filter(key => key.includes('Liability')).map(key => (
            <tr key={key}>
              <td>Liability</td>
              <td>{data[key].label}</td>
              <td>{formatCurrency(data[key].value)}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="3"><strong>Equity</strong></td>
          </tr>
          {Object.keys(data).filter(key => key.includes('StockValue') || key.includes('Equity')).map(key => (
            <tr key={key}>
              <td>Equity</td>
              <td>{data[key].label}</td>
              <td>{formatCurrency(data[key].value)}</td>
            </tr>
          ))}
          <tr>
            <td><strong>Total Assets</strong></td>
            <td colSpan="2">{formatCurrency(totalAssets)}</td>
          </tr>
          <tr>
            <td><strong>Total Liabilities</strong></td>
            <td colSpan="2">{formatCurrency(totalLiabilities)}</td>
          </tr>
          <tr>
            <td><strong>Total Equity</strong></td>
            <td colSpan="2">{formatCurrency(totalEquity)}</td>
          </tr>
          <tr>
            <td><strong>Check Equation (Assets = Liabilities + Equity)</strong></td>
            <td colSpan="2">{formatCurrency(totalAssets)} = {formatCurrency(totalLiabilities)} + {formatCurrency(totalEquity)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default GenerateBalanceSheet;
