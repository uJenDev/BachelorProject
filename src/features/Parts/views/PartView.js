import { collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../../firebase'
import PartViewHeader from '../components/PartViewHeader'

const PartView = ({
  parts
}) => {
  
  const partId = useParams().part
  const part = parts.find(part => part.id === partId)
  const partRef = partId ? doc(db, 'part', partId) : null

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
    console.log(settings)
  }, [settings])

  if (loading) return null
  return (
    <div className='flex w-full'>
      <PartViewHeader
        part={part}
      />
    </div>
  )
}

export default PartView
