import React from 'react'
import { MdExitToApp } from 'react-icons/md'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '../slices/userSlice'

const Header = () => {
  const location = useLocation()
  const currentPath = location.pathname

  const user = useSelector(selectUser)

  return (
    <div>
      <header className='flex items-center justify-between px-5 border-b-2 border-black'>
        <Link 
          to='/'
          className={`
            font-bold text-4xl my-5 text-black cursor-pointer
          `}
        >
          INTEGMA
        </Link>
        <div className='flex flex-row items-center space-x-10'>
          <Link 
            to='/materials'
            className={`
              text-lg font-bold border-2 px-2 py-1 rounded-xl 
              duration-300 ease-out hover:scale-105 cursor-pointer
              ${currentPath === '/materials' ? 'bg-blue-500 text-white scale-105 border-blue-500' : 'text-black border-black'}
            `}
          >
            Materials
          </Link>
          <Link 
            to='/about'
            className={`
              text-lg font-bold border-2 px-2 py-1 rounded-xl 
              duration-300 ease-out hover:scale-105 cursor-pointer
              ${currentPath === '/about' ? 'bg-blue-500 text-white scale-105 border-blue-500' : 'text-black border-black'}
            `}
          >
            Tools
          </Link>
          <Link 
            to='/contact'
            className={`
              text-lg font-bold border-2 px-2 py-1 rounded-xl 
              duration-300 ease-out hover:scale-105 cursor-pointer
              ${currentPath === '/contact' ? 'bg-blue-500 text-white scale-105 border-blue-500' : 'text-black border-black'}
            `}
          >
            Parts
          </Link>
        </div>
        <div className='flex flex-row items-center space-x-2'>
          <p className='font-regular text-md text-black py-1 px-2 rounded-2xl'>{user.email}</p>
          <button
            onClick={() => {
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
