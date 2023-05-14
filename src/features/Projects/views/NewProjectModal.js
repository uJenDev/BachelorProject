import React from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import NewGroupForm from '../forms/NewProjectForm';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    background: '#fff',
    border: '2px solid #fff',
    boxShadow: 24,
    borderRadius: '10px',
    p: 4,
};

const NewGroupModal = ({open, setOpen, user}) => {
    const handleClose = () => setOpen(false);
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <NewGroupForm 
                handleClose={handleClose}
                user={user}
            />
        </Box>
      </Modal>
    </div>
  )
}

export default NewGroupModal
