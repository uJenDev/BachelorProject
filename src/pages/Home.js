import React, { useEffect, useState } from 'react'
import MaterialKnown from '../features/MaterialKnown';

import SideTab from '../features/SideTab';

const Home = () => {

    // const [data, setData] = useState(null);

    // const getData = async () => {
    //     const docRef = doc(db, 'category', 'ECdxVSEm1bH8Qc3okTQZ');
    //     const docSnap = await getDoc(docRef);
    //     if (docSnap.exists()) {
    //       setData(docSnap.data());
    //     } else {
    //       console.log('No such document!');
    //     }
    // }

    // useEffect(() => {
    //     getData();
    // }, [])

  return (
    <div className='flex flex-col pb-10'>
        <div className='flex flex-col px-2 items-start pt-2'>
            <SideTab />
        </div>
    </div>
  )
}

export default Home