import React from 'react'

const SettingsListCard = ({
    setting
}) => {
  return (
    <div className='grid grid-cols-3 pt-2 hover:bg-gray-100'>
        <p className='col-span-1 border-b-2 text-lg'>{setting.name}</p>
        <p className='col-span-1 font-semibold border-b-2 text-lg'>{setting.value}</p>
        <p className='col-span-1 border-b-2 text-lg'>{setting.unit}</p>
    </div>
  )
}

export default SettingsListCard
