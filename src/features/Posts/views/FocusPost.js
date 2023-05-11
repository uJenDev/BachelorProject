import React, { useEffect, useRef, useState } from 'react'
import CommentFeed from './CommentFeed';
import { HiOutlineCubeTransparent } from 'react-icons/hi';
import { BiCylinder } from 'react-icons/bi';
import { GiAncientScrew } from 'react-icons/gi';
import SettingsList from './SettingsList';
import { MdTimer } from 'react-icons/md';
import { secondsToHMS } from '../../../utility/HelperFunctions';
import { Link } from 'react-router-dom';
import { StlViewer } from "react-stl-viewer";

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
        className={`flex overflow-y-scroll flex-col w-full border-l-2 border-black scrollbar-hide`}
        ref={focusPostScrollRef}
    >
        <div className={`flex flex-col w-full px-5`}>
            <div className='flex items-center justify-between'>
                <div className={`flex justify-between flex-col`}>
                    <div>
                        <h1 className='text-4xl font-bold'>{post.title}</h1>
                        <p>by {post.author.email}</p>
                    </div>
                    <div className='flex flex-col items-start space-y-2 mt-3'>
                        <Link 
                            to={`/materials/${post.setting?.material?.categoryRef.id}/${post.setting?.materialRef.id}`}
                            className='flex items-center space-x-1'
                        >
                            <HiOutlineCubeTransparent className='text-xl' />
                            <p className='font-bold text-xl max-w-fit'>{post.setting?.material ? post.setting.material.title : 'Not listed'}</p>
                        </Link>
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
                <StlViewer
                    style={{
                        top: 0,
                        left: 0,
                        width: '400px',
                        height: '200px',
                    }}
                    className='bg-blue-500 rounded-xl shadow-lg'
                    orbitControls
                    shadows
                    url={"https://storage.googleapis.com/ucloud-v3/ccab50f18fb14c91ccca300a.stl"}
                />
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
