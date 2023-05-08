import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth } from '../../firebase'
import { valdiateEmail } from '../../utility/HelperFunctions'
import GoogleButton from './components/GoogleButton'
import Header from './components/Header'
import SubmitButton from './components/SubmitButton'
import EmailForm from './forms/EmailForm'
import { checkForUser } from './utility/authFunctions'
import Login from './views/Login'
import Register from './views/Register'

const AuthPage = () => {

  const [userAuthAttempt, setUserAuthAttempt] = useState({
    email: '',
    emailValidated: false,
    password: '',
    passwordValidated: false,
    exists: false,
    continued: false,
  })

  useEffect(() => {
    setUserAuthAttempt({
      ...userAuthAttempt,
      emailValidated: valdiateEmail(userAuthAttempt.email),
      continued: false,
    })
  }, [userAuthAttempt.email])

  const onSubmit = () => {
    if (!userAuthAttempt.continued && userAuthAttempt.emailValidated) {
      checkForUser(auth, userAuthAttempt, setUserAuthAttempt)
      console.log(userAuthAttempt)
    }
    else if (userAuthAttempt.continued && userAuthAttempt.exists && userAuthAttempt.passwordValidated && userAuthAttempt.emailValidated) {
      signInWithEmailAndPassword(auth, userAuthAttempt.email, userAuthAttempt.password)
    }
    else if (userAuthAttempt.continued && !userAuthAttempt.exists && userAuthAttempt.passwordValidated && userAuthAttempt.emailValidated) {
      console.log('register')
    }
  }

  return (
    <div className='flex items-center justify-center pt-20'>
      <div className='flex flex-col px-3 py-2 rounded-2xl border-2 border-gray-700 w-96'>
        <Header userAuthAttempt={userAuthAttempt} />
        <EmailForm
          email={userAuthAttempt.email}
          setUserAuthAttempt={setUserAuthAttempt}
        />
        {
        (userAuthAttempt.continued && userAuthAttempt.exists) 
        ? 
          <Login 
            userAuthAttempt={userAuthAttempt}
            setUserAuthAttempt={setUserAuthAttempt}
          />
        :
        (userAuthAttempt.continued && !userAuthAttempt.exists)
        ?
          <Register
            userAuthAttempt={userAuthAttempt}
            setUserAuthAttempt={setUserAuthAttempt}
          />
        :
        null
        }
        <SubmitButton
          userAuthAttempt={userAuthAttempt}
          onSubmit={onSubmit}
        />
        <h1 className='flex font-regular text-3xl text-gray-700 justify-center pb-5'>or</h1>
        <GoogleButton />
      </div>
    </div>
  )
}

export default AuthPage
