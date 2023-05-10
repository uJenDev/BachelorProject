import React from 'react'
import { MdLock, MdLockOpen } from 'react-icons/md'

const GroupCard = ({
    group,
    selectedGroup,
    setSelectedGroup
}) => {
  return (
    <div className='flex items-center w-60'>
      <button 
          onClick={() => setSelectedGroup(group === selectedGroup ? null : group)}
          className={`
              text-lg font-semibold w-full rounded-md text-white duration-300 ease-out 
              ${selectedGroup && selectedGroup.id === group.id ? 'bg-blue-500 scale-105 ' : 'bg-gray-500 hover:bg-gray-400'}
          `}
      >
          {group.name}
      </button>
      {group.private ? (
          <MdLock className='text-red-500 ml-2 text-2xl'/>
        )
        :
        (
          <MdLockOpen className='text-green-500 ml-2 text-2xl'/>
        )
      }
    </div>
  )
}

export default GroupCard
