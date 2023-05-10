import React, { useEffect, useState } from 'react'
import PropertyList from '../components/PropertyList';
import MaterialHeader from '../components/MaterialHeader';
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../../firebase';


const MaterialView = ({ 
    material,
    category,
}) => {

    const [thisMaterial, setThisMaterial] = useState(null);
    const categoryRef = doc(db, 'category', category.id); 

    // fetch the single material from the database
    useEffect(() => {
        const getMaterial = onSnapshot(
            query(
                collection(db, 'material'),
                where('categoryRef', '==', categoryRef),
                where('title', '==', material.title),
            ),
            (snapshot) => {
                setThisMaterial(snapshot.docs.map(doc => ({
                    id: doc.id,
                    categoryTitle: 'Test',
                    ...doc.data()
                }))[0])
            },
            (error) => {
                console.log(error)
            }
        )
        
        return () => {
            console.log('Detaching listener')
            getMaterial()
        }
    }, [material])
    
    console.log(thisMaterial)

  return (
    <div className='flex flex-col w-full'>
        <div className='flex flex-col px-2 bg-gray-700 py-2 rounded-xl max-w-fit'>
            <MaterialHeader 
                material={thisMaterial}
            />

            <div className='flex flex-row'>
                {thisMaterial.properties && (
                    <PropertyList 
                        material={thisMaterial} 
                    />
                )}
            </div>
        </div>
    </div>
  )
}

export default MaterialView


{/* <div className='flex flex-row space-x-2 w-full'>
            <MaterialSettingsView
                material={material}
                selectedTool={selectedTool}
            />
            <div className="flex pt-2">
                <div className="icon-wrapper w-9">
                    <MdLink
                        className={`text-4xl items-center text-green-500 icon ${
                            selectedTool ? "" : "icon-hidden"
                        }`}
                    />
                    <MdLinkOff
                        className={`text-4xl items-center text-red-500 icon ${
                            selectedTool ? "icon-hidden" : ""
                        }`}
                    />
                </div>
            </div>
            <MaterialToolsView
                material={material}
                selectedTool={selectedTool}
                setSelectedTool={setSelectedTool}
            />
        </div> */}