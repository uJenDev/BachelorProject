import React from 'react'
import { BiCylinder } from 'react-icons/bi'
import { GiAncientScrew } from 'react-icons/gi'
import { HiOutlineCubeTransparent } from 'react-icons/hi'
import { MdDeleteOutline, MdTimer, MdWaterDrop } from 'react-icons/md'
import { secondsToHMS } from '../../../utility/HelperFunctions'

const PostSettingDetailsList = ({
    post,
    textSize,
    textColor
}) => {
  return (
    <div className={`flex flex-col items-start space-y-2 mt-3 ${textSize ? textSize : null} ${textColor ? textColor : null}`}>
        <div className='flex items-center space-x-1'>
            <HiOutlineCubeTransparent className='' />
            <p className='font-bold  max-w-fit'>{post.setting?.material ? post.setting.material.title : 'Not listed'}</p>
        </div>
        <div className='flex items-center space-x-1'>
            <BiCylinder className='' />
            <p className='font-bold  max-w-fit'>{post.setting?.part ? `${post.setting.part.name}` : 'Not listed'}</p>
            <p>&times;</p>
            <p className='font-semibold  max-w-fit'>{post.setting?.quantity ? `${post.setting.quantity}` : 'Not listed'}</p>
        </div>
        <div className='flex items-center space-x-1'>
            <GiAncientScrew className='' />
            <p className='font-bold  max-w-fit'>{post.setting?.tool ? post.setting.tool.name : 'Not listed'}</p>
        </div>
        <div className='flex items-center space-x-1'>
            <MdWaterDrop className='' />
            <p className='font-bold  max-w-fit'>{post.setting?.coolant ? post.setting.coolant.name : 'Not listed'}</p>
        </div>
        <div className='flex items-center space-x-1'>
            <MdTimer className='' />
            <p className='font-bold  max-w-fit'>{post.setting?.operationalFactors?.cycleTime ? secondsToHMS(post.setting.operationalFactors.cycleTime) : 'Not listed'}</p>
        </div>
        <div className='flex items-center space-x-1'>
            <MdDeleteOutline className='' />
            <p className='font-bold  max-w-fit'>{post.setting?.operationalFactors?.defectRate ? `${post.setting.operationalFactors.defectRate}%` : 'Not listed'}</p>
        </div>
    </div>
  )
}

export default PostSettingDetailsList
