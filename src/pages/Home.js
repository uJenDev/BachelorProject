import React, { useEffect, useState } from 'react'
import MaterialKnown from '../features/MaterialKnown';
import MaterialUnknown from '../features/MaterialUnknown';

import { db } from '../firebase';
import { collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore';

const Home = () => {
    
    const [materialKnown, setMaterialKnown] = useState(true);





  return (
    <div className='flex flex-col pb-10'>

        {/* <div className='flex flex-row px-2 space-x-5 pt-5'>
            <button 
                className={`font-bold text-blue-500 bg-blue-200 rounded-lg px-2 py-1 ease-out duration-150 ${materialKnown ? 'scale-110 bg-blue-500 text-white' : 'hover:bg-blue-100 hover:scale-110'}` }
                onClick={() => setMaterialKnown(true)}
            >
                Known!
            </button>
            <button 
                className={`font-bold text-red-500 bg-red-200 rounded-lg px-2 py-1 ease-out duration-150 ${!materialKnown ? 'scale-110 bg-red-500 text-white' : 'hover:bg-red-100 hover:scale-110'}` }
                onClick={() => setMaterialKnown(false)}
            >
                Unknown?
            </button>
        </div> */}
        <div className='flex flex-col px-2 items-start'>
            {materialKnown ? (
                <MaterialKnown />
            ) : (
                <MaterialUnknown />
            )}
        </div>
    </div>
  )
}

export default Home