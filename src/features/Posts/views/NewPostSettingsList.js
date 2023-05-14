import React, { useState } from 'react';
import NewPostSettingsListCard from '../components/NewPostSettingsListCard';

const NewPostSettingsList = ({ settingsList, setSettingsList, defaultSettingsListLength }) => {
  const [newSetting, setNewSetting] = useState({ name: '', value: '', unit: '' });

  const updateSetting = (updatedSetting) => {
    setSettingsList(
      settingsList.map((setting) =>
        setting.slug === updatedSetting.slug ? updatedSetting : setting
      )
    );
  };

  const deleteSetting = (slug) => {
    setSettingsList(settingsList.filter((setting) => setting.slug !== slug));
  };

  const handleNewSetting = () => {
    if (!newSetting.name.trim()) return;
    setSettingsList([...settingsList, { ...newSetting, slug: newSetting.name.toLowerCase().replace(/\s+/g, '-') }]);
    setNewSetting({ name: '', value: '', unit: '' });
  };

  return (
    <div className="mt-4">
      {settingsList.map((setting, index) => (
        <NewPostSettingsListCard
          key={setting.slug}
          setting={setting}
          onChange={updateSetting}
          onDelete={deleteSetting}
          isDefault={index < defaultSettingsListLength}
        />
      ))}
      <h1 className="text-md font-semibold mt-4">Custom Settings</h1>
      <NewPostSettingsListCard
        setting={newSetting}
        onChange={(updatedSetting) => setNewSetting(updatedSetting)}
        onDelete={() => setNewSetting({ name: '', value: '', unit: '' })}
        isDefault={false}
      />
      <button
        className="px-2 py-1 bg-blue-200 text-blue-500 rounded-lg shadow-md focus:outline-none duration-300 ease-out hover:bg-blue-500 hover:text-white hover:scale-105"
        onClick={handleNewSetting}
      >
        Add Setting
      </button>
    </div>
  );
};

export default NewPostSettingsList;