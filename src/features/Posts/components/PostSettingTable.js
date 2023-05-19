import React from 'react';
import { GiAncientScrew } from 'react-icons/gi';
import { MdDeleteOutline, MdOutlineAttachMoney, MdWaterDrop } from 'react-icons/md';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const CostCard = ({ icon: Icon, title, cost, contributingFactor }) => (
  <Card variant="outlined" sx={{ marginBottom: '1em' }}>
    <CardContent>
      <Box display="flex" alignItems="center" marginBottom="1em">
        <Box marginRight="1em"><Icon /></Box>
        <Typography variant="h6">{title}</Typography>
      </Box>
      <Typography color="text.secondary">
        Cost: {cost || 'Not listed'}
      </Typography>
      <Typography color="text.secondary">
        Contributing Factor: {contributingFactor || 'Not listed'}
      </Typography>
    </CardContent>
  </Card>
);

const PostSettingTable = ({ post, postCostAnalysis, comparedPost, comparedPostCostAnalysis }) => {
  return (
    <Box className='mt-10'>
      <Box className='mb-2 flex items-center justify-center'>
        <MdOutlineAttachMoney className='text-3xl' />
        <Typography className='text-2xl font-semibold'>Cost Overview</Typography>
      </Box>
      <Grid container spacing={2} className='max-w-fit'>
        <Grid item xs={comparedPost ? 6 : 12}>
          <CostCard 
            icon={GiAncientScrew}
            title={post.setting?.tool ? post.setting.tool.name : 'Not listed'}
            cost={postCostAnalysis?.toolsCostPerPart}
            contributingFactor={postCostAnalysis?.toolsCostPerPartContributingFactor}
          />
          <CostCard 
            icon={MdWaterDrop}
            title={post.setting?.coolant ? post.setting.coolant.name : 'Not listed'}
            cost={postCostAnalysis?.coolantCostPerPart}
            contributingFactor={postCostAnalysis?.coolantCostPerPartContributingFactor}
          />
          {/* add more CostCard instances as needed */}
        </Grid>
        {comparedPost && (
          <Grid item xs={6}>
            <CostCard 
              icon={GiAncientScrew}
              title={comparedPost.setting?.tool ? comparedPost.setting.tool.name : 'Not listed'}
              cost={comparedPostCostAnalysis?.toolsCostPerPart}
              contributingFactor={comparedPostCostAnalysis?.toolsCostPerPartContributingFactor}
            />
            <CostCard 
              icon={MdWaterDrop}
              title={comparedPost.setting?.coolant ? comparedPost.setting.coolant.name : 'Not listed'}
              cost={comparedPostCostAnalysis?.coolantCostPerPart}
              contributingFactor={comparedPostCostAnalysis?.coolantCostPerPartContributingFactor}
            />
            {/* add more CostCard instances as needed */}
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default PostSettingTable;
