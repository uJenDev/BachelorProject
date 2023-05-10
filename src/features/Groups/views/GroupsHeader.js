import React, { useState } from 'react'
import { MdChevronLeft, MdChevronRight, MdExpandMore } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import GroupCard from '../components/GroupCard'

const GroupsHeader = ({
    groups,
    selectedGroup,
    setSelectedGroup
}) => {

    const [isExpanded, setIsExpanded] = useState(false)
    const navigate = useNavigate()

  return (
    <div className='flex flex-row'>
        <div className={`
            flex flex-col border-black pt-2 bg-gray-700 duration-300 ease-out overflow-hidden transition-all
            ${isExpanded ? 'w-full px-5 border-r-2' : 'w-0 '}
        `}
        >
            <div className={`flex space-x-1 items-center mb-2 duration-300 ease-out ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
                <MdExpandMore className='text-white'/>
                <h1 className='text-lg font-regular text-white'>Groups</h1>
            </div>
            <div className={`flex flex-col max-w-fit space-y-2 duration-300 ease-out ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
                {groups && groups.map(group => (
                    <GroupCard
                        key={group.id}
                        group={group}
                        selectedGroup={selectedGroup}
                        setSelectedGroup={setSelectedGroup}
                    />
                ))
                }
                <button 
                    onClick={() => navigate('/groups')}
                    className='text-white text-sm rounded-md py-1 duration-300 ease-out hover:bg-gray-500 text-start w-fit px-2'
                >
                    <p>View all groups</p>
                </button>
            </div>
        </div>
        <div className='items-start flex'>
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className=' duration-300 ease-out hover:text-blue-500 hover:scale-110'
            >
                {isExpanded ? <MdChevronLeft className='text-3xl'/> : <MdChevronRight className='text-3xl'/>}
            </button>
        </div>
    </div>
  )
}

export default GroupsHeader
