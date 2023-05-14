import React, { useEffect, useState } from 'react'
import ToolView from './views/ToolView'
import SideTab from './views/SideTab'

const Tools = () => {

  const [height, setHeight] = useState(window.innerHeight)
    useEffect(() => {
        const handleWindowResize = () => setHeight(window.innerHeight)
        window.addEventListener('resize', handleWindowResize)
        
        return () => window.removeEventListener('resize', handleWindowResize)
    }, [])

    

  return (
    <div div className='flex w-full' style={{height: height - 82}}>
      <SideTab />
      <ToolView />
    </div>
  )
}

export default Tools
