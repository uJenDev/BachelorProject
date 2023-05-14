import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import NewPostForm from '../forms/NewPostForm';
import { useLocation, useNavigate } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    background: '#fff',
    border: '2px solid #fff',
    boxShadow: 24,
    paddingY: 4,
    paddingX: 1,
};

const NewPostModal = ({ 
    user,
    projects,
    project 
}) => {

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const open = queryParams.get('newPost') === 'true'


    const handleClose = () => {
      queryParams.delete('newPost')
      navigate({
        search: queryParams.toString(),
      })
    }

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
                width < breakpoint ? {width: '100%', height: '100%'} : {width: '75%', height: '90%', borderRadius: '10px',},
            ]}
        >
            <NewPostForm 
                handleClose={handleClose}
                user={user}
                project={project}
                projects={projects}
            />
        </Box>
      </Modal>
    </div>
  )
}

export default NewPostModal
