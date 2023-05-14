import React from 'react'
import { Link } from 'react-router-dom'

const HeaderTab = ({
    currentPath,
    path,
    text
}) => {

  return (
    <Link 
        to={path}
        className={`
        text-lg font-regular px-2 py-1 rounded-xl 
        duration-300 ease-out hover:scale-105 cursor-pointer
        ${currentPath.split('/')[1] === path.split('/')[1] ? 'bg-blue-500 text-white scale-105 border-blue-500' : 'text-black '}
        `}
    >
        {text}
    </Link>
  )
}

export default HeaderTab
