import React from 'react'
import SettingsListCard from '../components/SettingsListCard'

const SettingsList = ({
    settings
}) => {
  return (
    <div className='flex h-full mt-5 ml-2'>
        <div className='flex flex-col space-y-3'>
            {settings?.map(setting => (
                <SettingsListCard
                    key={setting.id}
                    setting={setting}
                />
            ))}
        </div>
    </div>
  )
}

export default SettingsList
