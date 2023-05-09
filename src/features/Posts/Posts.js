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
  groupIds
}) => {

    const user = useSelector(selectUser)

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (!groupIds[0]) return;
        const getPosts = onSnapshot(
            query(
                collection(db, 'posts'),
                selectedGroup ? where('group', '==', selectedGroup?.id) : where('group', 'in', groupIds),
                orderBy('createdAt', 'desc'),
            ),
          async (snapshot) => {
            const postsWithMaterials = await Promise.all(
              snapshot.docs.map(async (doc) => {
                const postData = doc.data();
    
                if (postData.materialRef) {
                  const materialSnapshot = await getDoc(postData.materialRef);
                  const materialData = materialSnapshot.data();
                  return {
                    id: doc.id,
                    ...postData,
                    material: materialData,
                  };
                } else {
                  return {
                    id: doc.id,
                    ...postData,
                  };
                }
              })
            );
    
            setPosts(postsWithMaterials);
          },
          (error) => {
            console.log(error);
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
              <h1 className='flex mt-2 text-xl border-b-2 border-black mb-2'>{selectedGroup ? `${selectedGroup.name} posts` : 'Your Feed'}</h1>
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
      />
    </>
  )
}

export default Posts
