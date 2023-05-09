import React, { useState } from 'react'
import { RiSendPlaneFill } from 'react-icons/ri'
import MaterialSelect from '../components/MaterialSelect'
import OptionSelect from '../components/OptionSelect'

const NewPostForm = ({ 
    handleClose,
    user,
    group
}) => {

    const handlePost = () => {
        console.log('Post')
    }

    const [subject, setSubject] = useState('')
    const [body, setBody] = useState('')
    const [material, setMaterial] = useState(null)
    const [part, setPart] = useState(null)
    const [tool, setTool] = useState(null)

  return (
    <div className=''>
        <button className='absolute top-0 left-2 text-2xl' onClick={handleClose}>&times;</button>
        <input
            type='text'
            placeholder='Subject'
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className='w-full p-2 rounded-lg outline-none border-none focus:border-blue-500 placeholder:font-bold font-bold text-xl placeholder:text-xl'
        />
        <textarea
            type='text'
            placeholder='Describe your process..'
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className='w-full p-2 rounded-lg resize-none outline-none border-none h-40 focus:border-blue-500  text-md placeholder:text-md'
        />
        <p className='flex w-full h-[1px] border-b-2 border-black text-xl font-semibold' >
            What are you working on?
        </p>
        <div className='flex flex-row space-x-5'>
            <MaterialSelect 
                material={material}
                setMaterial={setMaterial}
            />
            <OptionSelect
                setOption={setPart}
                option='parts'
                optionLabel='Part'
            />
            <OptionSelect
                setOption={setTool}
                option='tool'
                optionLabel='Tool'
            />
        </div>

        

        <footer
            className='absolute bottom-4 right-4 flex flex-row justify-end space-x-5 mt-2'
        >
            <button
                onClick={handlePost}
                disabled={!subject}
                className={`
                    flex flex-row items-center space-x-1 bg-blue-200 text-blue-500 pr-4 pl-2 py-1 rounded-lg duration-300 ease-out 
                    ${!subject ? 'opacity-40' : 'hover:bg-blue-500 hover:text-white hover:scale-105'}
                `}
            >
                <RiSendPlaneFill className='text-xl' />
                <h1 className='text-2xl font-semibold'>Post</h1>
            </button>
            
        </footer>   
    </div>
  )
}

export default NewPostForm
