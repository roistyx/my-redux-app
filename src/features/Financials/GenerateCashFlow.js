import React from 'react';
import NumberToWords from '../../helpers/NumberToWords';

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

function GenerateCashFlow({ data }) {
  console.log('GenerateCashFlow:', data);

  // Calculate Totals for each section
  const calculateSectionTotals = (section) => {
    return Object.keys(data)
      .filter((key) =>
        key.toLowerCase().includes(section.toLowerCase())
      )
      .reduce((acc, key) => acc + data[key].value, 0);
  };

  const operatingActivitiesTotal = calculateSectionTotals(
    'OperatingActivities'
  );
  const investingActivitiesTotal = calculateSectionTotals(
    'InvestingActivities'
  );
  const financingActivitiesTotal = calculateSectionTotals(
    'FinancingActivities'
  );

  return (
    <div>
      <h2>Cash Flow Statement</h2>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Label</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {/* Operating Activities */}
          <tr>
            <td colSpan="3">
              <strong>Operating Activities</strong>
            </td>
          </tr>
          {Object.keys(data)
            .filter((key) => key.includes('OperatingActivities'))
            .map((key) => (
              <tr key={key}>
                <td>Operating</td>
                <td>{data[key].label}</td>
                <td>{formatCurrency(data[key].value)}</td>
              </tr>
            ))}
          <tr>
            <td>
              <strong>Total Operating Activities</strong>
            </td>
            <td colSpan="2">
              {formatCurrency(operatingActivitiesTotal)}
              <br />
              <b>
                <NumberToWords
                  number={formatCurrency(operatingActivitiesTotal)}
                />
              </b>
            </td>
          </tr>

          {/* Investing Activities */}
          <tr>
            <td colSpan="3">
              <strong>Investing Activities</strong>
            </td>
          </tr>
          {Object.keys(data)
            .filter((key) => key.includes('InvestingActivities'))
            .map((key) => (
              <tr key={key}>
                <td>Investing</td>
                <td>{data[key].label}</td>
                <td>{formatCurrency(data[key].value)}</td>
              </tr>
            ))}
          <tr>
            <td>
              <strong>Total Investing Activities</strong>
            </td>
            <td colSpan="2">
              {formatCurrency(investingActivitiesTotal)}
            </td>
          </tr>

          {/* Financing Activities */}
          <tr>
            <td colSpan="3">
              <strong>Financing Activities</strong>
            </td>
          </tr>
          {Object.keys(data)
            .filter((key) => key.includes('FinancingActivities'))
            .map((key) => (
              <tr key={key}>
                <td>Financing</td>
                <td>{data[key].label}</td>
                <td>{formatCurrency(data[key].value)}</td>
              </tr>
            ))}
          <tr>
            <td>
              <strong>Total Financing Activities</strong>
            </td>
            <td colSpan="2">
              {formatCurrency(financingActivitiesTotal)}
            </td>
          </tr>

          {/* Summary */}
          <tr>
            <td>
              <strong>Net Increase/(Decrease) in Cash</strong>
            </td>
            <td colSpan="2">
              {formatCurrency(
                data
                  .CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalentsPeriodIncreaseDecreaseIncludingExchangeRateEffect
                  .value
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default GenerateCashFlow;
