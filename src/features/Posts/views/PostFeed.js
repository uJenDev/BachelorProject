import { Autocomplete, TextField } from '@mui/material';
import React, { useState } from 'react'
import PostCard from '../components/PostCard'

const costAnalysisCalculation = (post) => {
  if (!post) return;

  const materialCostPerPart = post?.setting?.part?.dimensions?.length * 
    post?.setting?.part?.dimensions.width * 
    post?.setting?.part?.dimensions.height * 
    post?.setting?.material?.pricePerKg;
          
  const defectRate = post?.setting?.operationalFactors?.defectRate;
  const defectCostPerPart = materialCostPerPart * (1/(1 - defectRate) - 1)

  const toolLife = post?.setting?.operationalFactors?.toolLife;
  const toolPrice = post?.setting?.tool?.price;
  const toolsCostPerPart = toolPrice / toolLife

  const cycleTime = post?.setting?.operationalFactors?.cycleTime;
  const coolantUsagePerPart = post?.setting?.operationalFactors?.coolantUsage / 60 * cycleTime;
  const coolantPrice = post?.setting?.coolant?.pricePerLiter;
  const coolantCostPerPart = coolantPrice * coolantUsagePerPart

  const totalCostPerPart = defectCostPerPart + toolsCostPerPart + coolantCostPerPart

  return {
      materialCostPerPart,
      defectCostPerPart,
      toolsCostPerPart,
      coolantCostPerPart,
      totalCostPerPart,
  }
}

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

  // Performing cost analysis on all posts and adding it to the post object
  posts.forEach(post => {
      post.costAnalysis = costAnalysisCalculation(post);
  });
  



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
        {posts.length > 0 ? posts.filter(post => post.setting && (!selectedPart || post.setting.partRef.id === selectedPart)).sort((a, b) => a.costAnalysis.totalCostPerPart - b.costAnalysis.totalCostPerPart).map(post => (
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
