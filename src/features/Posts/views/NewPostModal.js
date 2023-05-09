import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import NewPostForm from '../forms/NewPostForm';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    background: '#fff',
    border: '2px solid #fff',
    boxShadow: 24,
    borderRadius: '10px',
    p: 4,
};

const NewPostModal = ({ 
    open, 
    setOpen, 
    user, 
    group 
}) => {
    const handleClose = () => setOpen(false);

    const [width, setWidth] = useState(window.innerWidth)
    const breakpoint = 1200;

    useEffect(() => {
        const handleWindowResize = () => {
            setWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleWindowResize)
        
        return () => window.removeEventListener('resize', handleWindowResize)
    }, [])

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={[
                style,
                width < breakpoint ? {width: '100%'} : {width: '75%'},
                width < breakpoint ? {height: '100%'} : {height: '90%'}
            ]}
        >
            <NewPostForm 
                handleClose={handleClose}
                user={user}
                group={group}
            />
        </Box>
      </Modal>
    </div>
  )
}

export default NewPostModal
