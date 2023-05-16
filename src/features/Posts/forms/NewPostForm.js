import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { RiSendPlaneFill } from 'react-icons/ri'
import { db } from '../../../firebase'
import MaterialSelect from './MaterialSelect'
import PartSelect from './PartSelect'
import NewPostSettingsList from '../views/NewPostSettingsList'
import CircularProgress from '@mui/material/CircularProgress';
import { Autocomplete, Box, Button, TextField } from '@mui/material'
import OperationalFactorsSelect from '../components/OperationalFactorsSelect'
import { green } from '@mui/material/colors'

const fetchSettingStandards = async () => {
    const defaultSettings = await getDoc(doc(db, 'standards', 'settings'))
    return defaultSettings.data().default
}

const NewPostForm = ({ 
    handleClose,
    user,
    projects,
    project
}) => {

    const [subject, setSubject] = useState('')
    const [body, setBody] = useState('')
    const [material, setMaterial] = useState(null)
    const [part, setPart] = useState(null)
    const [tool, setTool] = useState(null)
    const [settingsList, setSettingsList] = useState([])
    const [projectToPost, setProjectToPost] = useState(project || null)
    const [partQuantity, setPartQuantity] = useState(1)

    const [operationalFactors, setOperationalFactors] = useState({
        cycleTime: { hours: 0, minutes: 0, seconds: 0 },
        defectRate: 0,
        coolantUsage: 0,
        coolant: null,
        toolLife: 0,
    })


    const [defaultSettingsListLength, setDefaultSettingsListLength] = useState(0)
    useEffect(() => {
        fetchSettingStandards().then((data) => {
            setSettingsList(data)
            setDefaultSettingsListLength(data.length)
        })
    }, [])


    const [cycleTimeInSeconds, setCycleTimeInSeconds] = useState(0);
    useEffect(() => {
        setCycleTimeInSeconds(operationalFactors.cycleTime.hours * 3600 + operationalFactors.cycleTime.minutes * 60 + operationalFactors.cycleTime.seconds)
    }, [operationalFactors.cycleTime])


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
        (
            !subject || 
            !material || 
            !part || 
            !tool || 
            !settingsValidated || 
            !projectToPost || 
            !partQuantity ||
            !operationalFactors.defectRate ||
            !operationalFactors.coolantUsage ||
            !operationalFactors.coolant ||
            !operationalFactors.toolLife ||
            cycleTimeInSeconds === 0
        
        ) ? setCanPost(false) : setCanPost(true)
    }, [subject, material, part, tool, cycleTimeInSeconds, settingsValidated, projectToPost, partQuantity, operationalFactors])


    const titleToSlug = (title) => {
        return title.toLowerCase().replace(/\s+/g, '-');
    }
      
    const [success, setSuccess] = useState(false)
    const buttonSx = {
        ...(success && {
          bgcolor: green[500],
          '&:hover': {
            bgcolor: green[700],
          },
        }),
      };

    const [loading, setLoading] = useState(false)
    const handlePost = async () => {
        if (!canPost) return;
        setLoading(true)
        const settingsData = {
            materialRef: doc(db, 'material', material.id),
            partRef: doc(db, 'part', part.id),
            toolRef: doc(db, 'tool', tool.id),
            quantity: partQuantity,
            settings: settingsList.map((setting) => ({
                name: setting.name,
                slug: titleToSlug(setting.name),
                unit: setting.unit,
                value: setting.type === 'number' ? Number(setting.value) : setting.value,
            })),
            operationalFactors: {
                ...operationalFactors,
                cycleTime: cycleTimeInSeconds,
                coolant: doc(db, 'coolant', operationalFactors.coolant.id),
            }
        };
      
        const postData = {
            createdBy: doc(db, 'users', user.uid),
            body: body,
            createdAt: serverTimestamp(),
            project: projectToPost.id,
            title: subject,
        };
      
        // Create both documents
        const settingsRef = await addDoc(collection(db, 'setting'), settingsData);
        const postRef = await addDoc(collection(db, 'posts'), postData);
      
        // Update references in both documents
        await updateDoc(settingsRef, { postRef: postRef });
        await updateDoc(postRef, { settingRef: settingsRef });
      
        // set a timer for one seccond to show the success message
        setSuccess(true)
        setLoading(false)
        setTimeout(() => {
            handleClose();
        }, 1000)
    };

  return (
    <div className='overflow-y-scroll h-full px-4 scrollbar-hide'>
        <button className='absolute top-0 left-2 text-2xl' onClick={handleClose}>&times;</button>
            <Autocomplete
                options={projects}
                defaultValue={project}
                groupBy={(option) => option.private ? 'Private' : 'Public'}
                getOptionLabel={(option) => option.name}
                sx={{ width: 300 }}
                onChange={(e, value) => setProjectToPost(value)}
                renderInput={(params) => <TextField {...params} label="What project?" variant='standard' />}
                renderGroup={(params) => (
                    <div key={params.key}>
                        <p className='px-2 font-semibold border-b-2 border-gray-200'>{params.group}</p>
                        <p>{params.children}</p>
                    </div>
                )}
            />
        <input
            type='text'
            placeholder='Subject'
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className='w-full p-2 rounded-lg outline-none border-none focus:border-blue-500 placeholder:font-bold font-bold text-2xl placeholder:text-2xl'
        />
        <textarea
            type='text'
            placeholder='Describe your process.. (optional)'
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className='w-full p-2 rounded-lg resize-none outline-none border-none h-40 focus:border-blue-500  text-md placeholder:text-md'
        />
        <p className='flex w-full h-[1px] border-b-2 border-black text-xl font-semibold' >
            Part Specifications
        </p>
        <div className='flex space-x-2 max-w-2xl pt-10'>
            <MaterialSelect 
                material={material}
                setMaterial={setMaterial}
            />
            <PartSelect
                setPart={setPart}
                part={part}
                project={projectToPost}
            />
            <TextField
                type="number"
                onFocus={(e) => e.target.select()}
                InputProps={{ inputProps: { min: 1 } }}
                label="Part Quantity"
                className="w-1/2"
                value={partQuantity}
                onChange={(e) => setPartQuantity(e.target.value)}
            />
        </div>
        <h1 className='flex w-full text-xl font-semibold mt-10'>Operational Factors</h1>
        <OperationalFactorsSelect
            operationalFactors={operationalFactors}
            setOperationalFactors={setOperationalFactors}
            tool={tool}
            setTool={setTool}
            partQuantity={partQuantity}
        />
        <h1 className='flex w-full text-xl font-semibold mt-10'>Settings used</h1>
        <NewPostSettingsList
            settingsList={settingsList}
            setSettingsList={setSettingsList}
            defaultSettingsListLength={defaultSettingsListLength}
        />
        <footer
            className='absolute bottom-4 right-4 flex flex-row justify-end space-x-5 mt-2'
        >
            <Box sx={{ m: 1, position: 'relative' }}>
                <Button
                    variant="contained"
                    disabled={!canPost}
                    onClick={handlePost}
                    sx={[
                        buttonSx,
                    ]}
                    size='large'
                >
                Post
                </Button>
                {loading && (
                <CircularProgress
                    size={24}
                    sx={{
                        color: green[500],
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: '-12px',
                        marginLeft: '-12px',
                    }}
                />
                )}
            </Box>
        </footer>   
    </div>
  )}
export default NewPostForm