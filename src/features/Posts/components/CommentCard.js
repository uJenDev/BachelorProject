import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { stringAvatar } from '../../../utility/MaterialUIFunctions';

const CommentCard = ({
    comment,
    postAuthor,
    user,
    isSameAuthor
}) => {

    const time = new Date(comment.createdAt?.seconds * 1000).toLocaleString('no-NO', {
        hour: 'numeric',
        minute: 'numeric'
    })
    
    const timeSince = () => {
        const commentDate = new Date(comment.createdAt?.seconds * 1000);
        const now = new Date();
        const seconds = Math.floor((now - commentDate) / 1000);
        const days = Math.floor(seconds / 86400);
      
        if (days < 1) {
          return "today";
        } else if (days === 1) {
          return "yesterday";
        } else if (days > 1 && days < 30) {
          return `${days} days`;
        } else {
          return commentDate.toLocaleDateString('no-NO', {
            day: 'numeric',
            month: 'long',
          });
        }
      }

    
    const [isAuthor, setIsAuthor] = useState(false)

    useEffect(() => {
        if (user && comment.author.uid === user.uid) {
            setIsAuthor(true)
        }
    }, [user, comment])


  return (
    <div 
        className={`flex flex-col space-x-2${isSameAuthor ? '' : 'mt-5'}`}
    >
        <div className={`flex flex-col w-full `}>
            {!isSameAuthor && (
                <div className='flex items-center space-x-1 cursor-default mb-1 mt-5'>
                    <Avatar 
                      {...stringAvatar(comment.author?.displayName)} 
                    />
                    {/* <div className='flex flex-row space-x-1 items-center'>
                        {comment.author.uid === postAuthor.uid ? (<MdPerson />) : null}
                        <div className='font-semibold text-sm'>{isAuthor ? 'You' : comment.author.email}</div>
                    </div>
                    <p className='text-xs'>•</p> */}
                    {comment?.createdAt && <p className='text-xs'>{timeSince()}</p>}
                    <p className='text-xs'>•</p>
                    {(comment?.createdAt) && (<p className='text-xs'>{time}</p>)}
                </div>
            )}
            <div className='ml-4 border-l-2 border-gray-200' >
              <div
                  className={`${isAuthor ? 'text-blue-500' : ''} px-2 py-1 rounded-xl max-w-fit text-black `}
                  dangerouslySetInnerHTML={{ __html: comment.body }}
              />
            </div>
        </div>
    </div>
  )
}

export default CommentCard
