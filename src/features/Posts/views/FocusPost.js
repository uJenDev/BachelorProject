import React, { useEffect, useRef, useState } from 'react'
import CommentFeed from './CommentFeed';
import SettingsList from './SettingsList';
import { useLocation, useNavigate } from 'react-router-dom';
import { StlViewer } from "react-stl-viewer";
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { storage } from '../../../firebase';
import PostSettingDetailsList from '../components/PostSettingDetailsList';

const FocusPost = ({
    post,
    user
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

    const [files, setFiles] = useState(null);
    useEffect(() => {
        if (!post.setting?.part) return;
        fetchFiles(post.setting.partRef.id)
            .then((files) => {
                setFiles(files);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [post.setting?.part])


    // get window width
    const [width, setWidth] = useState(window.innerWidth)
    const [height, setHeight] = useState(window.innerHeight)
    const breakpoint = 1600;

    useEffect(() => {
        const handleWindowResize = () => {
            setWidth(window.innerWidth)
            setHeight(window.innerHeight)
        }
        window.addEventListener('resize', handleWindowResize)
        
        return () => window.removeEventListener('resize', handleWindowResize)
    }, [])

    const focusPostScrollRef = useRef(null);

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);


  return (
    <div 
        className={`flex overflow-y-scroll flex-col w-full border-l-2 border-black scrollbar-hide`}
        ref={focusPostScrollRef}
    >
        <div className={`flex flex-col w-full px-5`}>
            <div className='flex items-center justify-between'>
                <div className={`flex justify-between flex-col`}>
                    <div>
                        <h1 className='text-4xl font-bold'>{post.title}</h1>
                        <p>by {post.author.email}</p>
                    </div>
                    <PostSettingDetailsList
                        post={post}
                        textSize='text-xl'
                    />
                </div>
                {post.setting?.part && files?.models3D?.length > 0 && (
                    <StlViewer
                        style={{
                            top: 0,
                            left: 0,
                            width: '400px',
                            height: '200px',
                        }}
                        className='bg-blue-500 rounded-xl shadow-lg'
                        orbitControls
                        shadows
                        url={files?.models3D[0]}
                    />
                )}
            </div>
            <div className='mt-5'>
                <p className='text-lg'>{post.body}</p>
            </div>
            <SettingsList
                settings={post.setting?.settings}
                width={width}
                breakpoint={breakpoint}
            />
        </div>

        <CommentFeed
            post={post}
            user={user}
            breakpoint={breakpoint}
            width={width}
            height={height}
        />
    </div>
  )
}

export default FocusPost
