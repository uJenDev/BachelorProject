import React from 'react';
import TextField from '@mui/material/TextField';
import { MdDeleteForever } from 'react-icons/md';

const NewPostSettingsListCard = ({ setting, onChange, onDelete, isDefault }) => {
  const handleChange = (field) => (event) => {
    onChange({ ...setting, [field]: event.target.value });
  };

  return (
    <div className='flex items-center'>
        <div className="my-1 grid grid-cols-3 gap-4 w-full">
            <TextField
            label="Name"
            value={setting.name}
            variant='filled'
            onChange={handleChange('name')}
            InputProps={{ readOnly: isDefault, disabled: isDefault }}
            />
            <TextField
                label="Value"
                value={setting.value}
                type={setting.type || 'text'}
                variant='filled'
                onChange={handleChange('value')}
                className="w-full"
                onFocus={(e) => e.target.select()}
            />
            <TextField
                label="Unit"
                value={setting.unit || ''}
                variant='filled'
                onChange={handleChange('unit')}
                InputProps={{ readOnly: isDefault, disabled: isDefault }}
            />
        </div>
        {(!isDefault && (setting.name || setting.value || setting.unit)) ? (
            <button
                className="text-red-500 rounded-lg focus:outline-none text-3xl mx-2 duration-300 ease-out hover:scale-105 hover:text-white hover:bg-red-500"
                onClick={() => onDelete(setting.slug)}
                disabled={isDefault}
            >
                <MdDeleteForever className='' />
            </button>
        )
        :
        (<div className='mr-12'/>)}
    </div>
  );
};

export default NewPostSettingsListCard;