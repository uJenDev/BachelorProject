import { collection, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { db } from '../../../firebase';
import { selectUser } from '../../../slices/userSlice';
import CoolantCard from '../components/CoolantCard';
import NewCoolantModal from './NewCoolantModal.js';

const SideTab = ({
  width,
}) => {
  const [coolants, setCoolants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const getCoolants = onSnapshot(
      query(collection(db, 'coolant')),
        (snapshot) => {
        setCoolants(
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
      getCoolants();
    };
  }, []);

  const user = useSelector(selectUser);


  const [showNewCoolantModal, setShowNewCoolantModal] = useState(false);

  return (
    <>
      <div className={`flex flex-col mt-10 ${width}`}>
        <div className='flex flex-col'>
          <p className='text-4xl font-semibold px-1'>Coolants</p>
          <div className='flex items-center'>
            {coolants?.length > 0 && <p className='text-sm text-gray-500 px-2'>{coolants.length} coolants</p>}
            <button
                onClick={() => setShowNewCoolantModal(true)}
                className={`
                  pl-1 pr-2 py-1 flex items-center text-sm text-blue-500  rounded-lg 
                  duration-300 ease-out hover:bg-blue-500 hover:text-white hover:scale-105
                  ${showNewCoolantModal && 'bg-blue-500 text-white scale-105'}
                `}
            >
              <MdAdd className='text-lg'/>
              <p className=''>New</p>
            </button>
          </div>  
        </div>
        <div className='flex flex-col space-y-2 mt-3 border-l-2 pl-2'>
            {coolants?.map((coolant) => (
                <CoolantCard key={coolant.id} coolant={coolant} />
            ))}
        </div>
      </div>
      <NewCoolantModal
        open={showNewCoolantModal}
        handleClose={() => setShowNewCoolantModal(false)}
        user={user}
      />
    </>
  );
};

export default SideTab;