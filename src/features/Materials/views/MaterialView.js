import { Box, Button, CircularProgress, TextField } from '@mui/material';
import { deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { MdInfo } from 'react-icons/md';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { db } from '../../../firebase';
import { green } from '@mui/material/colors';


const preservedValues = [
  'createdAt',
  'createdBy',
  'id',
  'title',
  'slug'
]

const CoolantView = ({
  width
}) => {
  
  const navigate = useNavigate()
  const materialId = useParams().material
  const [material, setMaterial] = useState(null)
  const [prevMaterial, setPrevMaterial] = useState(null)

  useEffect(() => {
      if (!materialId) return
      const getCoolant = onSnapshot(
          doc(db, 'material', materialId),
          (doc) => {
              setMaterial({
                ...doc.data(),
                id: doc.id,
              })
              setPrevMaterial({
                ...doc.data(),
                id: doc.id,
              })
        },
      (error) => {
          console.log(error)
      })
      return () => {
          getCoolant()
      } 
  }, [materialId])

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
    const buttonSx = {
        ...(success && {
          bgcolor: green[500],
          '&:hover': {
            bgcolor: green[700],
          },
        }),
      };

  const handleSave = async () => {
    setLoading(true)
    const materialRef = doc(db, 'material', materialId)
    const materialData = {
      ...material,
    }
    await updateDoc(materialRef, materialData)
    setLoading(false)
    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
    }, 1000)
  }

  const handleDelete = async () => {
    setLoading(true);
    const materialRef = doc(db, 'material', materialId);
    await deleteDoc(materialRef);
    navigate('/materials');
    setLoading(false);
  }

  const [hasChanges, setHasChanges] = useState(false)
  useEffect(() => {
    if (!material || !prevMaterial) return
    const coolantKeys = Object.keys(material).filter((key) => !preservedValues.includes(key))
    const prevCoolantKeys = Object.keys(prevMaterial).filter((key) => !preservedValues.includes(key))
    if (coolantKeys.length !== prevCoolantKeys.length) {
      setHasChanges(true)
      return
    }
    for (let i = 0; i < coolantKeys.length; i++) {
      if (material[coolantKeys[i]] !== prevMaterial[coolantKeys[i]]) {
        setHasChanges(true)
        return
      }
    }
    setHasChanges(false)
  }, [material, prevMaterial])

  if (!materialId) return (
    <div className={`flex flex-col items-start mt-10 ${width}`}>
      <p className='text-xl font-regular px-1'>Detailed View</p>
      <div className='flex flex-col text-blue-500 bg-blue-200 rounded-lg opacity-70 animate-pulse py-2 px-4'>
        <div className='flex items-center space-x-2 mb-2'>
          <MdInfo className='text-xl' />
          <p className='text-2xl '>
            No material selected
          </p>
        </div>
        <p className='text-lg'>
          Please select a material from the list on the left
        </p>
      </div>
    </div>
);
  return (
    <div className={`mt-10 ${width}`}>
      <p className='text-xl font-regular px-1'>Detailed View</p>
      <div className='flex flex-col space-y-4 mt-5'>
      {material && Object.keys(material).filter((key) => !preservedValues.includes(key) && !key.endsWith('Ref')).map((key) => {
          if (Array.isArray(material[key])) {
            return material[key].map((element, index) => (
              <TextField
                key={`${key}_${index}`}
                type='number'
                label={element.name}
                value={element.value}
                onChange={(e) => {
                  let newArray = [...material[key]]
                  newArray[index] = {
                    ...newArray[index],
                    value: Number(e.target.value),
                  }
                  setMaterial({
                    ...material,
                    [key]: newArray,
                  })
                }}
              />
            ))
          } else {
            return (
              <TextField
                key={key}
                type={key === 'title' ? 'text' : 'number'}
                label={key}
                value={material[key]}
                onChange={(e) => {
                  setMaterial({
                    ...material,
                    [key]: e.target.value,
                  })
                }}
              />
            )
          }
        })}

      <Box sx={{ m: 1, position: 'relative' }}>
          <Button
              variant="contained"
              onClick={handleSave}
              disabled={!hasChanges}
              sx={[
                  buttonSx,
              ]}
              size='large'
          >
          Save
          </Button>
          <Button
              variant="contained"
              onClick={handleDelete}
              sx={{
                  bgcolor: 'red',
                  color: 'white',
                  ml: 2,
                  '&:hover': {
                    backgroundColor: 'darkred',
                  },
              }}
              size='large'
          >
          Delete
          </Button>
          {loading && (
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
  )
}

export default CoolantView
