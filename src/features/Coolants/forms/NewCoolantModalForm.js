import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { green } from '@mui/material/colors';
import { Box, Button, CircularProgress, InputAdornment, TextField } from '@mui/material';

const NewCoolantModalForm = ({ 
    handleClose, 
    user, 
}) => {

    const [name, setName] = useState('');
    const [pricePerLiter, setPricePerLiter] = useState('');


  const titleToSlug = (title) => {
    return title.toLowerCase().replace(/\s+/g, '-');
  };

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
    const buttonSx = {
        ...(success && {
          bgcolor: green[500],
          '&:hover': {
            bgcolor: green[700],
          },
        }),
      };

    
  const [canSubmit, setCanSubmit] = useState(false)
  const handleCreate = async () => {
    const docId = titleToSlug(name);
    const coolantData = {
      name: name,
      pricePerLiter: Number(pricePerLiter),
      createdAt: serverTimestamp(),
      createdBy: doc(db, 'users', user.uid),
    //   projectRef: projectRef,
    };

    await setDoc(doc(db, 'coolant', docId), coolantData);
    
    setLoading(false);
    setSuccess(true);
    setTimeout(() => {
      handleClose();
    }, 1000);
  };

  useEffect(() => {
    if (name && pricePerLiter) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [name, pricePerLiter]);

  return (
    <div>
        <button className='absolute top-0 left-2 text-2xl' onClick={handleClose}>&times;</button>
        <input
            placeholder='Name of coolant'
            className='w-full focus:outline-none focus:border-gray-500 mt-3 text-2xl'
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        <TextField
            type="number"
            variant="standard"
            onFocus={(e) => e.target.select()}
            InputProps={{
                inputProps: { min: 0 },
                endAdornment: <InputAdornment position="end">kr</InputAdornment>,
            }}
            label="Price Per Liter"
            className='max-w-fit'
            value={pricePerLiter}
            onChange={(e) => setPricePerLiter(e.target.value)}
        />
        <div className='flex justify-end'>
            <Box sx={{ m: 1, position: 'relative' }}>
                <Button
                    variant="contained"
                    disabled={!canSubmit}
                    onClick={handleCreate}
                    sx={[
                        buttonSx,
                    ]}
                    size='large'
                >
                Create Coolant
                </Button>
                {loading && (
                <CircularProgress
                    size={24}
                    sx={{
                        color: green[500],
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: '-12px',
                        marginLeft: '-12px',
                    }}
                />
                )}
            </Box>
        </div>
    </div>
  );
};

export default NewCoolantModalForm;
