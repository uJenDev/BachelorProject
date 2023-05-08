import { collection, getDoc, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { db } from '../../firebase'
import { selectUser } from '../../slices/userSlice'
import FocusPost from './views/FocusPost'
import PostFeed from './views/PostFeed'

const Posts = () => {

    const user = useSelector(selectUser)
    console.log(user)

    const [posts, setPosts] = useState(null);

    useEffect(() => {
        const getPosts = onSnapshot(
            query(
                collection(db, 'posts'),
                orderBy('createdAt', 'desc'),
            ),
          async (snapshot) => {
            const postsWithMaterials = await Promise.all(
              snapshot.docs.map(async (doc) => {
                const postData = doc.data();
    
                // Check if materialRef exists
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
    }, []);

    const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    if (!selectedPost && posts) {
        setSelectedPost(posts[0]);
    }
  }, [posts])

  

  return (
    <div className='flex w-full'>
        <div className='flex flex-col px-5 w-96'>
            <h1 className='flex mt-2 text-xl border-b-2 border-black mb-2'>New Posts</h1>
            <PostFeed
                posts={posts}
                selectedPost={selectedPost}
                setSelectedPost={setSelectedPost}
            />
        </div>

        {selectedPost && (
            <FocusPost
                post={selectedPost}
                user={user}
            />
        )}

    </div>
  )
}

export default Posts
