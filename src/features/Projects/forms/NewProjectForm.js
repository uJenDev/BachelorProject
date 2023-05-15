import { addDoc, serverTimestamp, collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase';
import { slugFromTitle } from '../../../utility/HelperFunctions';
import AddMembers from './AddMembers';


const NewGroupForm = ({ handleClose, user }) => {

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

    useEffect(() => {
        console.log('Names: ', users)
    }, [users])


    const handleCreate = async () => {
        if (!projectName) return;
        const projectSlug = slugFromTitle(projectName);
      
        await addDoc(collection(db, 'projects'), {
          createdAt: serverTimestamp(),
          name: projectName,
          createdBy: {
            displayName: user.displayName,
            uid: user.uid,
            email: user.email,
          },
          members: [
            {
                displayName: user.displayName,
                uid: user.uid,
                email: user.email,
                isAdmin: true,
            },
            ...users,
          ],
          private: isPrivate,
          slug: projectSlug,
        });
      
        handleClose();
    };



  return (
    <div>
        <button className='absolute top-0 left-2 text-2xl' onClick={handleClose}>&times;</button>
        <input
            type='text'
            placeholder='Project Name'
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className='w-full py-2 rounded-lg outline-none border-none focus:border-blue-500 placeholder:font-bold font-bold text-xl placeholder:text-xl'
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
            className='flex flex-row justify-end space-x-5 mt-2'
        >
            <button
                onClick={handleCreate}
                disabled={!projectName}
                className={`
                    flex flex-row items-center bg-blue-200 text-blue-500 px-2 rounded-lg duration-300 ease-out 
                    ${!projectName ? 'opacity-40' : 'hover:bg-blue-500 hover:text-white hover:scale-105'}
                `}
            >
                <h1 className='text-md font-semibold'>Create</h1>
            </button>
            
        </footer>   
    </div>
  )
}

export default NewGroupForm
