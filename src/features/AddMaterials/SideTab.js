import React, { useEffect, useState } from 'react'

import { db } from '../../firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import SideTabCategoryButton from './components/SideTabCategoryButton';
import MaterialView from './views/MaterialView';

import { MdAddCircle } from 'react-icons/md';
import NewCategoryForm from './forms/NewCategoryForm';

const SideTab = () => {

    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])

    const [toggleCreateForm, setToggleCreateForm] = useState(false);

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
    const [selectedCategory, setSelectedCategory] = useState(null);

    const [editMode, setEditMode] = useState(false);


    return (
        <div className='flex flex-row space-x-2 w-full'>
            <div className='flex flex-col min-w-fit'>
                <div className='pb-2 rounded-xl bg-transparent'>
                    <div className='bg-gray-700 py-2 rounded-t-xl flex flex-row items-top px-5 space-x-1'>
                        <p className='font-bold text-4xl flex items-center justify-center text-white ease-in duration-300'>Categories</p>
                    </div>
                    {categories?.map((category) => {
                        // check if is last category
                        var isLast = false;
                        if (category.id === categories[categories.length - 1].id) {
                            isLast = true;
                        }
                    return (
                        <SideTabCategoryButton
                            key={category.id}
                            category={category}
                            isLast={isLast}
                            selectedMaterial={selectedMaterial}
                            setSelectedMaterial={setSelectedMaterial}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                        />
                    )
                    })}
                </div>
                {!toggleCreateForm && (
                    <button 
                        className='flex flex-row items-center w-fit mx-3 px-2 text-gray-700 ease-out duration-150 hover:text-white hover:scale-105 hover:shadow-md hover:bg-gray-700 rounded-lg'
                        onClick={() => {setToggleCreateForm(true)}}
                    >
                        <h1 className={`font-bold text-xl `}>New category</h1>
                        <MdAddCircle className='text-xl' />
                    </button>
                )}
                {toggleCreateForm && (
                    <NewCategoryForm 
                        setToggleCreateForm={setToggleCreateForm}
                    />
                )}
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
