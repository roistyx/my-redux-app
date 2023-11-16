import React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import './DatesPicker.css';

export default function BasicDateRangeField({
  onChange,
  containerMargin,
}) {
  console.log('BasicDateRangeField onChange', containerMargin);
  const selectStyle = {
    ...(containerMargin
      ? { '----field-margin': containerMargin }
      : {}),
  };

  return (
    <div className="field-container" style={selectStyle}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer
          components={[
            'MultiInputDateRangeField',
            'SingleInputDateRangeField',
          ]}
        >
          <SingleInputDateRangeField
            type="text"
            onChange={onChange}
            label="Start - End"
          />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
}
