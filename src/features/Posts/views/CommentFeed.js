import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase';
import CommentCard from '../components/CommentCard';
import CommentForm from '../forms/CommentForm';

const CommentFeed = ({ 
    post,
    user
}) => {

    const [comments, setComments] = useState([]);

    useEffect(() => {

      const getComments = onSnapshot(
            query(
                collection(db, 'posts', post.id, 'comments'),
                orderBy('createdAt', 'asc')
            ),
          (snapshot) => {
            setComments(snapshot.docs.map(doc => ({
                  id: doc.id,
                  ...doc.data()
              })))
      },
      (error) => {
          console.log(error)
      })
      return () => {
          getComments()
      }
  }, [post])

  useEffect(() => {
    console.log('COMMENTS: ', comments)
  }, [comments])

  return (
    <div className=''>
        <div
            className='flex flex-col-reverse overflow-y-auto max-h-[400px] w-full'
        >
            <div className='flex flex-col space-y-2 mb-2 mx-1'>
                {comments[0] ? comments.map(comment => (
                    <CommentCard
                        key={comment.id}
                        comment={comment}
                        user={user}
                        postAuthor={post.author}
                    />
                ))
                : (
                    <div className='text-gray-500'>
                        No comments yet
                    </div>
                )
                }
            </div>
        </div>
        <CommentForm 
            user={user}
            postId={post.id}
        />
    </div>
  );
};

export default CommentFeed;