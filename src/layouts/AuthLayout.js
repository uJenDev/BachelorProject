import React from 'react'
import { Outlet } from 'react-router-dom'
import AuthHeader from './AuthHeader'

const AuthLayout = () => {
  return (
    <div>
      <AuthHeader />
      <Outlet />
    </div>
  )
}

export default AuthLayout
