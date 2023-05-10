import React, { useEffect, useRef, useState } from 'react'
import CommentFeed from './CommentFeed';
import { HiOutlineCubeTransparent } from 'react-icons/hi';
import { BiCylinder } from 'react-icons/bi';
import { GiAncientScrew } from 'react-icons/gi';
import SettingsList from './SettingsList';
import { MdTimer } from 'react-icons/md';
import { secondsToHMS } from '../../../utility/HelperFunctions';

const FocusPost = ({
    post,
    user
}) => {

    // get window width
    const [width, setWidth] = useState(window.innerWidth)
    const [height, setHeight] = useState(window.innerHeight)
    const breakpoint = 1600;

    useEffect(() => {
        const handleWindowResize = () => {
            setWidth(window.innerWidth)
            setHeight(window.innerHeight)
        }
        window.addEventListener('resize', handleWindowResize)
        
        return () => window.removeEventListener('resize', handleWindowResize)
    }, [])

    const focusPostScrollRef = useRef(null);


  return (
    <div 
        className={`flex overflow-y-scroll flex-col w-full border-l-2 border-black ml-2 scrollbar-hide`}
        ref={focusPostScrollRef}
    >
        <div className={`flex flex-col w-full px-5`}>
            <div className={`flex justify-between flex-col`}>
                <div>
                    <h1 className='text-4xl font-bold'>{post.title}</h1>
                    <p>by {post.author.email}</p>
                </div>
                <div className='flex flex-col items-start space-y-2 mt-3'>
                    <div className='flex items-center space-x-1'>
                        <HiOutlineCubeTransparent className='text-xl' />
                        <p className='font-bold text-xl max-w-fit'>{post.setting?.material ? post.setting.material.title : 'Not listed'}</p>
                    </div>
                    <div className='flex items-center space-x-1'>
                        <BiCylinder className='text-xl' />
                        <p className='font-bold text-xl max-w-fit'>{post.setting?.part ? post.setting.part.name : 'Not listed'}</p>
                    </div>
                    <div className='flex items-center space-x-1'>
                        <GiAncientScrew className='text-xl' />
                        <p className='font-bold text-xl max-w-fit'>{post.setting?.tool ? post.setting.tool.name : 'Not listed'}</p>
                    </div>
                    <div className='flex items-center space-x-1'>
                        <MdTimer className='text-xl' />
                        <p className='font-bold text-xl max-w-fit'>{post.setting?.cycleTime ? secondsToHMS(post.setting?.cycleTime) : 'Not listed'}</p>
                    </div>
                </div>
            </div>
            <div className='mt-5'>
                <p className='text-lg'>{post.body}</p>
            </div>
            <SettingsList
                settings={post.setting?.settings}
                width={width}
                breakpoint={breakpoint}
            />
        </div>

        <CommentFeed
            post={post}
            user={user}
            breakpoint={breakpoint}
            width={width}
            height={height}
        />
    </div>
  )
}

export default FocusPost
