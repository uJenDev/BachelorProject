import React from 'react';
import TextField from '@mui/material/TextField';
import { MdDeleteForever } from 'react-icons/md';

const NewMaterialPropertyListCard = ({ property, onChange, onDelete, isDefault }) => {
  const handleChange = (field) => (event) => {
    onChange({ ...property, [field]: event.target.value });
  };

  return (
    <div className='flex items-center'>
        <div className="my-1 grid grid-cols-3 gap-4 w-full">
            <TextField
            label="Name"
            value={property.name}
            variant='filled'
            onChange={handleChange('name')}
            InputProps={{ readOnly: isDefault, disabled: isDefault }}
            />
            <TextField
                label="Value"
                value={property.value}
                type={property.type || 'text'}
                variant='filled'
                onChange={handleChange('value')}
                className="w-full"
                onFocus={(e) => e.target.select()}
            />
            <TextField
                label="Unit"
                value={property.unit || ''}
                variant='filled'
                onChange={handleChange('unit')}
                InputProps={{ readOnly: isDefault, disabled: isDefault }}
            />
        </div>
        {(!isDefault && (property.name || property.value || property.unit)) ? (
            <button
                className="text-red-500 rounded-lg focus:outline-none text-3xl mx-2 duration-300 ease-out hover:scale-105 hover:text-white hover:bg-red-500"
                onClick={() => onDelete(property.slug)}
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

export default NewMaterialPropertyListCard;