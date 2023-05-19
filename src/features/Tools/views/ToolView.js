import { Box, Button, CircularProgress, TextField } from '@mui/material';
import { deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { MdInfo } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../../../firebase';
import { green } from '@mui/material/colors';


const preservedValues = [
  'createdAt',
  'createdBy',
  'id',
  'name',
  'slug'
]

const ToolView = ({
  width
}) => {
  
  const navigate = useNavigate()
  const toolId = useParams().tool
  const [tool, setTool] = useState(null)
  const [prevTool, setPrevTool] = useState(null)

  useEffect(() => {
      if (!toolId) return
      const getTool = onSnapshot(
          doc(db, 'tool', toolId),
          (doc) => {
              setTool({
                ...doc.data(),
                id: doc.id,
              })
              setPrevTool({
                ...doc.data(),
                id: doc.id,
              })
        },
      (error) => {
          console.log(error)
      })
      return () => {
          getTool()
      } 
  }, [toolId])

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
    const toolRef = doc(db, 'tool', toolId)
    const toolData = {
      ...tool,
    }
    await updateDoc(toolRef, toolData)
    setLoading(false)
    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
    }, 1000)
  }

  const handleDelete = async () => {
    setLoading(true)
    const toolRef = doc(db, 'tool', toolId)
    await deleteDoc(toolRef)
    setLoading(false)
    navigate('/tools')
  }

  const [hasChanges, setHasChanges] = useState(false)
  useEffect(() => {
    if (!tool || !prevTool) return
    const toolKeys = Object.keys(tool).filter((key) => !preservedValues.includes(key))
    const prevToolKeys = Object.keys(prevTool).filter((key) => !preservedValues.includes(key))
    if (toolKeys.length !== prevToolKeys.length) {
      setHasChanges(true)
      return
    }
    for (let i = 0; i < toolKeys.length; i++) {
      if (tool[toolKeys[i]] !== prevTool[toolKeys[i]]) {
        setHasChanges(true)
        return
      }
    }
    setHasChanges(false)
  }, [tool, prevTool])

  if (!toolId) return (
    <div className={`flex flex-col items-start mt-10 ${width}`}>
      <p className='text-xl font-regular px-1'>Detailed View</p>
      <div className='flex flex-col text-blue-500 bg-blue-200 rounded-lg opacity-70 animate-pulse py-2 px-4'>
        <div className='flex items-center space-x-2 mb-2'>
          <MdInfo className='text-xl' />
          <p className='text-2xl '>
            No tool selected
          </p>
        </div>
        <p className='text-lg'>
          Please select a tool from the list on the left
        </p>
      </div>
    </div>
);
  return (
    <div className={`mt-10 ${width}`}>
      <p className='text-xl font-regular px-1'>Detailed View</p>
      <div className='flex flex-col space-y-4 mt-5'>
        {tool && Object.keys(tool).filter((key) => !preservedValues.includes(key)).map((key) => {
          return (
            <TextField
              key={key}
              type={key === 'name' ? 'text' : 'number'}
              label={key}
              value={tool[key]}
              onChange={(e) => {
                setTool({
                  ...tool,
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

export default ToolView
