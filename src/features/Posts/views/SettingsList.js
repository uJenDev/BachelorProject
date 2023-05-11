import React, { useEffect } from 'react'
import SettingsListCard from '../components/SettingsListCard'
import { MdSettingsInputComponent } from 'react-icons/md'

const SettingsList = ({
    settings
}) => {
  return (
    <div className='w-full mt-20'>
        <div className='mb-2 flex items-center justify-center'>
            <MdSettingsInputComponent className='mr-2 text-2xl' />
            <h1 className='text-2xl font-semibold'>CNC Settings</h1>
        </div>
        <div className='grid grid-cols-3 border-b-2 border-black mb-2 pb-1'>
            <p className='col-span-1 text-xl font-bold'>Name</p>
            <p className='col-span-1 text-xl font-bold'>Value</p>
            <p className='col-span-1 text-xl font-bold'>Unit</p>
        </div>
        <div>
            {settings?.map(setting => (
                <SettingsListCard
                    key={setting.slug}
                    setting={setting}
                />
            ))}
        </div>
    </div>
  )
}

export default SettingsList
