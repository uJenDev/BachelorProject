import { Button } from '@mui/material'
import React from 'react'
import { green } from '@mui/material/colors'

const NewPartFiles = ({
    images,
    setImages,
    models3D,
    setModels3D,
    pdfs,
    setPdfs,
    handleFileChange,
}) => {
  return (
    <>
        <p className='text-lg font-semibold mt-5'>Add some files</p>
        <div className='flex w-full space-x-2'>
            <div className='flex flex-col w-full'>
            <Button
                variant="contained" 
                component="label"
                className='w-full'
                sx={{
                    background: images?.length > 0 && green[600],
                    '&:hover': {
                        background: images?.length > 0 && green[800],
                    }
                }}
            >
                {images?.length > 0 && <p className=' mr-1 font-bold'>{images?.length} images -</p>}
                {images?.length > 0 ? 'Change' : 'Add images'}
                <input
                    hidden
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFileChange(e, setImages)}
                />
            </Button>
            </div>
            <div className='flex flex-col w-full'>
            <Button 
                variant="contained" 
                component="label"
                className='w-full'
                sx={{
                    background: models3D?.length > 0 && green[600],
                    '&:hover': {
                        background: images?.length > 0 && green[800],
                    }
                }}
            >
                {models3D?.length > 0 && <p className=' mr-1 font-bold'>Model Selected</p>}
                {models3D?.length > 0 ? '' : 'Add a 3d-model'}
                <input
                    hidden
                    type="file"
                    accept=".glb,.gltf,.obj,.fbx,.stl"
                    onChange={(e) => handleFileChange(e, setModels3D)}
                />
            </Button>
            </div>
            <div className='flex flex-col w-full'>
            <Button 
                variant="contained" 
                component="label"
                className='w-full'
                sx={{
                    background: pdfs?.length > 0 && green[600],
                    '&:hover': {
                        background: images?.length > 0 && green[800],
                    }
                }}
            >
                {pdfs?.length > 0 && <p className=' mr-1 font-bold'>{pdfs?.length} pdf -</p>}
                {pdfs?.length > 0 ? 'Change' : 'Add pdfs'}
                <input
                    hidden
                    type="file"
                    accept=".pdf"
                    multiple
                    onChange={(e) => handleFileChange(e, setPdfs)}
                />
            </Button>
            </div>
        </div>
      </>
  )
}

export default NewPartFiles
