import { deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { MdInfo } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../../../firebase';
import { green } from '@mui/material/colors';
import { Box, Button, CircularProgress, TextField } from '@mui/material';


const preservedValues = [
  'createdAt',
  'createdBy',
  'id',
  'name',
  'slug'
]

const PartView = ({
  width
}) => {
  
  const navigate = useNavigate()
  const partId = useParams().part
  const [part, setPart] = useState(null)
  const [prevPart, setPrevPart] = useState(null)

  useEffect(() => {
      if (!partId) return
      const getPart = onSnapshot(
          doc(db, 'part', partId),
          (doc) => {
              setPart({
                ...doc.data(),
                id: doc.id,
              })
              setPrevPart({
                ...doc.data(),
                id: doc.id,
              })
        },
      (error) => {
          console.log(error)
      })
      return () => {
          getPart()
      } 
  }, [partId])

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
    const partRef = doc(db, 'part', partId)
    const partData = {
      ...part,
    }
    await updateDoc(partRef, partData)
    setLoading(false)
    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
    }, 1000)
  }

  const handleDelete = async () => {
    setLoading(true)
    const partRef = doc(db, 'part', partId)
    await deleteDoc(partRef)
    setLoading(false)
    navigate('/parts')
  }

  const titleFromMapValue = (mapvalue) => {
    const mapValueSplit = mapvalue.split('.').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    return mapValueSplit
  }


  const [hasChanges, setHasChanges] = useState(false)
  useEffect(() => {
    if (!part || !prevPart) return
    const coolantKeys = Object.keys(part).filter((key) => !preservedValues.includes(key))
    const prevPartKeys = Object.keys(prevPart).filter((key) => !preservedValues.includes(key))
    if (coolantKeys.length !== prevPartKeys.length) {
      setHasChanges(true)
      return
    }
    for (let i = 0; i < coolantKeys.length; i++) {
      if (part[coolantKeys[i]] !== prevPart[coolantKeys[i]]) {
        setHasChanges(true)
        return
      }
    }
    setHasChanges(false)
  }, [part, prevPart])

  if (!partId) return (
    <div className={`flex flex-col items-start mt-10 ${width}`}>
      <p className='text-xl font-regular px-1'>Detailed View</p>
      <div className='flex flex-col text-blue-500 bg-blue-200 rounded-lg opacity-70 animate-pulse py-2 px-4'>
        <div className='flex items-center space-x-2 mb-2'>
          <MdInfo className='text-xl' />
          <p className='text-2xl '>
            No part selected
          </p>
        </div>
        <p className='text-lg'>
          Please select a part from the list on the left
        </p>
      </div>
    </div>
);
  return (
    <div className={`mt-10 ${width}`}>
      <p className='text-xl font-regular px-1'>Detailed View</p>
      <div className='flex flex-col space-y-4 mt-5'>
      {part && Object.keys(part).filter((key) => !preservedValues.includes(key) && !key.endsWith('Ref')).map((key) => {
            if (typeof part[key] === 'object' && !Array.isArray(part[key])) {
                return Object.keys(part[key]).map((subKey) => (
                    <TextField
                        key={`${key}_${subKey}`}
                        type='number'
                        label={titleFromMapValue(`${key}.${subKey}`)}
                        value={part[key][subKey]}
                        onChange={(e) => {
                            let newSubObject = { ...part[key] }
                            newSubObject[subKey] = e.target.value;
                            setPart({
                                ...part,
                                [key]: newSubObject,
                            })
                        }}
                    />
                ))
            } else if (Array.isArray(part[key])) {
                return part[key].map((element, index) => (
                    <TextField
                        key={`${key}_${index}`}
                        type='number'
                        label={`${key}[${index}]`}
                        value={element}
                        onChange={(e) => {
                            let newArray = [...part[key]]
                            newArray[index] = e.target.value
                            setPart({
                                ...part,
                                [key]: newArray,
                            })
                        }}
                    />
                ))
            } else {
                return (
                    <TextField
                        key={key}
                        type={key === 'name' ? 'text' : 'number'}
                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                        value={part[key]}
                        onChange={(e) => {
                            setPart({
                                ...part,
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

export default PartView
