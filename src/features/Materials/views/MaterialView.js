import React, { useEffect, useState } from 'react';
import PropertyList from '../components/PropertyList';
import MaterialHeader from '../components/MaterialHeader';
import { useParams } from 'react-router-dom';
import { db } from '../../../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const MaterialView = () => {
  const { material } = useParams();
  const [thisMaterial, setMaterial] = useState(null);

  useEffect(() => {
    if (!material) return;

    const materialRef = doc(db, 'material', material);

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
    }, [material]);

    useEffect(() => {
        if (!material) setMaterial(null);
    }, [material])

    return (
      <div className='flex flex-col w-full items-center'>
        {thisMaterial && (
          <div className='flex flex-col px-2 bg-gray-200 py-2 rounded-xl w-full h-full my-2 mr-2'>
            <MaterialHeader material={thisMaterial} />
  
            <div className='flex flex-row'>
              {/* {thisMaterial.properties && (
                <PropertyList material={thisMaterial} />
              )} */}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default MaterialView;
  