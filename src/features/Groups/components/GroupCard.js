import React from 'react'

const GroupCard = ({
    group,
    selectedGroup,
    setSelectedGroup
}) => {
  return (
    <button 
        onClick={() => setSelectedGroup(group === selectedGroup ? null : group)}
        className={`
            text-lg font-regular  w-40 rounded-md text-white duration-300 ease-out 
            ${selectedGroup && selectedGroup.id === group.id ? 'bg-blue-500 scale-105 ' : 'bg-gray-500 hover:bg-gray-400'}
        `}
    >
        {group.name}
    </button>
  )
}

export default GroupCard
