import { collection, doc, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { MdAddCircle } from 'react-icons/md';
import { db } from '../firebase';

const MaterialToolsView = ({
    material,
    selectedTool,
    setSelectedTool
}) => {

    const [loading, setLoading] = useState(false)
    const [tools, setTools] = useState([]);

    useEffect(() => {

        const getSettings = onSnapshot(
            query( 
                collection(db, 'tool'), 
                where('materialRefs', 'array-contains', doc(db, 'material', material.id))
            ), 
            (snapshot) => {
                setTools(snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })))
            setLoading(false)
            console.log(tools)
        },
        (error) => {
            console.log(error)
            setLoading(false)
        })

        return () => {
            getSettings()
        }
    }, [material])

    useEffect(() => {
        console.log('tools View: ', tools)
    }, [tools])

    if (!tools[0]) return (
        <div className='bg-gray-700 px-2 py-2 rounded-xl mt-2 w-full h-fit'>
            <p className='text-2xl font-bold text-white'>No recommended tools</p>
        </div>
    );
  return (
    <div className='bg-gray-700 px-2 py-2 rounded-xl mt-2 h-fit w-full'>
      <p className='text-2xl font-bold text-white'>Recommended tools</p>
      {!selectedTool && <p className='text-lg text-red-500'>No tool selected</p>}
      {tools.map(tool => (
        <button 
            key={tool.id} 
            className={`px-2 py-1 mt-2 rounded-lg max-w-fit flex flex-row items-center space-x-2 ease-out duration-300  ${selectedTool?.id === tool.id ? 'bg-green-200 text-green-600 -translate-x-2 rounded-l-none' : 'text-red-700 hover:bg-red-100 bg-red-200'} `}
            onClick={() => {
                if (selectedTool?.id === tool.id) {
                    setSelectedTool(null)
                }
                else {
                    setSelectedTool(tool)
                }
            }}
        >
            <p className='text-xl font-bold'>{tool.name}</p>
            <p className={`font-bold ${selectedTool?.id === tool.id ? 'text-green-300' : 'text-red-300'}`}>|</p>
            <p className='text-lg font-bold'>{tool.totalLength}</p>
        </button>
      ))}
        <button 
            onClick={() => {}}
            className={`mt-2 flex flex-row space-x-2 bg-blue-200 max-w-fit px-2 py-1 rounded-lg items-center text-blue-500 ease-out duration-150 hover:scale-105 hover:text-white hover:bg-blue-500`}
        >
            <p className={`text-xl font-bold ease-out duration-150`}>Add new</p>
            <p className='font-bold text-blue-300'>|</p>
            <MdAddCircle className='text-xl' />
        </button>
    </div>  
  )
}

export default MaterialToolsView