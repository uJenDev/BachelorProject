import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { RiSendPlaneFill } from 'react-icons/ri'
import { db } from '../../../firebase'
import CycleTimeSelect from '../components/CycleTimeSelect'
import MaterialSelect from '../components/MaterialSelect'
import OptionSelect from '../components/OptionSelect'
import NewPostSettingsList from '../views/NewPostSettingsList'
import CircularProgress from '@mui/material/CircularProgress';
import { FormControl, InputLabel, NativeSelect, Select } from '@mui/material'

const fetchSettingStandards = async () => {
    const defaultSettings = await getDoc(doc(db, 'standards', 'settings'))
    return defaultSettings.data().default
}

const NewPostForm = ({ 
    handleClose,
    user,
    groups,
    group
}) => {

    const [privateGroups, setPrivateGroups] = useState([])
    const [publicGroups, setPublicGroups] = useState([])
    
    useEffect(() => {
        if (groups) {
            setPrivateGroups(groups.filter(group => group.private))
            setPublicGroups(groups.filter(group => !group.private))
        }
    }, [groups])

    const [subject, setSubject] = useState('')
    const [body, setBody] = useState('')
    const [material, setMaterial] = useState(null)
    const [part, setPart] = useState(null)
    const [tool, setTool] = useState(null)
    const [cycleTime, setCycleTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [settingsList, setSettingsList] = useState([])
    const [groupToPost, setGroupToPost] = useState(group)


    useEffect(() => {
        fetchSettingStandards().then((data) => {
            setSettingsList(data)
        })
    }, [])


    const [cycleTimeInSeconds, setCycleTimeInSeconds] = useState(0);
    useEffect(() => {
        setCycleTimeInSeconds(cycleTime.hours * 3600 + cycleTime.minutes * 60 + cycleTime.seconds)
    }, [cycleTime])


    const [settingsValidated, setSettingsValidated] = useState(false)
    useEffect(() => {
        if (settingsList.length === 0) return;
        const settingsValidated = settingsList.every((setting) => {
            if (setting.type === 'number') {
                if (setting.value === 0) return false;
            } else {
                if (!setting.value) return false;
            }
            return true;
        })
        setSettingsValidated(settingsValidated)
    }, [settingsList])


    const [canPost, setCanPost] = useState(false)
    useEffect(() => {
        (!subject || !material || !part || !tool || cycleTimeInSeconds === 0 || !settingsValidated || !groupToPost) ? setCanPost(false) : setCanPost(true)
    }, [subject, material, part, tool, cycleTimeInSeconds, settingsValidated, groupToPost])


    const titleToSlug = (title) => {
        return title.toLowerCase().replace(/\s+/g, '-');
    }
      
    const [loading, setLoading] = useState(false)
    const handlePost = async () => {
        if (!canPost) return;
        setLoading(true)
        const settingsData = {
          cycleTime: cycleTimeInSeconds,
          materialRef: doc(db, 'material', material.id),
          partRef: doc(db, 'part', part.id),
          toolRef: doc(db, 'tool', tool.id),
          settings: settingsList.map((setting) => ({
            name: setting.name,
            slug: titleToSlug(setting.name),
            unit: setting.unit,
            value: setting.type === 'number' ? Number(setting.value) : setting.value,
          })),
        };
      
        const postData = {
          author: {
            displayName: user.displayName,
            email: user.email,
            uid: user.uid,
          },
          body: body,
          createdAt: serverTimestamp(),
          group: groupToPost.id,
          title: subject,
        };
      
        // Create both documents
        const settingsRef = await addDoc(collection(db, 'setting'), settingsData);
        const postRef = await addDoc(collection(db, 'posts'), postData);
      
        // Update references in both documents
        await updateDoc(settingsRef, { postRef: postRef });
        await updateDoc(postRef, { settingRef: settingsRef });
      
        // Close the form
        setLoading(false)
        handleClose();
    };

  return (
    <div className='overflow-y-scroll h-full px-4 scrollbar-hide'>
        <button className='absolute top-0 left-2 text-2xl' onClick={handleClose}>&times;</button>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel htmlFor="grouped-native-select">Group</InputLabel>
            <NativeSelect 
                native 
                value={groupToPost?.id}
                onChange={(e) => setGroupToPost(groups.find(group => group.id === e.target.value))}
                id="grouped-native-select" 
                label="Grouping"
            >
            {!groupToPost && <option aria-label="None" value="" />}
            <optgroup label="Public">
                {publicGroups.map((group) => (
                    <option value={group.id}>
                        {group.name}
                    </option>
                ))}
            </optgroup>
            <optgroup label="Private">
                {privateGroups.map((group) => (
                    <option value={group.id}>
                        {group.name}
                    </option>
                ))}
            </optgroup>
            </NativeSelect>
        </FormControl>
        <input
            type='text'
            placeholder='Subject'
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className='w-full p-2 rounded-lg outline-none border-none focus:border-blue-500 placeholder:font-bold font-bold text-2xl placeholder:text-2xl'
        />
        <textarea
            type='text'
            placeholder='Describe your process..'
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className='w-full p-2 rounded-lg resize-none outline-none border-none h-40 focus:border-blue-500  text-md placeholder:text-md'
        />
        <p className='flex w-full h-[1px] border-b-2 border-black text-xl font-semibold' >
            Specify your process..
        </p>
        <div className='flex flex-row space-x-5'>
            <MaterialSelect 
                material={material}
                setMaterial={setMaterial}
            />
            <OptionSelect
                setOption={setPart}
                option='part'
                optionLabel='Part'
            />
            <OptionSelect
                setOption={setTool}
                option='tool'   
                optionLabel='Tool'
            />
            <CycleTimeSelect
                cycleTime={cycleTime}
                setCycleTime={setCycleTime}
            />
        </div>
        <h1 className='flex w-full text-xl font-semibold mt-10' >Settings used</h1>
        <NewPostSettingsList
            user={user}
            group={group}
            settingsList={settingsList}
            setSettingsList={setSettingsList}
        />

        <footer
            className='absolute bottom-4 right-4 flex flex-row justify-end space-x-5 mt-2'
        >
            <button
                onClick={handlePost}
                disabled={!canPost}
                className={`
                    flex flex-row items-center justify-center space-x-1 bg-blue-200 text-blue-500 pr-4 pl-2 py-1 rounded-lg duration-300 ease-out w-24 h-10
                    ${!canPost ? 'opacity-40' : 'hover:bg-blue-500 hover:text-white hover:scale-105'}
                `}
            >
                {loading ?
                    <CircularProgress size={25} className='' />
                    :
                    <>
                        <RiSendPlaneFill className='text-xl' />
                        <h1 className='text-2xl font-semibold'>Post</h1>
                    </>
                }
            </button>
            
        </footer>   
    </div>
  )
}

export default NewPostForm
