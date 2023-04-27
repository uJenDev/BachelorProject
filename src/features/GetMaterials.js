import React, { useState } from 'react'
import axios from 'axios';

const GetMaterials = () => {
    const [data, setData] = useState(null);
    const [status, setStatus] = useState(null);

    const [category, setCategory] = useState('');
    const [material, setMaterial] = useState('');
    const [property, setProperty] = useState('');

    const onSubmit = () => {
        axios.get(`http://127.0.0.1:5000/api/materials/${category}/${material}/${property}`)
        .then(response => {
            setData(response.data.properties);
            setStatus({
                code: response.status,
                message: response.statusText
            });
            console.log(response);
        })
        .catch(error => {
            console.error(error);
            setStatus({
                code: error.request.status,
                message: error.request.statusText
            });
            setData(null)
        });
    }

  return (
    <div className='flex flex-col w-80 bg-gray-400 p-2 rounded-lg mt-5'>
        <input
            className='py-1 my-2 px-1 rounded-lg shadow-md'
            type="text" 
            placeholder="Category"
            onChange={event => setCategory(event.target.value)}
        />
        <input
            className='py-1 my-2 px-1 rounded-lg shadow-md'
            type="text" 
            placeholder="Material"
            onChange={event => setMaterial(event.target.value)}
        />
        <input
            className='py-1 my-2 px-1 rounded-lg shadow-md'
            type="text"
            placeholder="Property"
            onChange={event => setProperty(event.target.value)}
        />
        <button 
            className='flex justify-center py-1 my-2 bg-blue-300 rounded-lg shadow-md text-blue-600 hover:bg-blue-200' 
            onClick={onSubmit}
        >
            Search
        </button>

        {(status) && (
            <div className='flex flex-col space-y-2 mt-10 '>

                <div className={`flex flex-row items-center pr-2 py-2 my-2 ${status.code === 200 ? 'bg-green-200' : 'bg-red-200'} rounded-lg max-w-fit`}>
                    <p className={`font-bold ${status.code === 200 ? 'text-green-500' : 'text-red-500'} px-2 py-1 text-sm`}>{status.code}</p>
                    <div className={`${status.code === 200 ? 'border-green-300' : 'border-red-300'} border-l-2 h-[25px] w-[1px] pr-2`}/>
                    <h2 className={`font-bold ${status.code === 200 ? 'text-green-500' : 'text-red-500'} text-sm`}>{status.message}</h2>
                </div>

                    <div className='flex flex-col w-full pt-2'>
                        {data?.map((item) => (
                            <div className='flex flex-row items-center pr-2 py-2 my-0.5 bg-blue-200 rounded-lg max-w-fit cursor-pointer hover:scale-105 ease-out duration-300'>
                                <p className='font-bold text-blue-500 px-2 py-1 text-sm'>{item.name}</p>
                                <div className='border-blue-300 border-l-2 h-[25px] w-[1px] pr-2'/>
                                <h2 className='font-bold text-blue-500 text-sm'>{item.value}</h2>
                            </div>
                        ))}
                </div>
            </div>
        )}
    </div>
  )
}

export default GetMaterials
