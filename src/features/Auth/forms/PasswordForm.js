import React from 'react'

const PasswordForm = ({ password, setPassword, placeholder, onSubmit }) => {
  return (
    <div className='pb-3'>
      <input
        className={`
          flex rounded-2xl text-blue-500 font-regular placeholder:text-gray-400 text-lg px-3 py-1 
          focus:outline-none duration-300 ease-out border-2 border-gray-400 w-full hover:border-blue-500
          hover:placeholder:text-blue-500 focus:border-blue-500 focus:placeholder:text-blue-500
          ${password ? 'border-blue-500 placeholder:text-blue-500' : ''}
        `}
        type="password"
        placeholder={placeholder}
        value={password}
        onKeyDown={(e) => {if (e.key === 'Enter') {onSubmit()}}}
        onChange={(e) => {setPassword(e.target.value)}}
      />
    </div>
  )
}

export default PasswordForm
