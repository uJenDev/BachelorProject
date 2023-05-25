import { collection, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { db } from '../../../firebase';
import { selectUser } from '../../../slices/userSlice';
import ToolCard from '../components/ToolCard';
import NewToolModal from './NewToolModal.js';

const SideTab = ({
  width,
}) => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const getTools = onSnapshot(
      query(collection(db, 'tool')),
        (snapshot) => {
        setTools(
            snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
            }))
        );
        setLoading(false);
      },
      (error) => {
        console.log(error);
        setLoading(false);
      }
    );

    return () => {
      getTools();
    };
  }, []);

  const user = useSelector(selectUser);


  const [showNewToolModal, setShowNewToolModal] = useState(false);

  return (
    <>
      <div className={`flex flex-col mt-10 ${width}`}>
        <div className='flex flex-col'>
          <p className='text-4xl font-semibold px-1'>Tools</p>
          <div className='flex items-center'>
            {tools?.length > 0 && <p className='text-sm text-gray-500 px-2'>{tools.length} tools</p>}
            <button
                onClick={() => setShowNewToolModal(true)}
                className={`
                  pl-1 pr-2 py-1 flex items-center text-sm text-blue-500  rounded-lg 
                  duration-300 ease-out hover:bg-blue-500 hover:text-white hover:scale-105
                  ${showNewToolModal && 'bg-blue-500 text-white scale-105'}
                `}
            >
              <MdAdd className='text-lg'/>
              <p className=''>New</p>
            </button>
          </div>  
        </div>
        <div className='flex flex-col space-y-2 mt-3 border-l-2 pl-2'>
            {tools?.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
            ))}
        </div>
      </div>
      <NewToolModal
        open={showNewToolModal}
        handleClose={() => setShowNewToolModal(false)}
        user={user}
        width={width}
      />
    </>
  );
};

export default SideTab;