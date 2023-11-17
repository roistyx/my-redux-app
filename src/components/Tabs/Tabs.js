// src/components/Tabs.js
import React, { useState, useEffect } from 'react';
import { Center } from '../../layouts/Line';
import { useDispatch, useSelector } from 'react-redux';
import { setReportType } from '../../features/Financials/fiancialReportsSlice.js';
import './TabComponent.css';

const Tabs = ({ tabs, subComponent }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const dispatch = useDispatch();
  const { report_type } = useSelector((state) => state.reports);

  useEffect(() => {
    dispatch(setReportType(activeTab.name));
  }, [activeTab]);

  const handleClick = (label) => {
    tabs.map((tab) => {
      if (tab.label === label) {
        setActiveTab(tab);
      }
    });
  };

  const activeTabIndex = tabs.findIndex(
    (tab) => tab.label === activeTab.label
  );

  const indicatorWidth = 100 / tabs.length;

  const containerStyle = {
    '--indicator-width': `${indicatorWidth}%`,
    '--indicator-left': `${activeTabIndex * indicatorWidth}%`,
  };

  return (
    <div className="tabs-container" style={containerStyle}>
      <Center>
        <div className="tabs-header">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`tab-item ${
                activeTab.label === tab.label ? 'active' : ''
              }`}
              onClick={() => handleClick(tab.label)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="tab-indicator-container">
          <span className="tab-indicator" />
        </div>
      </Center>
      {subComponent === null ? null : subComponent}
      <div className="tab-content">
        {tabs.map((tab, index) => {
          if (tab.label !== activeTab.label) return null;
          return <div key={index}>{tab.content}</div>;
        })}
      </div>
    </div>
  );
};

export default Tabs;
