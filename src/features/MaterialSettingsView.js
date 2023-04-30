import { collection, doc, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { MdAddCircle } from 'react-icons/md';
import { db } from '../firebase';
import NewSettingForm from '../forms/NewSettingForm';

function groupBySlug(arr) {
    const groupedMaps = {};
  
    arr.forEach(map => {
      const slug = map.slug;
  
      if (!groupedMaps[slug]) {
        groupedMaps[slug] = {
            id: map.id,
            name: map.name,
            slug: slug,
            min: Number(map.value),
            max: Number(map.value),
            unit: map.unit,
            data: []
        };
      }
  
      groupedMaps[slug].data.push(map);
      groupedMaps[slug].min = Math.min(groupedMaps[slug].min, Number(map.value));
      groupedMaps[slug].max = Math.max(groupedMaps[slug].max, Number(map.value));
    });
  
    return Object.values(groupedMaps);
}

const MaterialSettingsView = ({
    material,
    selectedTool,
}) => {

    const [loading, setLoading] = useState(false)
    const [settings, setSettings] = useState([]);

    useEffect(() => {

        const getSettings = onSnapshot(
            query( 
                collection(db, 'setting'), 
                where('materialRef', '==', doc(db, 'material', material.id))
            ), 
            (snapshot) => {
                setSettings(snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })))
            setLoading(false)
            console.log(settings)
        },
        (error) => {
            console.log(error)
            setLoading(false)
        })

        return () => {
            getSettings()
        }
    }, [material])

    const [groupedSettings, setGroupedSettings] = useState([])
    const [toggleSettingForm, setToggleSettingForm] = useState(false)

    useEffect(() => {

        const groupedSettings = groupBySlug(settings)

        if (selectedTool) {
            const toolSettings = groupedSettings.map(setting => {
                const toolSetting = setting.data.find((material) => material.toolRef.id === selectedTool?.id)
                return {
                    ...setting,
                    value: toolSetting?.value,
                }
            })
            setGroupedSettings(toolSettings)
            return
        }
        setGroupedSettings(groupedSettings)

    }, [settings, selectedTool])


    if (!settings[0]) return (
        <div className='bg-gray-700 px-2 py-2 rounded-xl mt-2 w-full h-fit'>
            <p className='text-2xl font-bold text-white'>No recommended settings</p>
        </div>
    );

  return (
    <div className='bg-gray-700 px-2 py-2 rounded-xl mt-2 w-full h-fit'>
      <p className='text-2xl font-bold text-white'>{selectedTool ? <span><span className='bg-yellow-500 rounded-lg px-2 py-1 text-yellow-800'>{selectedTool.name}</span>  Settings</span> : 'General Settings'}</p>
      {groupedSettings.map(setting => {
        if (selectedTool && !setting.value) {
            return (
                <div key={setting.id} className='flex flex-col duration-300 ease-in-out'>
                    <div  className='bg-red-200 px-2 py-1 mt-2 rounded-lg max-w-fit flex flex-row items-center space-x-2'>
                        <p className='text-xl font-bold text-red-700'>{setting.name}</p>
                        <p className='text-red-300 font-bold'>|</p>
                        <p className='text-lg font-bold text-red-700'>No specified setting</p>
                    </div>
                </div>
            )
        }
        return (
            <div key={setting.id} className={`flex flex-col duration-300 transfrom ease-in-out ${selectedTool ? ' translate-x-2' : ''}`}>
                <div  className={`px-2 py-1 mt-2 rounded-lg max-w-fit flex flex-row items-center space-x-2 ${selectedTool ? 'bg-green-200' : 'bg-orange-200'}`}>
                    <p className={`text-xl font-bold ${selectedTool ? 'text-green-600' : 'text-orange-700'}`}>{setting.name}</p>
                    <p className={`font-bold ${selectedTool ? 'text-green-300' : 'text-orange-300'}`}>|</p>
                    <p className={`text-lg font-bold ${selectedTool ? 'text-green-600' : 'text-orange-700'}`}>
                        {setting.value ? setting.value : (setting.min === setting.max) ? setting.min : `${setting.min} - ${setting.max}`}
                    </p>
                    {setting.unit && (
                        <>
                            <p className={`font-bold ${selectedTool ? 'text-green-300' : 'text-orange-300'}`}>|</p>
                            <p className={`font-bold ${selectedTool ? 'text-green-600' : 'text-orange-700'}`}>{setting.unit}</p>
                        </>
                    )}
                </div>
            </div>
      )})}
        {selectedTool && (
            toggleSettingForm 
            ? (
                <div className='mt-2'>
                    <NewSettingForm 
                        setToggleCreateForm={setToggleSettingForm}
                        material={material}
                        tool={selectedTool}
                    />
                </div>
            )
            : (
                <button 
                    onClick={() => {setToggleSettingForm(true)}}
                    className={`mt-2 flex flex-row space-x-2 bg-blue-200 max-w-fit px-2 py-1 rounded-lg items-center text-blue-500 ease-out duration-150 hover:scale-105 hover:text-white hover:bg-blue-500`}
                >
                    <p className={`text-xl font-bold ease-out duration-150`}>Add new</p>
                    <p className='font-bold text-blue-300'>|</p>
                    <MdAddCircle className='text-xl' />
                </button>
            )
        )}
    </div>
  )
}

export default MaterialSettingsView
