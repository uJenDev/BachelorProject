import React, { useEffect, useState } from 'react'
import CommentFeed from './CommentFeed';
import SettingsList from './SettingsList';
import { StlViewer } from "react-stl-viewer";
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { storage } from '../../../firebase';
import PostSettingTable from '../components/PostSettingTable';
import PostSettingDetailsList from '../components/PostSettingDetailsList';
import { MdArrowLeft } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';


const FocusPost = ({
    post,
    comparedPost,
    user,
    breakpoint,
    width,
    height,
}) => {

    // Function for fetching files from storage
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

    // Fetch files from storage
    const [files, setFiles] = useState(null);
    useEffect(() => {
        if (!post?.setting?.part) return;
        fetchFiles(post.setting.partRef.id)
            .then((files) => {
                setFiles(files);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [post?.setting?.part])

    const navigate = useNavigate();
    const locaton = useLocation();
    const queryParams = new URLSearchParams(locaton.search);

    if (!post) return (
        <div 
            className={`flex overflow-y-scroll flex-col w-full h-full items-center justify-center border-l-2 border-black scrollbar-hide`}
        >
            <div className='flex flex-col'>
                <div className='flex items-center'>
                    <MdArrowLeft className='text-4xl mr-5 '/>
                    <p className='text-2xl font-semibold'>
                        Select a post to view details
                    </p>
                </div>
                <button
                    className='ml-5 text-blue-500'
                    onClick={() => {
                        queryParams.set('newPost', true);
                        navigate({
                            search: queryParams.toString(),
                        })
                    }}
                >
                    or create a new post
                </button>
            </div>
        </div>
    );
  return (
    <div 
        className={`flex overflow-y-scroll flex-col w-full border-l-2 border-black scrollbar-hide`}
    >
        <div className={`flex flex-col w-full px-5`}>
            <div className='flex items-center justify-between'>
                <div className={`flex justify-between flex-col w-full`}>
                    <div>
                        <h1 className='text-4xl font-bold'>{post.title}</h1>
                        <p>by {post.createdBy.email}</p>
                    </div>
                    <PostSettingDetailsList
                        post={post}
                        textSize='text-xl'
                    />
                    <p className='text-xl font-semibold my-5'>{post.body}</p>
                    <SettingsList
                        settings={post.setting?.settings}
                        comparedSettings={comparedPost?.setting?.settings}
                    />
                    {/* <PostSettingTable
                        post={post}
                        comparedPost={comparedPost}
                    /> */}
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
