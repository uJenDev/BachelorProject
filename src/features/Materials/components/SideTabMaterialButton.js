import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase';
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore';
import { MdAddCircle } from 'react-icons/md';
import NewMaterialForm from '../forms/NewMaterialForm';
import { useNavigate, useParams } from 'react-router-dom';

const SideTabMaterialButton = ({ category }) => {
  const [loading, setLoading] = useState(false);
  const [materials, setMaterials] = useState([]);
  const categoryRef = doc(db, 'category', category.id);

  const materialId = useParams().material;

  useEffect(() => {
    setLoading(true);

    const getMaterials = onSnapshot(
      query(collection(db, 'material'), where('categoryRef', '==', categoryRef)),
      (snapshot) => {
        setMaterials(snapshot.docs.map((doc) => ({
          id: doc.id,
          categoryTitle: category.title,
          ...doc.data(),
        })));
        setLoading(false);
      },
      (error) => {
        console.log(error);
        setLoading(false);
      },
    );

    return () => {
      console.log('Detaching listener');
      getMaterials();
    };
  }, []);

  const navigate = useNavigate();
  const [toggleCreateForm, setToggleCreateForm] = useState(false);

  return (
    <div className='flex flex-col space-y-2 px-3'>
      {materials.map((material) => (
        <button
          key={material.id}
          onClick={() => {
            navigate(`/materials/${category.id}/${material.id}`);
          }}
          className={`text-lg bg-blue-200 text-blue-500 max-w-fit px-2 mx-2 rounded-lg font-bold
              cursor-pointer hover:scale-105 hover:shadow-md ease-out duration-300 mt-2
              ${material.id === materialId && 'bg-blue-500 text-white scale-105 shadow-md translate-x-3'}
            `}
        >
          {material.title}
        </button>
      ))}
      {!toggleCreateForm && (
        <button
          onClick={() => {
            setToggleCreateForm(true);
          }}
          className={`text-sm text-black max-w-fit px-2 mx-2 rounded-md flex flex-row items-center space-x-1
              cursor-pointer hover:scale-105 hover:bg-blue-500 hover:text-white ease-out duration-300 mt-2 font-bold
              ${false && 'bg-blue-500 text-white scale-105 shadow-md translate-x-3'}`}
        >
          <p>New material</p>
          <MdAddCircle className='' />
        </button>
      )}

      {toggleCreateForm && (
        <NewMaterialForm
          setToggleCreateForm={setToggleCreateForm}
          categoryId={category.id}
        />
      )}
    </div>
  );
};

export default SideTabMaterialButton;
