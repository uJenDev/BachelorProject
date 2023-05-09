import { addDoc, serverTimestamp, collection } from 'firebase/firestore';
import React, { useState } from 'react'
import { db } from '../../../firebase';
import { slugFromTitle } from '../../../utility/HelperFunctions';


const NewGroupForm = ({ handleClose, user }) => {

    const [isPrivate, setIsPrivate] = useState(false)
    const [groupName, setGroupName] = useState('')

    const handleCreate = async () => {
        if (!groupName) return;
        const groupSlug = slugFromTitle(groupName);
      
        await addDoc(collection(db, 'groups'), {
          createdAt: serverTimestamp(),
          name: groupName,
          createdBy: {
            displayName: user.displayName,
            uid: user.uid,
            email: user.email,
          },
          members: [
            {
              isAdmin: true,
              uid: user.uid,
            },
          ],
          private: isPrivate,
          slug: groupSlug,
        });
      
        handleClose();
    };



  return (
    <div>
        <input
            type='text'
            placeholder='Group Name'
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className='w-full p-2 rounded-lg outline-none border-none focus:border-blue-500 placeholder:font-bold font-bold text-xl placeholder:text-xl'
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
        <footer
            className='flex flex-row justify-end space-x-5 mt-2'
        >
            <button
                onClick={handleClose}
                className='flex flex-row items-center bg-red-200 text-red-500 px-2 rounded-lg duration-300 ease-out hover:bg-red-500 hover:text-white hover:scale-105'
            >
                <h1 className='text-md font-semibold'>Cancel</h1>
            </button>
            <button
                onClick={handleCreate}
                disabled={!groupName}
                className={`
                    flex flex-row items-center bg-blue-200 text-blue-500 px-2 rounded-lg duration-300 ease-out 
                    ${!groupName ? 'opacity-40' : 'hover:bg-blue-500 hover:text-white hover:scale-105'}
                `}
            >
                <h1 className='text-md font-semibold'>Create</h1>
            </button>
            
        </footer>   
    </div>
  )
}

export default NewGroupForm
