import React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

const NewPartDimensions = ({
    dimensions,
    setDimensions,
}) => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            label="Height (cm)"
            type="number"
            inputProps={{ min: 0 }}
            variant="standard"
            value={dimensions?.height}
            onChange={(e) => setDimensions({ ...dimensions, height: Number(e.target.value) })}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Width (cm)"
            type="number"
            inputProps={{ min: 0 }}
            variant="standard"
            value={dimensions?.width}
            onChange={(e) => setDimensions({ ...dimensions, width: Number(e.target.value) })}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Length (cm)"
            type="number"
            inputProps={{ min: 0 }}
            variant="standard"
            value={dimensions?.length}
            onChange={(e) => setDimensions({ ...dimensions, length: Number(e.target.value) })}
            fullWidth
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default NewPartDimensions;
