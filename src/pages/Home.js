
import React from 'react'
import SideTab from '../features/SideTab';

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