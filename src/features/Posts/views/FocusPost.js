import React, { useEffect, useState } from 'react'
import CommentFeed from './CommentFeed';

const FocusPost = ({
    post,
    user
}) => {

    // get window width
    const [width, setWidth] = useState(window.innerWidth)
    const [height, setHeight] = useState(window.innerHeight)
    const breakpoint = 1200;

    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener('resize', handleWindowResize)
        
        return () => window.removeEventListener('resize', handleWindowResize)
    }, [])

  return (
    <div className={`flex ${width < breakpoint ? 'flex-col' : 'flex-row'} w-full border-l-2 border-black ml-2`}>
        <div className='flex flex-col w-full ml-10 border-r-2 pr-2 border-black'>
            <div className={`flex justify-between ${width < breakpoint ? 'flex-col' : 'flex-row w-full'}`}>
                <div>
                    <h1 className='text-2xl font-bold'>{post.title}</h1>
                    <p>by {post.author.email}</p>
                </div>
                <div>
                    <p className='font-bold text-blue-500 px-2 py-1 bg-blue-200 rounded-xl mt-2 text-xl max-w-fit'>{post.material?.title}</p>
                </div>
            </div>
            <div>
                <p className='text-lg font-light'>{post.body}</p>
            </div>
        </div>
       <div className={`${width < breakpoint ? 'w-full px-10' : 'w-2/3 px-5'}`}>
            <h1 className='text-lg border-b-2 border-black mb-1'>Comments</h1>
            <CommentFeed
                post={post}
                user={user}
            />
       </div>
    </div>
  )
}

export default FocusPost
