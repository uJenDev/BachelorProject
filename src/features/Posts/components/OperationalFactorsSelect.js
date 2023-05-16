import { TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CoolantSelect from '../forms/CoolantSelect'
import ToolSelect from '../forms/ToolSelect'
import CycleTimeSelect from './CycleTimeSelect'

const OperationalFactorsSelect = ({
    operationalFactors,
    setOperationalFactors,
    tool,
    setTool,
    partQuantity,
}) => {

    const [defectAmount, setDefectAmount] = useState(0)
    useEffect(() => {
        setOperationalFactors({ ...operationalFactors, defectRate: defectAmount / partQuantity })
    }, [defectAmount, operationalFactors, partQuantity, setOperationalFactors])


  return (
    <div className='flex flex-col'>
        <p className='text-md font-semibold pt-5 pb-2'>Coolant</p>
        <div className='flex max-w-2xl space-x-2'>
            <CoolantSelect
                coolant={operationalFactors.coolant}
                setCoolant={(coolant) => setOperationalFactors({ ...operationalFactors, coolant })}
            />
            <TextField
                type="number"
                onFocus={(e) => e.target.select()}
                InputProps={{ inputProps: { min: 0 } }}
                label={`Coolant Usage (L / min)`}
                className="w-full"
                value={operationalFactors.coolantUsage}
                onChange={(e) => setOperationalFactors({ ...operationalFactors, coolantUsage: e.target.value })}
            />
        </div>
        <p className='text-md font-semibold pt-5 pb-2'>Tool</p>
        <div className='flex max-w-2xl space-x-2'>
            <ToolSelect
                setTool={setTool}
                tool={tool}
            />
            <TextField
                type="number"
                onFocus={(e) => e.target.select()}
                InputProps={{ inputProps: { min: 0 } }}
                label="Tool Life (how many parts one tool can make)"
                className="w-full"
                value={operationalFactors.toolLife}
                onChange={(e) => setOperationalFactors({ ...operationalFactors, toolLife: e.target.value })}
            />
        </div>
        <div className='flex max-w-2xl space-x-2'>
            <div className='w-full'>
                <p className='text-md font-semibold pt-5 pb-2'>Defect Rate</p>
                <TextField
                    type="number"
                    onFocus={(e) => e.target.select()}
                    InputProps={{ inputProps: { min: 0, max: partQuantity } }}
                    label="Amount of Defects"
                    className="w-full"
                    value={defectAmount}
                    onChange={(e) => setDefectAmount(e.target.value)}
                />
            </div>
            <div className='w-full'>
                <p className='text-md font-semibold pt-5 pb-2'>Cycle Time</p>
                <CycleTimeSelect
                    cycleTime={operationalFactors.cycleTime}
                    setCycleTime={(cycleTime) => setOperationalFactors({ ...operationalFactors, cycleTime })}
                />
            </div>
        </div>
    </div>
  )
}

export default OperationalFactorsSelect
