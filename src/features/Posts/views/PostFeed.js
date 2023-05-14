import React from 'react'
import PostCard from '../components/PostCard'

const PostFeed = ({
    posts,
}) => {

  return (
    <div className='space-y-2 w-80 overflow-y-scroll scroll scroll-smooth overflow-x-hidden pb-10 scrollbar-hide'>
      {posts[0] ? posts.map(post => (
            <PostCard
                key={post.id}
                post={post}
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
