import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { deleteDoc, doc } from 'firebase/firestore'
import React from 'react'
import { db } from '../../../firebase'

const ConfirmDeleteDialog = ({ open, project, handleClose}) => {

    const handleDelete = async () => {
        try {
            await deleteDoc(doc(db, 'projects', project.id))
        }
        catch (error) {
            console.log(error)
        }
        handleClose()
    }

  return (
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this project?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone and will delete all data associated with this project, 
            including all data created by other members of the project.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Yes, delete
          </Button>
        </DialogActions>
    </Dialog>
  )
}

export default ConfirmDeleteDialog
