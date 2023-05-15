import React, { useEffect, useState } from 'react';
import {
  Autocomplete,
  TextField,
} from '@mui/material';
import { db, storage } from '../../../firebase';
import { collection, doc, getDoc, onSnapshot, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import NewPartFiles from '../components/NewPartFiles';
import NewPartDimensions from '../components/NewPartDimensions';
import { slugFromTitle } from '../../../utility/HelperFunctions';

const NewPartModalForm = ({
  handleClose,
  user,
  projects
}) => {

  const [name, setName] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [images, setImages] = useState(null);
  const [models3D, setModels3D] = useState(null);
  const [pdfs, setPdfs] = useState(null);
  const [material, setMaterial] = useState(null);
  const [dimensions, setDimensions] = useState({
    length: '',
    width: '',
    height: '',
  });

  const [loading, setLoading] = useState(false);
  const [materials, setMaterials] = useState([]);
  useEffect(() => {
    setLoading(true);
    const getMaterials = onSnapshot(
      query(
        collection(db, 'material'),
      ),
      async (snapshot) => {
        const materialsWithDetails = await Promise.all(
          snapshot.docs.map(async (doc) => {
            const materialData = doc.data();
            const categoryRef = materialData.categoryRef;
  
            return {
              id: doc.id,
              ...materialData,
              category: await (await getDoc(categoryRef)).data(),
            };
          })
        );
  
        setMaterials(materialsWithDetails);
        setLoading(false);
      },
      (error) => {
        console.log(error);
        setLoading(false);
      }
    );
    return () => {
      getMaterials();
    };
  }, []);


  const handleAdd = async () => {
    if (!canSubmit) return;
    const docId = slugFromTitle(name)
    const projectRef = doc(db, 'projects', selectedProject.id);

    const uploadFiles = async (folder, fileList) => {
      const fileUrls = [];
      for (const file of fileList) {
        const fileId = uuidv4();
        const fileRef = ref(storage, `parts/${docId}/${folder}/${fileId}`);
        await uploadBytes(fileRef, file);
        const url = await getDownloadURL(fileRef);
        fileUrls.push(url);
      }
      return fileUrls;
    };

    images && await uploadFiles('images', images);
    models3D && await uploadFiles('models3D', models3D);
    pdfs && await uploadFiles('pdfs', pdfs);

    const partData = {
      name: name,
      createdAt: serverTimestamp(),
      createdBy: {
        displayName: user.displayName,
        email: user.email,
        uid: user.uid,
      },
      projectRef: projectRef,
      dimensions: dimensions,
      materialRef: doc(db, 'material', material.id),
    };

    await setDoc(doc(db, 'part', docId), partData);
    handleClose();
  };

  const handleFileChange = (e, setField) => {
    setField(e.target.files);
  };

  const [canSubmit, setCanSubmit] = useState(false);
  useEffect(() => {
    if (name && selectedProject && dimensions.length && dimensions.width && dimensions.height && material) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [name, selectedProject, dimensions, material]);

  return (
    <div className=''>
      <button className='absolute top-0 left-2 text-2xl' onClick={handleClose}>&times;</button>
      <Autocomplete
          options={projects}
          size='small'
          value={selectedProject}
          groupBy={(option) => option.private ? 'Private' : 'Public'}
          getOptionLabel={(option) => option.name}
          sx={{ width: 200 }}
          onChange={(e, value) => setSelectedProject(value)}
          renderInput={(params) => <TextField {...params} label="What project?" variant='standard' />}
          renderGroup={(params) => (
              <div key={params.key}>
                  <p className='px-2 font-semibold border-b-2 border-gray-200'>{params.group}</p>
                  <p>{params.children}</p>
              </div>
          )}
      />
      <input
          placeholder='Name of part'
          className='w-full focus:outline-none focus:border-gray-500 mt-3 text-2xl font-bold placeholder:font-bold'
          value={name}
          onChange={(e) => setName(e.target.value)}
      />
      <Autocomplete
          options={materials}
          size='small'
          value={material}
          groupBy={(material) => material.category.title}
          getOptionLabel={(material) => material.title}
          sx={{ width: 200 }}
          onChange={(e, value) => setMaterial(value)}
          renderInput={(params) => <TextField {...params} label="What material?" variant='standard' />}
          renderGroup={(params) => (
              <div key={params.key}>
                  <p className='px-2 font-semibold border-b-2 border-gray-200'>{params.group}</p>
                  <p>{params.children}</p>
              </div>
          )}
        />
      <NewPartDimensions 
        dimensions={dimensions}
        setDimensions={setDimensions}
      />
      <NewPartFiles
        handleFileChange={handleFileChange}
        images={images}
        setImages={setImages}
        models3D={models3D}
        setModels3D={setModels3D}
        pdfs={pdfs}
        setPdfs={setPdfs}
      />
      <div className='flex justify-end'>
        <button
          onClick={handleAdd}
          disabled={!name || !selectedProject}
          className={`
                    text-lg text-blue-500 bg-blue-200 px-2 rounded-lg
                    duration-300 ease-out absolute bottom-2 right-2
                    ${!canSubmit ? 'opacity-50' : 'hover:text-white hover:bg-blue-500 hover:scale-105'}
                `}
            >
                Add
            </button>
        </div>
    </div>
  );
};

export default NewPartModalForm;
