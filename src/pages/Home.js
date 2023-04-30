import { collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import MaterialKnown from '../features/MaterialKnown';

import SideTab from '../features/SideTab';
import { db } from '../firebase';

const Home = () => {

  //   const [data, setData] = useState(null);

  //   useEffect(() => {

  //     const getCategory = onSnapshot(
  //         collection(db, 'material'),
  //         (snapshot) => {
  //           setData(snapshot.docs.map(doc => ({
  //                 id: doc.id,
  //                 ...doc.data()
  //             })))
  //     },
  //     (error) => {
  //         console.log(error)
  //     })
  //     return () => {
  //         getCategory()
  //     }
  // }, [])

  // useEffect(() => {
  //   console.log('DATA: ', data)
  // }, [data])

  return (
    <div className='flex flex-col pb-10'>
        <div className='flex flex-col px-2 items-start pt-2'>
            <SideTab />
        </div>
    </div>
  )
}

export default Home