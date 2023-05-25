import { Autocomplete, TextField } from '@mui/material';
import React, { useState } from 'react'
import PostCard from '../components/PostCard'

const PostFeed = ({
    posts,
}) => {

  const [selectedPart, setSelectedPart] = useState(null)

  // Extract unique parts from posts
  let uniqueParts = {};

  posts.forEach(post => {
      if (post.setting && post.setting.part) {
          uniqueParts[post.setting.partRef.id] = {
              label: post.setting.part.name,
              part: post.setting.partRef
          };
      }
  });

  const parts = Object.values(uniqueParts);
  console.log(posts)



  return (
    <div className='flex flex-col overflow-y-scroll scrollbar-hide'>
      <div className='flex items-center mb-2 mt-2'>
        <Autocomplete
          options={parts}
          value={parts.find(part => part.part.id === selectedPart) || null}
          sx={{ width: 320 }}
          getOptionLabel={(option) => option.label}
          onChange={(event, newValue) => {
            setSelectedPart(newValue ? newValue.part.id : null);
          }}
          renderInput={(params) => <TextField {...params} label="Sort by part.." variant="outlined" />}
        />
      </div>
      <div className='space-y-2 w-80 overflow-y-scroll scroll scroll-smooth overflow-x-hidden pb-10 scrollbar-hide'>
        {posts.length > 0 ? posts.filter(post => post.setting && (!selectedPart || post.setting.partRef.id === selectedPart)).map(post => (
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
    </div>
  )
}

export default PostFeed
