import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { green } from '@mui/material/colors';
import { Box, Button, CircularProgress, InputAdornment, TextField } from '@mui/material';

const NewToolModalForm = ({ 
    handleClose, 
    user, 
    projects
}) => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');


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
    const toolData = {
      name: name,
      price: Number(price),
      slug: titleToSlug(name),
      createdAt: serverTimestamp(),
      createdBy: {
        displayName: user.displayName,
        email: user.email,
        uid: user.uid,
      },
    //   projectRef: projectRef,
    };

    await setDoc(doc(db, 'tool', docId), toolData);
    
    setLoading(false);
    setSuccess(true);
    setTimeout(() => {
      handleClose();
    }, 1000);
  };

  useEffect(() => {
    if (name && price) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [name, price]);

  return (
    <div>
        <button className='absolute top-0 left-2 text-2xl' onClick={handleClose}>&times;</button>
        <input
            placeholder='Name of tool'
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
            label="Price"
            className='max-w-fit'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
        />
        <div className='flex justify-end'>
        <Box sx={{ marginTop: 2 }}>
                <Button
                    variant="contained"
                    disabled={!canSubmit}
                    onClick={handleCreate}
                    sx={[
                        buttonSx,
                    ]}
                    size='large'
                >
                Create Tool
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

export default NewToolModalForm;
