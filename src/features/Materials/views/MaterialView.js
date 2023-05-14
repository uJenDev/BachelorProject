import React, { useEffect, useState } from 'react';
import MaterialHeader from '../components/MaterialHeader';
import { useParams } from 'react-router-dom';
import { db } from '../../../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import SettingsList from './SettingsList';

const MaterialView = () => {
  const materialId = useParams().material;
  const [material, setMaterial] = useState(null);

  useEffect(() => {
    if (!materialId) return;

    const materialRef = doc(db, 'material', materialId);

    const getMaterial = onSnapshot(
      materialRef,
      (doc) => {
        if (!doc.exists()) {
            console.log('No such document!');
            return null;
        } else {
            setMaterial({ 
                id: doc.id,
                categoryTitle: doc.data().categoryRef.id,
                ...doc.data() 
            });
        }
        },
        (error) => {
          console.log(error);
        },
      );
  
      return () => {
        getMaterial();
      };
    }, [materialId]);

    useEffect(() => {
        if (!materialId) setMaterial(null);
    }, [materialId])

    return (
      <div className='flex flex-col w-full items-center'>
        {material && (
          <div className='flex flex-col px-2 bg-gray-200 py-2 w-full h-full'>
            <MaterialHeader material={material} />
            <div className='flex flex-row'>
              <SettingsList />
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default MaterialView;
  