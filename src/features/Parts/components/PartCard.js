import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const PartCard = ({
    part,
}) => {

    const partId = useParams().part
    const location = useLocation()
    const navigate = useNavigate()

    // create a onClick that keeps all the other query params

    const onClick = () => {
        const queryParams = new URLSearchParams(location.search)
        navigate(`/parts/${part.id}?${queryParams.toString()}`)
    }
  return (
    <button
        onClick={onClick}
        className={`
            flex items-centern px-2 py-1 text-lg font-semibold text-blue-500 bg-blue-200 max-w-fit rounded-lg
            hover:scale-105 hover:shadow-md duration-300 ease-out
            ${part.id === partId && 'scale-105 shadow-md translate-x-3 text-white bg-blue-500'}
        `}
    >
        <p className=''>{part.name} </p>
    </button>
  )
}

export default PartCard
