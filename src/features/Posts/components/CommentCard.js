import React, { useEffect, useState } from 'react'
import { MdPerson } from 'react-icons/md'

const CommentCard = ({
    comment,
    postAuthor,
    user
}) => {

    // convert comment.createdAt to time and date
    const date = new Date(comment.createdAt?.seconds * 1000).toLocaleString('no-NO', {
        day: 'numeric',
        month: 'long',
        hour: 'numeric',
        minute: 'numeric'
    })

    
    const [isAuthor, setIsAuthor] = useState(false)

    useEffect(() => {
        if (user && comment.author.uid === user.uid) {
            setIsAuthor(true)
        }
    }, [user, comment])

  return (
    <div className={`flex flex-col space-x-2 ${!isAuthor ? 'items-end' : null}`}>
        <div className={`flex flex-col w-2/3 ${!isAuthor ? 'items-end' : null}`}>
            <div className={`flex flex-col ${!isAuthor ? 'items-end' : null}`}>
                <div className='flex flex-row space-x-1 items-center'>
                    {user.uid === postAuthor.uid ? (<MdPerson />) : null}
                    <div className='font-semibold text-sm'>{comment.author.email}</div>
                </div>
                {date && <p className='text-xs'>{date}</p>}
            </div>
            <div
                className={`${isAuthor ? 'bg-blue-500' : 'bg-gray-400'} px-2 py-1 rounded-xl max-w-fit text-white`}
            >
                {comment.body}
            </div>
        </div>
    </div>
  )
}

export default CommentCard
