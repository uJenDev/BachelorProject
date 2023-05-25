import React, { useEffect, useState } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  TextField,
} from '@mui/material';
import { db, storage } from '../../../firebase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import NewPartFiles from '../components/NewPartFiles';
import NewPartDimensions from '../components/NewPartDimensions';
import { slugFromTitle } from '../../../utility/HelperFunctions';
import { green } from '@mui/material/colors';

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
  const [dimensions, setDimensions] = useState({
    length: '',
    width: '',
    height: '',
  });

  const [handleCreateLoading, setHandleCreateLoading] = useState(false);
  const [success, setSuccess] = useState(false)
    const buttonSx = {
        ...(success && {
          bgcolor: green[500],
          '&:hover': {
            bgcolor: green[700],
          },
        }),
      };

    
  const [canSubmit, setCanSubmit] = useState(false)

  const handleCreate = async () => {
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
      slug: slugFromTitle(name),
      createdAt: serverTimestamp(),
      createdBy: doc(db, 'users', user.uid),
      projectRef: projectRef,
      dimensions: dimensions,
    };

    await setDoc(doc(db, 'part', docId), partData);
    
    setSuccess(true);
    setHandleCreateLoading(false);
    setTimeout(() => {
      handleClose();
    }, 1000);
  };

  const handleFileChange = (e, setField) => {
    setField(e.target.files);
  };

  useEffect(() => {
    if (name && selectedProject && dimensions.length && dimensions.width && dimensions.height) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [name, selectedProject, dimensions]);

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
        <div className='flex justify-end '>
          <Box sx={{ marginTop: 2 }}>
            <Button
              variant="contained"
              disabled={!canSubmit}
              onClick={handleCreate}
              sx={[
                  buttonSx,
              ]}
              size='large'
            >
            Create Part
            </Button>
            {handleCreateLoading && (
            <CircularProgress
              size={24}
              sx={{
                color: green[500],
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
            )}
          </Box>
        </div>
    </div>
  );
};

export default NewPartModalForm;
