import React from 'react'
import { BiCylinder } from 'react-icons/bi'
import { GiAncientScrew } from 'react-icons/gi'
import { HiOutlineCubeTransparent } from 'react-icons/hi'
import { MdTimer } from 'react-icons/md'
import { secondsToHMS } from '../../../utility/HelperFunctions'
import { BsArrowReturnRight } from 'react-icons/bs'
import { useNavigate, useParams } from 'react-router-dom'

const PostCard = ({ 
    post,
}) => {
    
    const timeSince = () => {
        const postDate = new Date(post.createdAt?.seconds * 1000);
        const now = new Date();
        const seconds = Math.floor((now - postDate) / 1000);
        const days = Math.floor(seconds / 86400);
      
        if (days < 1) {
          return "today";
        } else if (days === 1) {
          return "yesterday";
        } else if (days > 1 && days < 30) {
          return `${days} days`;
        } else {
          return postDate.toLocaleDateString('no-NO', {
            day: 'numeric',
            month: 'long',
          });
        }
      }

      const postId = useParams().post;
      const projectId = useParams().project;
      const navigate = useNavigate();

        const handlePostClick = () => {
            navigate(`/posts/${projectId}/${post.id}`)
        }

        const selectedPost = postId;

  return (
    <div className={`${selectedPost === post?.id ? 'pb-10' : null}`}>
        <div 
            onClick={handlePostClick}
            className={`
                py-2 px-3 rounded-xl shadow-md duration-300 ease-out cursor-pointer
                ${selectedPost === post.id ? 'bg-black' : 'bg-gray-700 '}
            `}
        >
            <div className='flex flex-col pb-2 space-y-1 '>
                <div
                    className='flex flex-col text-white duration-200 ease-out text-left'
                >
                    <h1 className='font-semibold text-2xl text-white border-b-2 border-white mb-1'>{post.title}</h1>
                    <div className='flex items-center space-x-1'>
                        <p className='text-xs text-gray-400'>by {post.author.email}</p>
                        <p className='text-xs text-gray-400'>•</p>
                        <p className='text-xs text-gray-400'>{timeSince()}</p>
                    </div>
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
        {selectedPost === post.id && (<BsArrowReturnRight className='text-2xl text-black flex justify-end w-full' />)}
    </div>
  )
}

export default PostCard
