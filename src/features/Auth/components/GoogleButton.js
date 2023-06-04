import React from 'react'
import Tooltip from '@mui/material/Tooltip';

const GoogleButton = () => {
  return (
    <Tooltip title="Sorry, this function is not available yet.">
      <button
          className='
              flex justify-center px-3 py-1 rounded-2xl border-2 border-gray-700 hover:border-gray-500 hover:opacity-50
              hover:bg-gray-500 hover:text-white focus:outline-none duration-300 ease-out
          '
      >
          Login with Google
      </button>
    </Tooltip>
  )
}

export default GoogleButton
