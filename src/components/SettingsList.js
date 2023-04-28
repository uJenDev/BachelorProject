import React from 'react'

const SettingsList = ({
    settings,
    selectedData,
    setSelectedData
}) => {

  return (
    <div className='pt-5'>
        <p className='text-2xl border-b-2 border-gray-400 text-gray-400 px-10'>Settings</p>
        <div className='space-y-2 pt-1 px-10'>
            {settings ? settings.map((setting, index) => (
                <button 
                    key={setting.name}
                    onClick={() => setSelectedData(setting)}
                    className={`flex flex-row space-x-2 bg-gray-200 max-w-fit px-2 py-1 rounded-lg items-center ease-out duration-150 ${selectedData?.name === setting.name ? 'translate-x-2 bg-gray-500' : 'hover:bg-gray-100'}`}
                >
                    <p className={`text-xl font-bold ease-out duration-150 ${selectedData?.name === setting.name ? 'text-white' : 'text-gray-500'}`}>{setting.name}</p>
                    <p className='font-bold text-gray-300'>|</p>
                    <p className={`text-lg ease-in duration-100 ${selectedData?.name === setting.name ? 'text-white' : 'text-gray-500'}`}>{setting.value}</p>
                    {setting?.unit && (
                        <>
                            <p className='font-bold text-gray-300'>|</p>
                            <p className={`text-sm font-bold ${selectedData?.name === setting.name ? 'text-white' : 'text-gray-500'}`}>{setting.unit}</p>
                        </>
                    )}
                </button>

            ))
            :
            <div className='flex flex-row space-x-2 items-center'>
                <p className='text-xl font-bold text-gray-500'>No settings found</p>
            </div>
            }
        </div>
      </div>
  )
}

export default SettingsList
