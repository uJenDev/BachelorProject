import React from 'react'
import { useParams } from 'react-router-dom'

const ToolView = () => {
  
  const toolId = useParams().tool

  return (
    <div>
      {toolId}
    </div>
  )
}

export default ToolView
