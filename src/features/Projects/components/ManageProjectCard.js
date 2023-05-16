import React, { useState } from 'react'
import { MdDeleteForever, MdMoreHoriz, MdSettings } from 'react-icons/md'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ListItemIcon, Typography } from '@mui/material';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';

const ManageGroupCard = ({ project, user }) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const [attemptDelete, setAttemptDelete] = useState(false)

  return (
    <>
        <div className='grid grid-cols-6 w-full items-center border-b-2 border-gray-200 py-2 hover:bg-gray-100 cursor-default'>
            <button 
                className='font-semibold text-md text-blue-500 text-start'
            >
                {project.name}
            </button>
            <p>{project.createdBy.id === user.id ? 'You' : project.createdBy.email}</p>
            <p 
                className={`
                    max-w-fit px-2 py-1 rounded-md font-semibold text-sm
                    ${project.private ? 'bg-red-200 text-red-500' : 'bg-green-200 text-green-500'}
                `}
            >
                {project.private ? 'Private' : 'Public'}
            </p>
            <p className='font-bold text-md'>{project.members.length}</p>
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
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <MdSettings fontSize="large" />
                    </ListItemIcon>
                    <Typography variant="inherit">Project Settings</Typography>
                </MenuItem>
                {project.createdBy.id === user.id && 
                <MenuItem onClick={() => setAttemptDelete(true)}>
                    <ListItemIcon>
                        <MdDeleteForever fontSize="large" />
                    </ListItemIcon>
                    <Typography variant="inherit">Delete Project</Typography>
                </MenuItem>}
            </Menu>
        </div>
        <ConfirmDeleteDialog
            open={attemptDelete}
            handleClose={() => setAttemptDelete(false)}
            project={project}
        />
    </>

  )
}

export default ManageGroupCard
