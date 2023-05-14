import React, { useState } from 'react';
import {
    Autocomplete,
    TextField,
} from '@mui/material';
import { db } from '../../../firebase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

const NewToolModalForm = ({ 
    handleClose, 
    user, 
    projects
}) => {

    const [name, setName] = useState('');
    const [selectedProject, setSelectedProject] = useState(true);


  const titleToSlug = (title) => {
    return title.toLowerCase().replace(/\s+/g, '-');
  };

  const handleAdd = async () => {
    const docId = titleToSlug(name);
    // const projectRef = doc(db, 'projects', selectedProject.id);
    const toolData = {
      name: name,
      createdAt: serverTimestamp(),
      createdBy: {
        displayName: user.displayName,
        email: user.email,
        uid: user.uid,
      },
    //   projectRef: projectRef,
    };

    await setDoc(doc(db, 'tool', docId), toolData);
    handleClose();
  };

  return (
    <div>
        <button className='absolute top-0 left-2 text-2xl' onClick={handleClose}>&times;</button>
        {/* <Autocomplete
            options={projects}
            size='small'
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
        /> */}
        <input
            placeholder='Name of tool'
            className='w-full focus:outline-none focus:border-gray-500 mt-3 text-2xl'
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        <div className='flex justify-end'>
            <button
                onClick={handleAdd}
                disabled={!name || !selectedProject}
                className={`
                    text-lg text-blue-500 bg-blue-200 px-2 rounded-lg
                    duration-300 ease-out
                    ${!name || !selectedProject ? 'opacity-50' : 'hover:text-white hover:bg-blue-500 hover:scale-105'}
                `}
            >
                Add
            </button>
        </div>
    </div>
  );
};

export default NewToolModalForm;
