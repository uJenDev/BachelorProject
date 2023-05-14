import { Box, Modal } from '@mui/material'
import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase';
import NewToolModalForm from '../forms/NewToolModalForm';

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

const NewToolModal = ({
    open,
    handleClose,
    user,
}) => {


    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const getProjects = onSnapshot(
            collection(db, 'projects'),
            (snapshot) => {
                setProjects(snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })))
        },
        (error) => {
            console.log(error)
        })
        return () => {
            getProjects()
        }
    }, [])

    useEffect(() => {
        console.log('projects: ', projects)
    }, [projects])


  return (
    <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={handleClose}
      >
        <Box sx={style}>
            <NewToolModalForm 
                handleClose={handleClose}
                user={user}
                projects={projects}
            />
        </Box>
    </Modal>
  )
}

export default NewToolModal
