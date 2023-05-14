import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const ToolCard = ({
    tool,
}) => {

    const toolId = useParams().tool
    const location = useLocation()
    const navigate = useNavigate()

    // create a onClick that keeps all the other query params

    const onClick = () => {
        const queryParams = new URLSearchParams(location.search)
        navigate(`/tools/${tool.id}?${queryParams.toString()}`)
    }
  return (
    <button
        onClick={onClick}
        className={`
            flex items-centern px-2 py-1 text-lg font-semibold text-blue-500 bg-blue-200 max-w-fit rounded-lg
            hover:scale-105 hover:shadow-md duration-300 ease-out
            ${tool.id === toolId && 'scale-105 shadow-md translate-x-3 text-white bg-blue-500'}
        `}
    >
        <p className=''>{tool.name} </p>
    </button>
  )
}

export default ToolCard
