import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthLayout from './layouts/AuthLayout';
import AuthPage from './features/Auth/AuthPage';

import Layout from './layouts/Layout';
import Home from './pages/Home';
import NoPage from './pages/NoPage';

import { listenToAuthChanges } from './authListener';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from './slices/userSlice';
import Materials from './features/Materials/Materials';
import ManageProjects from './features/Projects/pages/ManageProjects';
import Groups from './features/Projects/Projects';
import Parts from './features/Parts/Parts';
import Tools from './features/Tools/Tools';
import Coolants from './features/Coolants/Coolants';

const AppRoutes = () => {
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        listenToAuthChanges(dispatch, setLoading);
    }, [])

    if (loading) return (
        <div className='flex justify-center mt-20 text-4xl font-bold bg-red-400 px-2 py-1 rounded-xl text-white '>Loading...</div>
    )

  return (
    <BrowserRouter>
        <Routes>
            {user ? (
                <Route path='/' element={<Layout />} >
                    <Route index element={<Home />} />

                    <Route path='/posts' element={<Groups />} />
                    <Route path='/posts/:project' element={<Groups />} />
                    <Route path='/posts/:project/:post' element={<Groups />} />

                    <Route path='/materials/' element={<Materials />} />
                    <Route path='/materials/:category' element={<Materials />} />
                    <Route path='/materials/:category/:material' element={<Materials />} />

                    <Route path='/parts' element={<Parts />} />
                    <Route path='/parts/:part' element={<Parts />} />

                    <Route path='/tools' element={<Tools />} />
                    <Route path='/tools/:tool' element={<Tools />} />

                    <Route path='/coolants' element={<Coolants />} />
                    <Route path='/coolants/:coolant' element={<Coolants />} />

                    <Route path='/projects' element={<ManageProjects />} />
                    <Route path='*' element={<NoPage />} />
                </Route>
            ) : (
                <Route path='/' element={<AuthLayout />} >
                    <Route index element={<AuthPage />} />
                    <Route path='*' element={<NoPage />} />
                </Route>
            )}
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
