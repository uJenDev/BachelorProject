import React, { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectUser } from '../../../slices/userSlice';
import PartCard from '../components/PartCard';
import NewPartModal from './NewPartModal';

const SideTab = ({
  parts,
  width,
  height,
}) => {

  const [selectedGroup, setSelectedGroup] = useState(null);

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

  
  const newPart = queryParams.get('newPart');

  return (
    <>
      <div className={`flex flex-col mt-10 ${width > 950 ? 'w-[300px]' : 'w-[300px]'}`}>
        <div className='flex flex-col'>
          <p className='text-4xl font-semibold px-1'>Parts</p>
          <div className='flex items-center'>
            {parts?.length > 0 && <p className='text-sm text-gray-500 px-2'>{parts.length} parts</p>}
            <button
              onClick={() => {
                queryParams.set('newPart', 'true');
                navigate({
                  search: queryParams.toString(),
                })
              }}
              className={`
                pl-1 pr-2 py-1 flex items-center text-sm text-blue-500  rounded-lg 
                duration-300 ease-out hover:bg-blue-500 hover:text-white hover:scale-105
                ${newPart === 'true' && 'bg-blue-500 text-white scale-105'}
              `}
            >
              <MdAdd className='text-lg'/>
              <p className=''>New</p>
            </button>
          </div>  
        </div>
        <div 
          className='flex flex-col space-y-2 mt-3 border-l-2 pl-2'
        >
            {sortedParts?.map((projectOrPart) => (
              <div 
                key={projectOrPart.title}
                className={`
                  duration-150 ease-out
                `}
              >
                  <p
                    className={`
                      px-2 text-lg font-regular mt-2 cursor-pointer duration-300 ease-out
                      ${selectedGroup === projectOrPart.title ? 'scale-105' : 'hover:scale-95'}
                    `}
                    onClick={() => {
                      setSelectedGroup(projectOrPart.title)
                      navigate('/parts')
                    }}
                  >
                    {projectOrPart.title}
                  </p>
                  {selectedGroup === projectOrPart.title ?
                    projectOrPart.data.map((part) => (
                      <PartCard key={part.id} part={part} />
                    ))
                  : (
                    <p className='text-blue-500 bg-blue-200 rounded-md w-fit font-bold text-sm px-2 ml-1'>{projectOrPart?.data.length}</p>
                  )}
              </div>
            ))}
        </div>
      </div>
      <NewPartModal
        user={user}
        width={width}
        height={height}
      />
    </>
  );
};

export default SideTab;
