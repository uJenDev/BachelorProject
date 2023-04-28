import React, { useState } from 'react'
import MaterialCategoryView from './MaterialCategoryView'
import MaterialView from './MaterialView'

const MaterialKnown = () => {
    const [selectedMaterial, setSelectedMaterial] = useState(null)

  return (
    <div className='flex flex-row pt-2'>
        {/* <button onClick={() => setSelectedMaterial(null)}>CLICK</button> */}
        <MaterialCategoryView 
            selectedMaterial={selectedMaterial}
            setSelectedMaterial={setSelectedMaterial}
        />
        <div className={`${selectedMaterial ? '' : ''}`}>
            {selectedMaterial && <MaterialView material={selectedMaterial} />}
        </div>
    </div>
  )
}

export default MaterialKnown
