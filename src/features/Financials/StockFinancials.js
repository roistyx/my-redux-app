import React from "react";
import { Center } from "../../layouts/Line.js";
import Tabs from "../../components/Tabs/Tabs.js";
import BalanceSheet from "../Financials/BalanceSheet.js";

const tabData = [
  { label: 'tab1', content: <BalanceSheet /> },
  { label: 'tab2', content: 'Content for Tab 2' },
  { label: 'tab3', content: 'Content for Tab 3' },
];

function StockFinancials() {

  return (
    <Center>
<Tabs tabs={tabData}  />
    </Center>
      
   
    
  );
}

export default StockFinancials;
