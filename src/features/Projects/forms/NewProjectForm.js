import { CircularProgress } from '@mui/material';
import { green } from '@mui/material/colors';
import { Box, Button, } from '@mui/material'
import { addDoc, serverTimestamp, collection, onSnapshot, doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase';
import { slugFromTitle } from '../../../utility/HelperFunctions';
import AddMembers from './AddMembers';


const NewProjectForm = ({ handleClose, user }) => {

    const [isPrivate, setIsPrivate] = useState(false)
    const [projectName, setProjectName] = useState('')

    const [users, setUsers] = useState(['None']);

    useEffect(() => {
      const getUsers = onSnapshot(
          collection(db, 'users'),
          (snapshot) => {
            const allUsers = snapshot.docs.map((doc) => {
                const docData = doc.data()
              if (doc.id !== user.uid) {
                return ({
                    uid: doc.id,
                    displayName: docData.displayName,
                    email: docData.email,
                    isAdmin: false,
                })
              } else {
                return null
              }
            })
            setUsers(allUsers.filter((name) => name !== null))
        },
        (error) => {
            console.log(error)
        })
        return () => {
            getUsers()
        }
    }, [user])

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

    const [canSubmit, setCanSubmit] = useState(false)
    const handleCreate = async () => {
        if (!projectName) return;
        setLoading(true)
        const projectSlug = slugFromTitle(projectName);
      
        await addDoc(collection(db, 'projects'), {
          createdAt: serverTimestamp(),
          name: projectName,
          createdBy: doc(db, 'users', user.uid),
          members: [
            {
                user: doc(db, 'users', user.uid),
                isAdmin: false,
            },
            ...users.map((user) => ({
                user: doc(db, 'users', user.uid),
                isAdmin: user.isAdmin,
            }))
          ],
          private: isPrivate,
          slug: projectSlug,
        });
        
        setSuccess(true)    
        setLoading(false)
        setTimeout(() => {
            handleClose();
        }, 1000)
    };

    useEffect(() => {
        if (projectName) {
            setCanSubmit(true)
        } else {
            setCanSubmit(false)
        }
    }, [projectName])


  return (
    <div>
        <button className='absolute top-0 left-2 text-2xl' onClick={handleClose}>&times;</button>
        <input
            type='text'
            placeholder='Project Name'
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className='w-full py-2 rounded-lg outline-none border-none focus:border-blue-500 placeholder:font-bold font-bold text-2xl placeholder:text-2xl'
        />
        <div className='flex flex-row space-x-2'>
            <button
                onClick={() => setIsPrivate(false)}
                className={`
                    flex flex-row items-center bg-gray-300 px-2 rounded-lg duration-300 ease-out
                    ${!isPrivate ? 'bg-green-200 text-green-500' : 'bg-gray-300 text-gray-500 opacity-40 hover:bg-gray-100'}
                `}
            >
                <h1 className='text-md font-semibold'>Public</h1>
            </button>
            <button
                onClick={() => setIsPrivate(true)}
                className={`
                    flex flex-row items-center bg-gray-300 px-2 rounded-lg duration-300 ease-out
                    ${isPrivate ? 'bg-red-200 text-red-500' : 'bg-gray-300 text-gray-500 opacity-40 hover:bg-gray-100'}
                `}
            >
                <h1 className='text-md font-semibold'>Private</h1>
            </button>
        </div>
        {isPrivate && <AddMembers users={users} />}
        <footer
            className='flex justify-end'
        >
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
                Create Project
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
            
        </footer>   
    </div>
  )
}

export default NewProjectForm
