import React from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import NewProjectForm from '../forms/NewProjectForm';
import { useLocation, useNavigate } from 'react-router-dom';

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
    p: 4,
};

const NewProjectModal = ({user, width, heigth}) => {

  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search);

  return (
    <div>
      <Modal
        open={queryParams.get('newProject') === 'true'}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box 
          sx={[
            style,
            width < 1000 ? {width: '100%', height: '100%'} : {width: '75%', height: '90%', borderRadius: '10px',},
          ]}
        >
            <NewProjectForm 
                handleClose={() => {
                    queryParams.delete('newProject')
                    navigate({search: queryParams.toString()})
                }}
                user={user}
            />
        </Box>
      </Modal>
    </div>
  )
}

export default NewProjectModal
