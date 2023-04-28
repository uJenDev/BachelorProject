import React, { useEffect, useState } from 'react'

import { db } from '../firebase';
import { collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore';
import SideTabCategoryButton from '../components/SideTabCategoryButton';
import MaterialView from './MaterialView';

const SideTab = () => {

    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])

    useEffect(() => {
        setLoading(true)

        const getCategory = onSnapshot(
            query( collection(db, 'category'), ), 
            (snapshot) => {
                setCategories(snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })))
            setLoading(false)
        },
        (error) => {
            console.log(error)
            setLoading(false)
        })

        return () => {
            getCategory()
        }
    }, [])


    
    const [selectedMaterial, setSelectedMaterial] = useState(null);
    const [settings, setSettings] = useState([]);

    useEffect(() => {
        if (!selectedMaterial) return;

        const getSettings = onSnapshot(
            query( 
                collection(db, 'setting'), 
                where('materialRef', '==', doc(db, 'material', selectedMaterial.id))
            ), 
            (snapshot) => {
                setSettings(snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })))
            setLoading(false)
            console.log(settings)
        },
        (error) => {
            console.log(error)
            setLoading(false)
        })

        return () => {
            getSettings()
        }
    }, [selectedMaterial])


    return (
        <div className='flex flex-row space-x-2'>
            <div className='flex flex-col min-w-fit'>
                <div className='bg-gray-300 pt-5 pb-2 rounded-xl shadow-md'>
                    <p className='font-bold text-4xl flex items-center justify-center px-5'>Materials</p>  
                    {categories?.map((category) => (
                        <SideTabCategoryButton
                            key={category.id}
                            category={category}
                            selectedMaterial={selectedMaterial}
                            setSelectedMaterial={setSelectedMaterial}
                        />
                    ))}
                </div>
            </div>

            {selectedMaterial && (
                <MaterialView
                    material={selectedMaterial}
                />
            )}
        </div>
      )
}

export default SideTab
