import React from 'react'
import { MdExitToApp } from 'react-icons/md'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '../slices/userSlice'
import HeaderTab from './components/HeaderTab'
import { Avatar } from '@mui/material'
import { stringAvatar } from '../utility/MaterialUIFunctions'
import DropdownMenu from './components/DropdownMenu'

const tabs = [
  {
    path: '/posts',
    text: 'Posts'
  },
  {
    path: '/parts',
    text: 'Parts'
  },
  {
    path: '/projects',
    text: 'Projects'
  }
]

const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const currentPath = location.pathname

  const user = useSelector(selectUser)

  return (
    <div>
      <header className='flex items-center justify-between px-5 border-b-2 border-black'>
        <div className='flex flex-col items-start my-5'>
          <p 
            className={`
              font-bold text-4xl text-black cursor-pointer
            `}
          >
            INTEGMA
          </p>
          <p className='font-regular text-sm text-gray-400'>Bachelor Project</p>
        </div>
          <div className='flex flex-row items-center space-x-20'>
            {tabs.map((tab, index) => (
              <HeaderTab
                key={index}
                currentPath={currentPath}
                path={tab.path}
                text={tab.text}
              />
            ))}
            <DropdownMenu
              currentPath={currentPath}
            />
          </div>
        <div className='flex flex-row items-center space-x-2'>
          <Avatar
            {...stringAvatar(user.displayName)} 
          />
          <p className='font-regular text-md text-black py-1 px-2 rounded-2xl'>{user.email}</p>
          <button
            onClick={() => {
              navigate('/')
              signOut(auth)
            }}
          >
            <MdExitToApp className='text-3xl ease-in-out duration-300 hover:scale-105 hover:text-red-500' />
          </button>
        </div>
      </header>
    </div>
  )
}

export default Header
