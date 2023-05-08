import React from 'react'

const GoogleButton = () => {
  return (
    <button
        className='
            flex justify-center px-3 py-1 rounded-2xl border-2 border-gray-700 hover:border-blue-500 
            hover:bg-blue-500 hover:text-white focus:outline-none duration-300 ease-out
        '
    >
        Login with Google
    </button>
  )
}

export default GoogleButton
