import { collection, getDoc, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase';
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
            const projectRef = partData.projectRef;
            return {
              ...doc.data(),
              id: doc.id,
              project: await (await getDoc(projectRef)).data(),
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
    useEffect(() => {
        const handleWindowResize = () => setHeight(window.innerHeight)
        window.addEventListener('resize', handleWindowResize)
        
        return () => window.removeEventListener('resize', handleWindowResize)
    }, [])


  return (
    <div div className='flex w-full' style={{height: height - 82}}>
      <SideTab 
        parts={parts}
      />
      <PartView 
        parts={parts}
      />
    </div>
  )
}

export default Parts
