import { collection, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const ToolSelect = ({ 
    tool,
    setTool,
    toolLabel,
    noOptionsText
}) => {

    const [allTools, setAllTools] = useState([])
    const [toolNames, setToolNames] = useState([])


    useEffect(() => {
        const getTools = onSnapshot(
            collection(db, 'tool'),
            (snapshot) => {
                setAllTools(snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })))
                console.log(allTools)
            },
            (error) => {
                console.log(error)
            }
        )
        return () => {
            getTools()
        }
    }, [])

    useEffect(() => {
        if (allTools.length === 0) return;
        setToolNames(allTools.map(tool => ({label: tool.name, tool: tool})))
    }, [allTools])


  return (
    <Autocomplete
        noOptionsText={noOptionsText}
        value={toolNames.find(thisTool => thisTool.tool.id === tool?.id) || null}
        options={toolNames}
        onChange={(e, newValue) => {
            setTool(newValue?.tool);
        }}
        className='w-full pt-10'
        renderInput={(params) => (
            <TextField
                {...params}
                label={toolLabel}
            />
        )}
    />
  )
}

export default ToolSelect
