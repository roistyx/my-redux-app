// src/components/Tabs.js
import React, { useState } from 'react';
import './TabComponent.css'; // Make sure the path to your CSS is correct
import { Center } from '../../layouts/Line';

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  const handleClick = (label) => {
    setActiveTab(label);
  };

  const activeTabIndex = tabs.findIndex((tab) => tab.label === activeTab);
  const indicatorWidth = 100 / tabs.length;

  // Set the CSS variables on the container
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
            className={`tab-item ${activeTab === tab.label ? 'active' : ''}`}
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
      <div className="tab-content">
        {tabs.map((tab, index) => {
          if (tab.label !== activeTab) return null;
          return <div key={index}>{tab.content}</div>;
        })}
      </div>
    </div>
        
  );
};

export default Tabs;
