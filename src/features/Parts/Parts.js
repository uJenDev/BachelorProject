import { collection, getDoc, onSnapshot, query, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import React, { useEffect, useState } from 'react'
import PartView from './views/PartView'
import SideTab from './views/SideTab'
import { useSelector } from 'react-redux';
import { selectUser } from '../../slices/userSlice';

const Parts = () => {

  const user = useSelector(selectUser)
  const userRef = doc(db, 'users', user.uid)

  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const getParts = onSnapshot(
      query(
        collection(db, 'part')
      ),
      async (snapshot) => {
        const partsWithDetails = await Promise.all(
          snapshot.docs.map(async (doc) => {
            const partData = doc.data();
            const partId = doc.id;
            const projectRef = partData.projectRef;

            const project = await (await getDoc(projectRef)).data();
            const isUserMember = project.members.some(member => member.user.id === userRef.id);

            if (!isUserMember) return null;

            return {
              ...partData,
              id: partId,
              project,
            };
          })
        );
        setParts(partsWithDetails.filter(Boolean));
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
    <div className='w-full flex justify-center items-center' style={{height: height - 102}}>
      <div className='h-full flex'>
        <SideTab 
          parts={parts}
          width={width}
          height={height}
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
