import React, { useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectUser } from '../../../slices/userSlice';
import PartCard from '../components/PartCard';
import NewPartModal from './NewPartModal';

const SideTab = ({
  parts
}) => {

  const user = useSelector(selectUser);

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const sortedBy = queryParams.get('sortedBy') || 'project';

  const groupPartsBy = (array, key) => {
    return array.reduce((result, item) => {
      const groupKey = item.project.name;
      (result[groupKey] = result[groupKey] || []).push(item);
      return result;
    }, {});
  };

  const partsGrouped = groupPartsBy(parts, sortedBy);

  const sortedParts = Object.entries(partsGrouped).map(([title, data]) => ({
    title,
    data: data.sort((a, b) => a.name.localeCompare(b.name)),
  }));

  useEffect(() => {
  }, [sortedParts]);

  
  const newPart = queryParams.get('newPart');

  return (
    <>
      <div className='flex flex-col h-full bg-gray-200 pl-5 pr-5 min-w-fit'>
        <div className='flex items-center'>
          <h1 className='px-2 text-4xl font-semibold'>Parts</h1>
          <button
            onClick={() => {
              queryParams.set('newPart', 'true');
              navigate({
                search: queryParams.toString(),
              })
            }}
            className={`
              pl-1 pr-2 py-1 flex items-center text-sm text-blue-500 bg-blue-200 rounded-lg 
              duration-300 ease-out hover:bg-blue-500 hover:text-white hover:scale-105
              ${newPart === 'true' && 'bg-blue-500 text-white scale-105'}
            `}
          >
            <MdAdd className='text-lg'/>
            <p className=''>New Part</p>
          </button>
        </div>  
        <div className='flex flex-col space-y-2 mt-3'>
          {sortedParts?.map((groupOrPart) => (
            <div 
                key={groupOrPart.title} 
                className='flex flex-col space-y-2'
            >
                <p className='px-2 text-lg font-semibold mt-5'>{groupOrPart.title}</p>
                {groupOrPart.data.map((part) => (
                  <PartCard key={part.id} part={part} />
                ))}
            </div>
          ))}
        </div>
      </div>
      <NewPartModal
        user={user}
      />
    </>
  );
};

export default SideTab;