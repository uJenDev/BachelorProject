import React from 'react'
import { Button, Menu, MenuItem } from '@mui/material'
import { useNavigate } from 'react-router-dom';

const dropDownOptions = [
  {
    path: '/materials',
    text: 'Materials'
  },
  {
    path: '/tools',
    text: 'Tools'
  },
  {
    path: '/coolants',
    text: 'Coolants'
  },
]

const DropdownMenu = ({
  currentPath
}) => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  }

  const navigate = useNavigate();

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Resources
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {dropDownOptions.map((option, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              handleClose()
              navigate(option.path)
            }}
          >
            {option.text}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

export default DropdownMenu
