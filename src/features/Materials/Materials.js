import React, { useEffect, useState } from 'react'
import SideTab from './views/SideTab'
import MaterialView from './views/MaterialView'

const Materials = () => {

  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)
    useEffect(() => {
        const handleWindowResize = () => {
          setWidth(window.innerWidth)
          setHeight(window.innerHeight)
        }
        window.addEventListener('resize', handleWindowResize)
        
        return () => window.removeEventListener('resize', handleWindowResize)
    }, [])

  return (
    <div className='flex flex-row space-x-4 w-full' style={{height: height - 82}}>
      <SideTab 
        height={height}
        width={width}
      />
      <MaterialView />
    </div>
  )
}

export default Materials
