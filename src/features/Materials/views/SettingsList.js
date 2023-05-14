import { collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../../../firebase';
import SettingsListCard from '../components/SettingsListCard';

const SettingsList = () => {

    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(false);

    const materialId = useParams().material;
    const materialRef = materialId ? doc(db, 'material', materialId) : null;

    useEffect(() => {
        if (!materialId) return;
        setLoading(true)
        const getSettings = onSnapshot(
            query(
                collection(db, 'setting'),
                where('materialRef', '==', materialRef)
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
                            part: settingData.partRef
                                ? await (await getDoc(settingData.partRef)).data()
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
    }, [materialId])

    if (loading) return null

  return (
    <div className='flex flex-col space-y-2 mt-5'>
        {settings && settings.map((setting) => (
            <SettingsListCard
                key={setting.id}
                setting={setting}
            />
        ))}
    </div>
  )
}

export default SettingsList
