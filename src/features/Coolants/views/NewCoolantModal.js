import { Box, Modal } from '@mui/material'
import React from 'react'
import NewCoolantModalForm from '../forms/NewCoolantModalForm';

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

const NewCoolantModal = ({
    open,
    handleClose,
    user,
}) => {

  return (
    <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={handleClose}
      >
        <Box sx={style}>
            <NewCoolantModalForm 
                handleClose={handleClose}
                user={user}
            />
        </Box>
    </Modal>
  )
}

export default NewCoolantModal
