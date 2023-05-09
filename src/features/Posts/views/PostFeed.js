import React from 'react'
import PostCard from '../components/PostCard'

const PostFeed = ({
    posts,
    selectedPost,
    setSelectedPost,
    groupIsSelected
}) => {

  return (
    <div className='space-y-2 w-80'>
      {posts[0] ? posts.map(post => (
            <PostCard
                key={post.id}
                post={post}
                groupIsSelected={groupIsSelected}
                selectedPost={selectedPost}
                setSelectedPost={setSelectedPost}
            />
        ))
        :
        (<div className='opacity-60'>
            No posts here yet..
        </div>
        )
  }
    </div>
  )
}

export default PostFeed
