import { Box, Modal } from '@mui/material'
import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../../../firebase';
import NewMaterialForm from '../forms/NewMaterialForm';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    background: '#fff',
    border: '2px solid #fff',
    boxShadow: 24,
    p: 4,
};

const NewMaterialModal = ({
    user,
    width,
    height,
}) => {


    const [category, setProjects] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const open = queryParams.get('newMaterial') === 'true'

    const handleClose = () => {
        queryParams.delete('newMaterial')
        navigate({
            search: queryParams.toString(),
        })
    }

    useEffect(() => {
        const getProjects = onSnapshot(
            collection(db, 'category'),
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
        console.log('category: ', category)
    }, [category])


  return (
    <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={handleClose}
      >
        <Box 
            sx={[
                style,
                { 
                    width: width > 1000 ? '80%' : width,
                    height: width > 1000 ? 'fit-content' : height,
                    borderRadius: width > 1000 ? '10px' : '0px',
                }
            ]}
        >
            <NewMaterialForm 
                handleClose={handleClose}
                user={user}
                category={category}
            />
        </Box>
    </Modal>
  )
}

export default NewMaterialModal
