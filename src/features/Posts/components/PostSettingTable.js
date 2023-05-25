import React, { useEffect, useState } from 'react';
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

const costAnalysisCalculation = (post) => {
  if (!post) return;

  const materialCostPerPart = post?.setting?.part?.pricePerUnit;
          
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

const PostSettingTable = ({ post, comparedPost }) => {

  const [postCostAnalysis, setPostCostAnalysis] = useState({
      materialCostPerPart: 0,
      defectCostPerPart: 0,
      toolsCostPerPart: 0,
      coolantCostPerPart: 0,
      totalCostPerPart: 0,
  });

  const [comparedPostCostAnalysis, setComparedPostCostAnalysis] = useState({
      materialCostPerPart: 0,
      defectCostPerPart: 0,
      toolsCostPerPart: 0,
      coolantCostPerPart: 0,
      totalCostPerPart: 0,
  });

  useEffect(() => {
    if (post) {
        const {
            materialCostPerPart,
            defectCostPerPart,
            toolsCostPerPart,
            coolantCostPerPart,
            totalCostPerPart,
        } = costAnalysisCalculation(post);

        setPostCostAnalysis({
            defectCostPerPart: Number(defectCostPerPart).toFixed(2),
            toolsCostPerPart: Number(toolsCostPerPart).toFixed(2),
            coolantCostPerPart: Number(coolantCostPerPart).toFixed(2),
            totalCostPerPart: Number(totalCostPerPart).toFixed(2),

            defectCostPerPartContributingFactor: Number(defectCostPerPart / totalCostPerPart * 100).toFixed(2),
            toolsCostPerPartContributingFactor: Number(toolsCostPerPart / totalCostPerPart * 100).toFixed(2),
            coolantCostPerPartContributingFactor: Number(coolantCostPerPart / totalCostPerPart * 100).toFixed(2),
        });
    }

    if (comparedPost) {
          const {
              materialCostPerPart,
              defectCostPerPart,
              toolsCostPerPart,
              coolantCostPerPart,
              totalCostPerPart,
          } = costAnalysisCalculation(comparedPost);

          setComparedPostCostAnalysis({
              defectCostPerPart: Number(defectCostPerPart).toFixed(2),
              toolsCostPerPart: Number(toolsCostPerPart).toFixed(2),
              coolantCostPerPart: Number(coolantCostPerPart).toFixed(2),
              totalCostPerPart: Number(totalCostPerPart).toFixed(2),

              defectCostPerPartContributingFactor: Number(defectCostPerPart / totalCostPerPart * 100).toFixed(2),
              toolsCostPerPartContributingFactor: Number(toolsCostPerPart / totalCostPerPart * 100).toFixed(2),
              coolantCostPerPartContributingFactor: Number(coolantCostPerPart / totalCostPerPart * 100).toFixed(2),
          });
      } else {
          setComparedPostCostAnalysis(null)
      }
  }, [post, comparedPost])

  return (
    <Box className='mt-10'>
      <Box className='mb-2 flex items-center justify-center'>
        <MdOutlineAttachMoney className='text-3xl' />
        <p className='text-2xl font-semibold'>Cost Overview</p>
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
