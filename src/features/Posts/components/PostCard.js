import React from 'react'
import { BiCylinder } from 'react-icons/bi'
import { GiAncientScrew } from 'react-icons/gi'
import { HiOutlineCubeTransparent } from 'react-icons/hi'
import { MdTimer } from 'react-icons/md'
import { secondsToHMS } from '../../../utility/HelperFunctions'

const PostCard = ({ 
    post,
    selectedPost,
    setSelectedPost,
    groupIsSelected
}) => {
  return (
    <div 
        onClick={() => setSelectedPost(post)}
        className={`
            py-2 px-3 rounded-xl shadow-md duration-300 ease-out cursor-pointer
            ${selectedPost?.id === post.id ? 'translate-x-2 bg-gray-600' : 'bg-gray-700 '}
        `}
    >
        <div className='flex flex-col pb-2 space-y-1 '>
            <div
                className='flex flex-col text-white duration-200 ease-out text-left'
            >
                {groupIsSelected && (
                    <p className='text-xs text-gray-400'>{post.group.name}</p>
                )}
                <h1 className='font-semibold text-lg text-blue-300'>{post.title}</h1>
                <p className='text-xs text-gray-400'>by {post.author.email}</p>
            </div>
            <div className='flex flex-col items-start space-y-2 mt-3 text-white text-sm'>
                <div className='flex items-center space-x-1'>
                    <HiOutlineCubeTransparent className='' />
                    <p className='font-bold  max-w-fit'>{post.setting?.material ? post.setting.material.title : 'Not listed'}</p>
                </div>
                <div className='flex items-center space-x-1'>
                    <BiCylinder className='' />
                    <p className='font-bold  max-w-fit'>{post.setting?.part ? post.setting.part.name : 'Not listed'}</p>
                </div>
                <div className='flex items-center space-x-1'>
                    <GiAncientScrew className='' />
                    <p className='font-bold  max-w-fit'>{post.setting?.tool ? post.setting.tool.name : 'Not listed'}</p>
                </div>
                <div className='flex items-center space-x-1'>
                    <MdTimer className='' />
                    <p className='font-bold max-w-fit'>{post.setting?.cycleTime ? secondsToHMS(post.setting?.cycleTime) : 'Not listed'}</p>
                </div>
            </div>
        </div>
        <p className='text-white'>{post.body}</p>
    </div>
  )
}

export default PostCard
