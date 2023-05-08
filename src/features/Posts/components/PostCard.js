import React from 'react'

const PostCard = ({ 
    post,
    selectedPost,
    setSelectedPost
}) => {
  return (
    <div className={`
        py-2 px-3 rounded-xl shadow-md duration-300 ease-out
        ${selectedPost?.id === post.id ? 'translate-x-5 bg-blue-500' : 'bg-gray-700 '}
    `}>
        <div className='flex flex-col pb-2 space-y-1 '>
            <button
                onClick={() => setSelectedPost(post)}
                className='flex flex-col text-white duration-200 ease-out hover:animate-pulse text-left'
            >
                <h1 className='font-semibold text-lg'>{post.title}</h1>
                <p className='text-xs text-gray-400'>by {post.author.email}</p>
            </button>
            <p className='text-sm font-bold text-blue-500 bg-blue-200 max-w-fit px-2 py-1 rounded-xl'>{post.material?.title}</p>
        </div>
        <p className='text-white'>{post.body}</p>
    </div>
  )
}

export default PostCard
