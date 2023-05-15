import React from 'react'
import { MdWarning } from 'react-icons/md'
import { useLocation, useNavigate } from 'react-router-dom'

const SettingsListCard = ({
    setting,
}) => {

    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search);
    const selectedSetting = queryParams.get('setting');

  return (
    <button 
        onClick={() => {
            queryParams.set('setting', setting.id)
            navigate({search: queryParams.toString()})
        }}
        className={`
            px-2 py-1 rounded-lg bg-orange-200 duration-300 ease-out text-start
            ${selectedSetting === setting.id && 'translate-x-5'}
        `}
    >
        <div className='text-orange-700'>
            {setting.settings.map((setting) => (
                <div className='grid grid-cols-2 gap-4 border-b border-orange-300'>
                    <p className='font-semibold'>{setting.name}</p>
                    <p className='font-semibold'>{setting.value} {setting.unit}</p>
                </div>
            ))}
        </div>
        {/* {setting.post && (
            <div className='flex items-center space-x-1'>
                <p className='text-xs'>by</p>
                <p className='text-xs'>{setting.post?.author.email}</p>
            </div>
        )} */}
        {!setting.post && (
            <div className='flex items-center space-x-2 text-red-500 mt-2'>
                <MdWarning className=''/>
                <p className='text-xs'>POST DELETED</p>
            </div>
        )}
    </button>
  )
}

export default SettingsListCard
