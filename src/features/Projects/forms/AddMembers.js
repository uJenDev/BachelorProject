import React, { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';

export default function AddMembers({ users }) {
  const [selectedMembers, setSelectedMembers] = useState([]);

  const handleChange = (event, value) => {
    setSelectedMembers(value);
  };

  return (
    <div className='mt-2'>
      <Autocomplete
        options={users}
        multiple
        value={selectedMembers}
        onChange={handleChange}
        getOptionLabel={(option) => option.email}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <input
              checked={selected}
              type="checkbox"
              style={{ marginRight: 8 }}
            />
            {option.email}
          </li>
        )}
        renderInput={(params) => (
          <TextField {...params} label="Add Members" variant="standard" />
        )}
        sx={{ width: 300 }}
      />
    </div>
  );
}
