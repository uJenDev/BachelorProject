import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const CoolantCard = ({
    coolant,
}) => {

    const coolantId = useParams().coolant
    const location = useLocation()
    const navigate = useNavigate()

    // create a onClick that keeps all the other query params

    const onClick = () => {
        const queryParams = new URLSearchParams(location.search)
        navigate(`/coolants/${coolant.id}?${queryParams.toString()}`)
    }
  return (
    <button
        onClick={onClick}
        className={`
            flex items-centern px-2 font-semibold text-blue-500 bg-blue-200 max-w-fit rounded-md
            hover:scale-105 hover:shadow-md duration-300 ease-out
            ${coolant.id === coolantId && 'scale-105 shadow-md translate-x-3 text-white bg-blue-500'}
        `}
    >
        <p className=''>{coolant.name} </p>
    </button>
  )
}

export default CoolantCard
