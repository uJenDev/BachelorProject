import { CircularProgress } from '@mui/material'
import { collection, getDoc, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { MdAdd } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { db } from '../../firebase'
import { selectUser } from '../../slices/userSlice'
import FocusPost from './views/FocusPost'
import NewPostModal from './views/NewPostModal'
import PostFeed from './views/PostFeed'

const Posts = ({
  selectedProject,
  projectIds,
  projects
}) => {

    const user = useSelector(selectUser)
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      if (!projectIds[0]) return;
      setLoading(true);
      const getPosts = onSnapshot(
        query(
          collection(db, 'posts'),
          selectedProject ? where('project', '==', selectedProject?.id) : where('project', 'in', projectIds),
          orderBy('createdAt', 'desc'),
        ),
        async (snapshot) => {
          const postsWithDetails = await Promise.all(
            snapshot.docs.map(async (doc) => {
              const postData = doc.data();
              const settingRef = postData.settingRef;
              const settingSnapshot = settingRef ? await getDoc(settingRef) : null;

              // fetch material, tool and part data from refs in settingSnapshot
              const settingData = settingSnapshot ? settingSnapshot.data() : null;
              const setting = settingSnapshot
                ? {
                    id: settingSnapshot.id,
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
                  }
                : null;
    
              return {
                id: doc.id,
                ...postData,
                setting: setting ? setting : null,
              };
            })
          );
    
          setPosts(postsWithDetails);
          setLoading(false);
        },
        (error) => {
          console.log(error);
          setLoading(false);
        }
      );
      return () => {
        getPosts();
      };
    }, [selectedProject, projectIds]);

    const [selectedPost, setSelectedPost] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const newPost = queryParams.get('newPost');

    const postId = useParams().post;
    useEffect(() => {
      if (postId) {
        const post = posts.find((post) => post.id === postId);
        setSelectedPost(post);
      }
    }, [postId, posts]);

    if (loading) return (
      <div 
        className='flex flex-col items-center justify-center w-full'
      >
        <CircularProgress 
          color='primary'
          className=''
          size={100}
        />
        <h1 className='text-2xl ml-5 animate-pulse'>Loading Posts..</h1>
      </div>
    )

  return (
    <>
      <div className='flex w-full '>
          {projectIds && (
            <div className='flex flex-col w-96 pr-6'>
              <div className='flex justify-end'>
                <button
                  onClick={() => {
                    queryParams.set('newPost', 'true');
                    navigate({
                      search: queryParams.toString(),
                    })
                  }}
                  className='flex flex-row items-center bg-gray-300 font-semibold px-2 py-1 rounded-lg mt-2 duration-300 ease-out hover:bg-blue-500 hover:text-white hover:scale-105'
                >
                  <MdAdd />
                  <h1>New Post</h1>
                </button>
              </div>
              <h1 className='flex mt-2 text-xl border-b-2 border-black mb-2 pr-5'>{selectedProject ? `${selectedProject.name} posts` : 'Your Feed'}</h1>
              <PostFeed
                  posts={posts}
              />
            </div>
          )}

          {selectedPost && (
              <FocusPost
                  post={selectedPost}
                  user={user}
              />
          )}
      </div>
      <NewPostModal
          user={user}
          project={selectedProject}
          projects={projects}
      />
    </>
  )
}

export default Posts
