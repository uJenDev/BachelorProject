import { collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore'
import { getDownloadURL, listAll, ref } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db, storage } from '../../../firebase'
import SettingsList from './SettingsList'
import PartViewHeader from '../components/PartViewHeader'

const PartView = ({
  parts
}) => {

  const fetchFiles = async (partId) => {
    const fileTypes = ['images', 'models3D', 'pdfs'];
    const fetchedFiles = {};

    for (const fileType of fileTypes) {
      const folderRef = ref(storage, `parts/${partId}/${fileType}`);
      try {
        const filesList = await listAll(folderRef);
        const fileUrls = await Promise.all(
          filesList.items.map(file => getDownloadURL(file))
        );
        fetchedFiles[fileType] = fileUrls;
      } catch (error) {
        console.log(`Error fetching ${fileType}: `, error);
      }
    }

    return fetchedFiles;
  };
  
  const partId = useParams().part
  const part = parts.find(part => part.id === partId)
  const partRef = partId ? doc(db, 'part', partId) : null

  const [files, setFiles] = useState(null);
  useEffect(() => {
    if (!partId) return;
    fetchFiles(partId)
      .then((files) => {
        setFiles(files);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [partId])

  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      if (!partId) return;
      setLoading(true)
      const getSettings = onSnapshot(
          query(
              collection(db, 'setting'),
              where('partRef', '==', partRef)
          ),
          async (snapshot) => {
              const settingsWithDetails = await Promise.all(
                  snapshot.docs.map(async (doc) => {
                      const settingData = doc.data()
                      return {
                          id: doc.id,
                          ...settingData,
                          material: settingData.materialRef
                              ? await (await getDoc(settingData.materialRef)).data()
                              : null,
                          tool: settingData.toolRef
                              ? await (await getDoc(settingData.toolRef)).data()
                              : null,
                          post: settingData.postRef
                              ? await (await getDoc(settingData.postRef)).data()
                              : null,
                      }
                  }
              )
          )
          setSettings(settingsWithDetails)
          setLoading(false)
          },
      (error) => {
          console.log(error)
          setLoading(false)
      })
      return () => {
          getSettings()
      }
  }, [partId])

  useEffect(() => {
    console.log('part: ', part)
    console.log('settings: ', settings)
    console.log('files: ', files)
  }, [part, files, settings])

  if (loading) return null
  return (
    <div className='flex flex-col w-full bg-gray-200 ml-4'>
      <PartViewHeader
        part={part}
        files={files}
      />
      <SettingsList
        settings={settings}
      />
    </div>
  )
}

export default PartView
