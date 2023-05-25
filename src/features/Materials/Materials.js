import React, { useEffect, useState } from 'react'
import MaterialView from './views/MaterialView'
import SideTab from './views/SideTab'

const Coolants = () => {

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
    <div className='w-full flex justify-center items-center' style={{height: height - 102}}>
      <div className='h-full flex '>
        <SideTab 
          width={width}
          height={height}
        />
        <MaterialView 
          width={width > 950 ? 'w-[600px]' : 'w-[400px]'}
        />
      </div>
    </div>
  )
}

export default Coolants
