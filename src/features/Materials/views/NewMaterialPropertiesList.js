import React, { useState } from 'react';
import NewMaterialPropertyListCard from '../components/NewMaterialPropertyListCard';

const NewMaterialPropertiesList = ({ propertyList, setPropertyList, defualtPropertyListLength }) => {

  const [newProperty, setNewProperty] = useState({ name: '', value: '', unit: '' });

  const updateProperty = (updateProperty) => {
    setPropertyList(
      propertyList.map((property) =>
        property.slug === updateProperty.slug ? updateProperty : property
      )
    );
  };

  const deleteProperty = (slug) => {
    setPropertyList(propertyList.filter((property) => property.slug !== slug));
  };

  const handleNewProperty = () => {
    if (!newProperty.name.trim()) return;
    setPropertyList([...propertyList, { ...newProperty, slug: newProperty.name.toLowerCase().replace(/\s+/g, '-') }]);
    setNewProperty({ name: '', value: '', unit: '' });
  };

  return (
    <div className="mt-4">
      {propertyList.map((property, index) => (
        <NewMaterialPropertyListCard
          key={property.slug}
          property={property}
          onChange={updateProperty}
          onDelete={deleteProperty}
          isDefault={index < defualtPropertyListLength}
        />
      ))}
      <h1 className="text-md font-semibold mt-4">Custom Properties</h1>
      <NewMaterialPropertyListCard
        property={newProperty}
        onChange={(updateProperty) => setNewProperty(updateProperty)}
        onDelete={() => setNewProperty({ name: '', value: '', unit: '' })}
        isDefault={false}
      />
      <button
        className="px-2 py-1 bg-blue-200 text-blue-500 rounded-lg shadow-md focus:outline-none duration-300 ease-out hover:bg-blue-500 hover:text-white hover:scale-105"
        onClick={handleNewProperty}
      >
        Add Property
      </button>
    </div>
  );
};

export default NewMaterialPropertiesList;