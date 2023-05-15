import React from 'react';
import TextField from '@mui/material/TextField';

const CycleTimeSelect = ({ cycleTime, setCycleTime }) => {
  const handleCycleTimeChange = (field) => (event) => {
    let value = parseInt(event.target.value, 10);

    if (isNaN(value)) {
      value = 0;
    } else if (field === 'hours' && value > 999) {
      value = 999;
    } else if (['minutes', 'seconds'].includes(field) && value > 59) {
      value = 59;
    }

    setCycleTime({ ...cycleTime, [field]: value });
  };

  return (
    <div className='w-full'>
        <div className="flex flex-row space-x-4">
        <TextField
            type="number"
            onFocus={(e) => e.target.select()}
            InputProps={{ inputProps: { min: 0, max: 999 } }}
            label="Hours"
            value={cycleTime.hours}
            className="w-full"
            onChange={handleCycleTimeChange('hours')}
        />
        <TextField
            type="number"
            onFocus={(e) => e.target.select()}
            InputProps={{ inputProps: { min: 0, max: 59 } }}
            label="Minutes"
            value={cycleTime.minutes}
            className="w-full"
            onChange={handleCycleTimeChange('minutes')}
        />
        <TextField
            type="number"
            onFocus={(e) => e.target.select()}
            InputProps={{ inputProps: { min: 0, max: 59 } }}
            label="Seconds"
            value={cycleTime.seconds}
            className="w-full"
            onChange={handleCycleTimeChange('seconds')}
        />
        </div>
    </div>
  );
};

export default CycleTimeSelect;