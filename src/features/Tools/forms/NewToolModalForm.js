import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { green } from '@mui/material/colors';
import { Box, Button, CircularProgress } from '@mui/material';

const NewToolModalForm = ({ 
    handleClose, 
    user, 
    projects
}) => {

    const [name, setName] = useState('');
    const [selectedProject, setSelectedProject] = useState(true);


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
    // const projectRef = doc(db, 'projects', selectedProject.id);
    const toolData = {
      name: name,
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
    if (name) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [name]);

  return (
    <div>
        <button className='absolute top-0 left-2 text-2xl' onClick={handleClose}>&times;</button>
        <input
            placeholder='Name of tool'
            className='w-full focus:outline-none focus:border-gray-500 mt-3 text-2xl'
            value={name}
            onChange={(e) => setName(e.target.value)}
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
