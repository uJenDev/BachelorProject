import React from 'react'
import GetMaterials from '../features/GetMaterials';

const Home = () => {
    

  return (
    <div className='flex pb-10'>
        <div className='flex flex-col px-10 items-center'>
            <h1 className='font-bold text-4xl pt-10'>CNC Project</h1>
            <GetMaterials />
        </div>
    </div>
  )
}

export default Home