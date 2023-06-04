import React, { useEffect, useState } from 'react'
import { validatePassword } from '../../../utility/HelperFunctions'
import PasswordForm from '../forms/PasswordForm'

const Login = ({
  userAuthAttempt,
  setUserAuthAttempt,
  onSubmit,
}) => {

  const [password, setPassword] = useState('')

  useEffect(() => {
    setUserAuthAttempt({
      ...userAuthAttempt,
      password: password,
      passwordValidated: validatePassword(password),
    })
  }, [password])

  return (
    <div>
      <PasswordForm
        password={password}
        setPassword={setPassword}
        placeholder='Password'
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default Login
