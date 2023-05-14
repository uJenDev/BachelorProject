import React, { useEffect, useState } from 'react'

import { db } from '../../../firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import SideTabCategoryButton from '../components/SideTabCategoryButton';

import { MdAdd, MdAddCircle } from 'react-icons/md';
import NewCategoryForm from '../forms/NewCategoryForm';

import { useLocation, useNavigate, useParams } from 'react-router-dom';
import NewMaterialModal from './NewMaterialModal';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../slices/userSlice';

const SideTab = ({ width, height }) => {

    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])

    const user = useSelector(selectUser)

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

    const { category } = useParams();
    useEffect(() => {
        if (category) {
            const categoryId = category;
            setSelectedCategory({id: categoryId});
        } else {
            setSelectedCategory(null);
        }
    }, [category])

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const newMaterial = queryParams.get('newMaterial');

    if (loading) return null
    return (
        <>
            <div className='flex flex-col min-w-fit h-full'>
                <div className='pb-2 rounded-br-xl bg-gray-200 h-full'>
                    <div className='flex items-center pl-5 pr-5'>
                        <p className='font-semibold text-4xl pr-2'>Materials</p>
                        <button
                            onClick={() => {
                                queryParams.set('newMaterial', 'true');
                                navigate({
                                    search: queryParams.toString(),
                                })
                            }}
                            className={`
                                pl-1 pr-2 py-1 flex items-center text-sm text-blue-500 bg-blue-200 rounded-lg 
                                duration-300 ease-out hover:bg-blue-500 hover:text-white hover:scale-105
                                ${newMaterial === 'true' && 'bg-blue-500 text-white scale-105'}
                            `}
                        >
                            <MdAdd className='text-lg'/>
                            <p className=''>New</p>
                        </button>
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
                        />
                    )
                    })}
                    {toggleCreateForm && (
                    <NewCategoryForm 
                        setToggleCreateForm={setToggleCreateForm}
                    />
                )}
                </div>
                {true && (
                    <button 
                        className={`
                            flex flex-row items-center w-fit mx-3 px-2 text-black font-semibold ease-out duration-150 
                            hover:scale-105 rounded-lg h-20
                            ${toggleCreateForm ? 'opacity-0' : null}
                        `}
                        onClick={() => {setToggleCreateForm(true)}}
                        disabled={toggleCreateForm}
                    >
                        <h1 className={`text-lg `}>New category</h1>
                        <MdAddCircle className='text-lg' />
                    </button>
                )}
            </div>
            <NewMaterialModal 
                user={user}
                width={width}
                height={height}
            />
        </>
      )
}

export default SideTab
