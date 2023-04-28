import React, { useEffect } from 'react'
import axios from 'axios';

const MaterialCategoryView = ({
    selectedMaterial,
    setSelectedMaterial
}) => {

    const [data, setData] = React.useState(null);
    const [status, setStatus] = React.useState(null);

    useEffect(() => {
        axios.get(`http://127.0.0.1:5001/api/materials/`)
        .then(response => {
            setData(response.data);
            setStatus({
                code: response.status,
                message: response.statusText
            });
        })
        .catch(error => {
            console.error(error);
            setStatus({
                code: error.request.status,
                message: error.request.statusText
            });
            setData(null)
        });
    }, []);

  return (
    <div className='flex flex-col min-w-fit'>
        {(status?.code === 200) && 
        (
            <div className='bg-gray-300 py-5 rounded-xl shadow-md px-5'>
                <p className='font-bold text-3xl flex items-center justify-center'>Materials</p>  
                {data?.map((category, index) => (
                    <div key={index} className='flex flex-col space-y-2 mt-10 '>
                        <h1 className={`flex items-center px-3 font-bold text-xl border-t-2 border-white pt-5 `}>{category.name}</h1>
                        {category.data.map((material, index) => (
                            <div key={index} className='flex flex-col space-y-2 mt-10'>
                                <button
                                    onClick={() => {setSelectedMaterial(material);}}
                                    className={`text-lg bg-blue-200 text-blue-500 max-w-fit px-2 mx-2 rounded-lg 
                                        cursor-pointer hover:scale-105 hover:shadow-md ease-out duration-300
                                        ${selectedMaterial === material && 'bg-blue-500 text-white scale-105 shadow-md translate-x-3'}`}
                                >
                                    {material.name}
                                </button>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default MaterialCategoryView
