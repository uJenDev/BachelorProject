import React from 'react'

const Header = ({userAuthAttempt}) => {
  return (
    <div className='pb-5'>
          {
            (userAuthAttempt.continued && userAuthAttempt.exists)
            ?
            (
            <>
              <h1 className='font-bold text-3xl text-gray-700 pb-1'>Welcome Back!</h1>
              <h1 className='font-bold text-3xl text-gray-700'>Please enter your password.</h1>
            </>
            )
            :
            (userAuthAttempt.continued && !userAuthAttempt.exists)
            ?
            (
              <>
                <h1 className='font-bold text-3xl text-gray-700'>Hi,</h1>
                <h1 className='font-bold text-3xl text-gray-700'>please enter your email</h1>
              </>
            )
            :
            (
              <>
                <h1 className='font-bold text-3xl text-gray-700'>Hi,</h1>
                <h1 className='font-bold text-3xl text-gray-700'>please enter your email</h1>
              </>
            )
          }
        </div>
  )
}

export default Header
