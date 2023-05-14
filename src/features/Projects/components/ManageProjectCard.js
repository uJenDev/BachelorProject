import React from 'react'
import { MdMoreHoriz } from 'react-icons/md'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase';

const ManageGroupCard = ({ project, user }) => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

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
    <div className='grid grid-cols-5 w-full items-center border-b-2 border-gray-200 py-2 hover:bg-gray-100 cursor-default'>
        <button 
            className='font-semibold text-md text-blue-500 text-start'
        >
            {project.name}
        </button>
        <p>{project.createdBy.uid === user.uid ? 'You' : project.createdBy.email}</p>
        <p 
            className={`
                max-w-fit px-2 py-1 rounded-md font-semibold text-sm
                ${project.private ? 'bg-red-200 text-red-500' : 'bg-green-200 text-green-500'}
            `}
        >
            {project.private ? 'Private' : 'Public'}
        </p>
        <p>{project.createdAt}</p>
        <button
            onClick={handleClick}
            className='flex justify-center items-center'
        >
            <MdMoreHoriz className='text-2xl'/>
        </button>
        <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            className='transform translate-x-12'
        >
            <MenuItem onClick={handleClose}>Project Settings</MenuItem>
            {project.createdBy.uid === user.uid && <MenuItem onClick={handleDelete}>Move to Trash</MenuItem>}
        </Menu>
    </div>
  )
}

export default ManageGroupCard
