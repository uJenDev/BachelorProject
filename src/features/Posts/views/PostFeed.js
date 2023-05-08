import React, { useEffect } from 'react'
import PostCard from '../components/PostCard'

const PostFeed = ({
    posts,
    selectedPost,
    setSelectedPost
}) => {

  return (
    <div className='space-y-2 w-80'>
      {posts && posts.map(post => (
            <PostCard
                key={post.id}
                post={post}
                selectedPost={selectedPost}
                setSelectedPost={setSelectedPost}
            />
        ))}
    </div>
  )
}

export default PostFeed
