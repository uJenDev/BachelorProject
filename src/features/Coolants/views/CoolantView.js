import { Box, Button, CircularProgress, TextField } from '@mui/material';
import { deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { MdInfo } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../../../firebase';
import { green } from '@mui/material/colors';
import { slugFromTitle } from '../../../utility/HelperFunctions';


const preservedValues = [
  'createdAt',
  'createdBy',
  'id',
  'slug',
  'name'
]

const CoolantView = ({
  width
}) => {
  
  const navigate = useNavigate()
  const coolantId = useParams().coolant
  const [coolant, setCoolant] = useState(null)
  const [prevCoolant, setPrevCoolant] = useState(null)

  useEffect(() => {
      if (!coolantId) return
      const getCoolant = onSnapshot(
          doc(db, 'coolant', coolantId),
          (doc) => {
              setCoolant({
                ...doc.data(),
                id: doc.id,
              })
              setPrevCoolant({
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
  }, [coolantId])

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
    const coolantRef = doc(db, 'coolant', coolantId)
    const coolantData = {
      ...coolant,
      slug: slugFromTitle(coolant.name),
    }
    await updateDoc(coolantRef, coolantData)
    setLoading(false)
    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
    }, 1000)
  }

  const handleDelete = async () => {
    setLoading(true)
    const coolantRef = doc(db, 'coolant', coolantId)
    await deleteDoc(coolantRef)
    setLoading(false)
    navigate('/coolants')
  }


  const [hasChanges, setHasChanges] = useState(false)
  useEffect(() => {
    if (!coolant || !prevCoolant) return
    const coolantKeys = Object.keys(coolant).filter((key) => !preservedValues.includes(key))
    const prevCoolantKeys = Object.keys(prevCoolant).filter((key) => !preservedValues.includes(key))
    if (coolantKeys.length !== prevCoolantKeys.length) {
      setHasChanges(true)
      return
    }
    for (let i = 0; i < coolantKeys.length; i++) {
      if (coolant[coolantKeys[i]] !== prevCoolant[coolantKeys[i]]) {
        setHasChanges(true)
        return
      }
    }
    setHasChanges(false)
  }, [coolant, prevCoolant])

  if (!coolantId) return (
    <div className={`flex flex-col items-start mt-10 ${width}`}>
      <p className='text-xl font-regular px-1'>Detailed View</p>
      <div className='flex flex-col text-blue-500 bg-blue-200 rounded-lg opacity-70 animate-pulse py-2 px-4'>
        <div className='flex items-center space-x-2 mb-2'>
          <MdInfo className='text-xl' />
          <p className='text-2xl '>
            No coolant selected
          </p>
        </div>
        <p className='text-lg'>
          Please select a coolant from the list on the left
        </p>
      </div>
    </div>
);
  return (
    <div className={`mt-10 ${width}`}>
      <p className='text-xl font-regular px-1'>Detailed View</p>
      <div className='flex flex-col space-y-4 mt-5'>
        {coolant && Object.keys(coolant).filter((key) => !preservedValues.includes(key)).map((key) => {
          return (
            <TextField
              key={key}
              type={key === 'name' ? 'text' : 'number'}
              label={key}
              value={coolant[key]}
              onChange={(e) => {
                setCoolant({
                  ...coolant,
                  [key]: e.target.value,
                })
              }}
            />
          )})
        }
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
