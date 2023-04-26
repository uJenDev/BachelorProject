import React, { useEffect, useState } from 'react'
import axios from 'axios';

const GetMaterials = () => {
    const [data, setData] = useState(null);
    const [status, setStatus] = useState(null);

    const [material, setMaterial] = useState('');
    const [property, setProperty] = useState('');

    const onSubmit = () => {
        axios.get(`http://127.0.0.1:5000/api/materials/${material}/${property}`)
        .then(response => {
            setData(response.data.data);
            setStatus(response.data.status);
            console.log(response);
        })
        .catch(error => {
            console.error(error);
        });
    }

  return (
    <div className='flex flex-col w-60 bg-gray-400 p-2 rounded-lg mt-5'>
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
            Submit
        </button>

        {(status) && (
            <div className='flex flex-col space-y-2 mt-10'>
                <div className='flex flex-row space-x-2 items-center'>
                    <h1 className='text-green-400 bg-green-100 rounded-lg px-2 py-1'>STATUS</h1>
                    <h1 className='font-bold text-blue-500'>{status}</h1>
                </div>
                <div className='flex flex-row space-x-2 items-center'>
                    <h1 className='text-orange-400 bg-orange-100 rounded-lg px-2 py-1'>DATA</h1>
                    {data.map((item) => (
                        <h2 className='font-bold text-blue-500'>{item}</h2>
                    ))}
                </div>
            </div>
        )}
    </div>
  )
}

export default GetMaterials
