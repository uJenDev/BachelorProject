import { collection, getDoc, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../firebase';
import React, { useEffect, useState } from 'react'
import PartView from './views/PartView'
import SideTab from './views/SideTab'

const Parts = () => {

  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const getParts = onSnapshot(
      query(collection(db, 'part')),
      async (snapshot) => {
        const partsWithDetails = await Promise.all(
          snapshot.docs.map(async (doc) => {
            const partData = doc.data();
            const partId = doc.id;
            const projectRef = partData.projectRef;
            return {
              ...partData,
              id: partId,
              project: await (await getDoc(projectRef)).data()
            };
          })
        );
        setParts(partsWithDetails);
        setLoading(false);
      },
      (error) => {
        console.log(error);
        setLoading(false);
      }
    );

    return () => {
      getParts();
    };
  }, []);

  const [height, setHeight] = useState(window.innerHeight)
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
      const handleWindowResize = () => {
        setHeight(window.innerHeight)
        setWidth(window.innerWidth)
      }
      window.addEventListener('resize', handleWindowResize)
      
      return () => window.removeEventListener('resize', handleWindowResize)
  }, [])


  return (
    <div className='w-full flex justify-center items-center' style={{height: height - 82}}>
      <div className='h-full flex'>
        <SideTab 
          parts={parts}
          width={width}
          height={height}
          // width={width > 950 ? 'w-[300px]' : 'w-[300px]'}
        />
        <PartView 
          parts={parts.filter(part => part.project !== null)}
          width={width > 950 ? 'w-[600px]' : 'w-[400px]'}
        />
      </div>
    </div>
  )
}

export default Parts