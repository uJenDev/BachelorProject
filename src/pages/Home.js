
import React from 'react'
import SideTab from '../features/AddMaterials/SideTab';
import Posts from '../features/Posts/Posts';

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
    <div className='flex w-full'>
      <Posts />
    </div>
  )
}

export default Home