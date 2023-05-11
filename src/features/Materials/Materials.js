import React, { useEffect, useState } from 'react'
import SideTab from './SideTab'
import MaterialView from './views/MaterialView'

const Materials = () => {

  const [height, setHeight] = useState(window.innerHeight)
    useEffect(() => {
        const handleWindowResize = () => setHeight(window.innerHeight)
        window.addEventListener('resize', handleWindowResize)
        
        return () => window.removeEventListener('resize', handleWindowResize)
    }, [])

  return (
    <div className='flex flex-row space-x-4 w-full' style={{height: height - 82}}>
      <SideTab />
      <MaterialView />
    </div>
  )
}

export default Materials
