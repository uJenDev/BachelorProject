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
import Materials from './features/AddMaterials/Materials';

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
                <Route path='/' element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path='/materials' element={<Materials />} />
                    <Route path='*' element={<NoPage />} />
                </Route>
            ) : (
                <Route path='/' element={<AuthLayout />}>
                    <Route index element={<AuthPage />} />
                    <Route path='*' element={<NoPage />} />
                </Route>
            )}
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
