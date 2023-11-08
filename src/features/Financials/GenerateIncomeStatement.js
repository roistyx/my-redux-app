import React from 'react';

function GenerateIncomeStatement({ data }) {
  console.log('GenerateIncomeStatement:', data);
  // Convert the data object into an array of objects
  const dataArray = Object.keys(data).map((key) => ({
    concept: key,
    ...data[key],
  }));

  // Function to format currency values
  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);

  // Function to calculate totals according to GAAP
  const calculateGAAPTotals = (dataArray) => {
    let totalRevenue = 0;
    let totalCostsAndExpenses = 0;
    let otherIncome = 0;
    let netIncome = data['NetIncomeLoss'].value; // Net income provided in the dataset

    dataArray.forEach((item) => {
      if (item.concept.includes('Revenue')) {
        totalRevenue += item.value;
      } else if (
        item.concept.includes('CostOfGoodsAndServicesSold') ||
        item.concept.includes('Expense') ||
        item.concept.includes('Cost')
      ) {
        totalCostsAndExpenses += item.value;
      } else if (
        !item.concept.includes('IncomeTax') &&
        !item.concept.includes('NetIncomeLoss') &&
        !item.concept.includes('ComprehensiveIncome')
      ) {
        otherIncome += item.value;
      }
    });

    // Calculate operating income by subtracting total costs and expenses from revenue
    const operatingIncome = totalRevenue - totalCostsAndExpenses;

    return {
      totalRevenue,
      totalCostsAndExpenses,
      operatingIncome,
      otherIncome,
      netIncome,
    };
  };

  const {
    totalRevenue,
    totalCostsAndExpenses,
    operatingIncome,
    otherIncome,
    netIncome,
  } = calculateGAAPTotals(dataArray);

  return (
    <div>
      <h2>Income Statement</h2>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Label</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {dataArray.map((item, index) => (
            <tr key={index}>
              <td>{item.label}</td>
              <td>{formatCurrency(item.value)}</td>
            </tr>
          ))}
          <tr>
            <td>
              <strong>Total Revenue</strong>
            </td>
            <td colSpan="2">{formatCurrency(totalRevenue)}</td>
          </tr>
          <tr>
            <td>
              <strong>Total Costs and Expenses</strong>
            </td>
            <td colSpan="2">
              {formatCurrency(totalCostsAndExpenses)}
            </td>
          </tr>
          <tr>
            <td>
              <strong>Operating Income</strong>
            </td>
            <td colSpan="2">{formatCurrency(operatingIncome)}</td>
          </tr>
          <tr>
            <td>
              <strong>Other Income</strong>
            </td>
            <td colSpan="2">{formatCurrency(otherIncome)}</td>
          </tr>
          <tr>
            <td>
              <strong>Net Income</strong>
            </td>
            <td colSpan="2">{formatCurrency(netIncome)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default GenerateIncomeStatement;
