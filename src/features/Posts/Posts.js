import { CircularProgress } from '@mui/material'
import { collection, getDoc, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { MdAdd } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { db } from '../../firebase'
import { selectUser } from '../../slices/userSlice'
import FocusPost from './views/FocusPost'
import NewPostModal from './views/NewPostModal'
import PostFeed from './views/PostFeed'

const Posts = ({
  selectedGroup,
  groupIds,
  groups
}) => {

    const user = useSelector(selectUser)
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      if (!groupIds[0]) return;
      setLoading(true);
      const getPosts = onSnapshot(
        query(
          collection(db, 'posts'),
          selectedGroup ? where('group', '==', selectedGroup?.id) : where('group', 'in', groupIds),
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
    }, [selectedGroup, groupIds]);

    const [selectedPost, setSelectedPost] = useState(null);

    // set selected post to first post in groupPosts
    useEffect(() => {
      if (posts) {
        setSelectedPost(posts[0])
      } else {
        setSelectedPost([])
      }
    }, [posts])

    const [open, setOpen] = useState(false);

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
      <div className='flex w-full'>
          {groupIds && (
            <div className='flex flex-col px-5 w-96'>
              <div className='flex justify-end'>
                <button
                  onClick={() => setOpen(true)}
                  className='flex flex-row items-center bg-gray-300 font-semibold px-2 py-1 rounded-lg mt-2 duration-300 ease-out hover:bg-blue-500 hover:text-white hover:scale-105'
                >
                  <MdAdd />
                  <h1>New Post</h1>
                </button>
              </div>
              <h1 className='flex mt-2 text-xl border-b-2 border-black mb-2 pr-5'>{selectedGroup ? `${selectedGroup.name} posts` : 'Your Feed'}</h1>
              <PostFeed
                  posts={posts}
                  groupIsSelected={selectedGroup ? true : false}
                  selectedPost={selectedPost}
                  setSelectedPost={setSelectedPost}
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
          open={open}
          setOpen={setOpen}
          user={user}
          group={selectedGroup}
          groups={groups}
      />
    </>
  )
}

export default Posts
