import React from 'react'
import { MdLock, MdLockOpen } from 'react-icons/md'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const ProjectCard = ({
    project,
    selectedProject,
}) => {

    const navigate = useNavigate()
    const location = useLocation()

    const projectId = useParams().project
    const handleSelectProject = () => {
      const queryParams = new URLSearchParams(location.search)
      if (projectId === project.id) {
        navigate(`/posts?${queryParams.toString()}`)
      } else {
        navigate(`/posts/${project.id}?${queryParams.toString()}`)
      }
    }


  return (
    <div className='flex items-center w-60'>
      <button 
          onClick={() => handleSelectProject()}
          className={`
              text-lg font-semibold w-full rounded-md text-white duration-300 ease-out 
              ${selectedProject && selectedProject.id === project.id ? 'bg-blue-500 scale-105 ' : 'bg-gray-500 hover:bg-gray-400'}
          `}
      >
          {project.name}
      </button>
      {project.private ? (
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

export default ProjectCard
