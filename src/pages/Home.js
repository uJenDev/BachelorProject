
import React, { useEffect, useState } from 'react'
import Groups from '../features/Groups/Groups';

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

  const [height, setHeight] = useState(window.innerHeight)
  useEffect(() => {
    const handleWindowResize = () => setHeight(window.innerHeight)
    window.addEventListener('resize', handleWindowResize)
    
    return () => window.removeEventListener('resize', handleWindowResize)
}, [])

  return (
    <div 
      className='flex w-full'
      style={{height: height - 80}}
    >
      <Groups />
    </div>
  )
}

export default Home