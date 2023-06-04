import React from 'react'
import { BiCylinder } from 'react-icons/bi'
import { GiAncientScrew } from 'react-icons/gi'
import { HiOutlineCubeTransparent } from 'react-icons/hi'
import { MdDeleteOutline, MdTimer, MdWaterDrop } from 'react-icons/md'
import { secondsToHMS } from '../../../utility/HelperFunctions'
import { BsCash } from 'react-icons/bs'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const PostSettingDetailsList = ({
    post,
    textSize,
    textColor
}) => {

    const ToolTip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
      ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
          backgroundColor: '#f5f5f9',
          color: 'rgba(0, 0, 0, 0.87)',
          maxWidth: 220,
          fontSize: theme.typography.pxToRem(12),
          border: '1px solid #dadde9',
        },
      }));


  return (
    <div className={`flex flex-col items-start space-y-2 mt-3 ${textSize ? textSize : null} ${textColor ? textColor : null}`}>
        {/* Cost per part */}
        <ToolTip
            title={
                <React.Fragment>
                    <Typography color="inherit">Cost per Part</Typography>
                    {'Total cost per part with respect to the cost of the material, tool and coolant.'}
                </React.Fragment>
            }
        >
            <div className='flex items-center space-x-1 cursor-default'>
                <BsCash className='' />
                <p className='font-bold  max-w-fit'>{post.costAnalysis ? `${Number(post.costAnalysis.totalCostPerPart).toFixed(2)} nok` : 'Not listed'}</p>
            </div>
        </ToolTip>
        
        {/* Material */}
        <ToolTip
            title={
                <React.Fragment>
                    <Typography color="inherit">Material</Typography>
                    {'The specific material used.'}
                </React.Fragment>
            }
        >
            <div className='flex items-center space-x-1 cursor-default'>
                <HiOutlineCubeTransparent className='' />
                <p className='font-bold  max-w-fit'>{post.setting?.material ? post.setting.material.title : 'Not listed'}</p>
            </div>
        </ToolTip>
        
        {/* Part */}
        <ToolTip
            title={
                <React.Fragment>
                    <Typography color="inherit">Part</Typography>
                    {'The part that is in focus. Also indicates the '}<em>{'quantity'}</em>{' of parts produced.'}
                </React.Fragment>
            }
        >
            <div className='flex items-center space-x-1 cursor-default'>
                <BiCylinder className='' />
                <p className='font-bold  max-w-fit'>{post.setting?.part ? `${post.setting.part.name}` : 'Not listed'}</p>
                <p>&times;</p>
                <p className='font-semibold  max-w-fit'>{post.setting?.quantity ? `${post.setting.quantity}` : 'Not listed'}</p>
            </div>
        </ToolTip>
        
        {/* Tool */}
        <ToolTip
            title={
                <React.Fragment>
                    <Typography color="inherit">Tool</Typography>
                    {'The type of tool used.'}
                </React.Fragment>
            }
        >
            <div className='flex items-center space-x-1 cursor-default'>
                <GiAncientScrew className='' />
                <p className='font-bold  max-w-fit'>{post.setting?.tool ? post.setting.tool.name : 'Not listed'}</p>
            </div>
        </ToolTip>
        
        {/* Coolant */}
        <ToolTip
            title={
                <React.Fragment>
                    <Typography color="inherit">Coolant</Typography>
                    {'The type of coolant used.'}
                </React.Fragment>
            }
        >
            <div className='flex items-center space-x-1 cursor-default'>
                <MdWaterDrop className='' />
                <p className='font-bold  max-w-fit'>{post.setting?.coolant ? post.setting.coolant.name : 'Not listed'}</p>
                {post.setting?.operationalFactors?.coolantUsage ? <p className='font-semibold  max-w-fit'>{`- ${post.setting.operationalFactors.coolantUsage} L/min`}</p> : null}
            </div>
        </ToolTip>
        
        {/* Cycle Time */}
        <ToolTip
            title={
                <React.Fragment>
                    <Typography color="inherit">Cycle Time</Typography>
                    {'The time it takes to produce one part.'}
                </React.Fragment>
            }
        >
            <div className='flex items-center space-x-1 cursor-default'>
                <MdTimer className='' />
                <p className='font-bold  max-w-fit'>{post.setting?.operationalFactors?.cycleTime ? secondsToHMS(post.setting.operationalFactors.cycleTime) : 'Not listed'}</p>
            </div>
        </ToolTip>
        
        {/* Defect Rate */}
        <ToolTip
            title={
                <React.Fragment>
                    <Typography color="inherit">Defect Rate</Typography>
                    {'The percentage of defective parts.'}
                </React.Fragment>
            }
        >
            <div className='flex items-center space-x-1 cursor-default'>
                <MdDeleteOutline className='' />
                <p className='font-bold  max-w-fit'>{post.setting?.operationalFactors?.defectRate ? `${post.setting.operationalFactors.defectRate}%` : 'Not listed'}</p>
            </div>
        </ToolTip>
    </div>
  )
}

export default PostSettingDetailsList
