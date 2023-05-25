import React, { useEffect } from 'react'
import { BiGitCompare } from 'react-icons/bi'
import { BsArrowReturnRight } from 'react-icons/bs'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import PostSettingDetailsList from './PostSettingDetailsList'
import { Avatar } from '@mui/material'
import { stringAvatar } from '../../../utility/MaterialUIFunctions'

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
        const location = useLocation();
        const queryParams = new URLSearchParams(location.search);

        const handlePostClick = (e) => {
            if (e.shiftKey) {
                e.preventDefault();
                queryParams.set('compareTo', post.id);
                navigate(`${location.pathname}?${queryParams.toString()}`)
            } else {
              queryParams.delete('compareTo');
              navigate(`/posts/${projectId}/${post.id}?${queryParams.toString()}`)
            }
            
        }

        const selectedPost = postId;
        const comparedPost = queryParams.get('compareTo');

  return (
    <div className={`
      ${selectedPost === post?.id ? 'pb-10' : null}
      ${comparedPost === post?.id ? '' : null}
      `}
    >
        <div 
            onClick={handlePostClick}
            className={`
                py-2 px-3 rounded-xl shadow-md duration-300 ease-out cursor-pointer
                ${selectedPost === post.id ? 'bg-blue-600' : 'bg-black opacity-90 hover:opacity-100'}
                ${comparedPost === post.id ? ' ' : null}
            `}
        >
            <div className='flex flex-col pb-2 space-y-1 '>
                <div
                    className='flex flex-col text-white duration-200 ease-out text-left'
                >
                    <div className='flex items-center space-x-1 mt-2 mb-2'>
                      <Avatar
                        className='mr-1'
                        {...stringAvatar(post.createdBy.displayName)} 
                      />
                      <div className='flex flex-col'>
                        <p className='text-sm font-semibold'>{post.createdBy.displayName}</p>
                        <div className='flex items-center space-x-1'>
                          <p className='text-xs text-gray-400'>{post.createdBy.email}</p>
                          <p className='text-xs text-gray-400'>•</p>
                          <p className='text-xs text-gray-400'>{timeSince()}</p>
                        </div>
                      </div>
                    </div>
                    <div className='flex items-center space-x-1 justify-between'>
                      <p className='text-sm font-semibold'>{post.title}</p>
                      {postId && (postId !== post.id) && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            queryParams.set('compareTo', post.id);
                            navigate(`${location.pathname}?${queryParams.toString()}`)
                          }}
                          className={`
                            text-xs text-white hover:text-white rounded-md duration-200 ease-out
                            ${comparedPost === post.id ? 'bg-purple-500 text-white' : 'hover:bg-blue-500'}
                          `}
                        >
                          <BiGitCompare className='inline-block text-xl m-2' />
                        </button>
                      )}
                    </div>
                </div>
                <PostSettingDetailsList
                    post={post}
                    textColor='text-white'
                />
            </div>
        </div>
        {selectedPost === post.id && (<BsArrowReturnRight className='text-2xl text-blue-600 flex justify-end w-full' />)}
    </div>
  )
}

export default PostCard
