import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase';
import CommentCard from '../components/CommentCard';
import CommentForm from '../forms/CommentForm';

const CommentFeed = ({ 
    post,
    user,
    breakpoint,
    width,
    height
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

  return (
    <div className=''>
        <div
            className={`flex flex-col-reverse overflow-y-auto w-full`}
            style={{height: width > breakpoint ? height - 230 : height - 350}}
        >
            <div className='flex flex-col space-y-2 mb-2 mx-1 mr-3'>
                {comments[0] ? comments.map((comment, index) => {

                    const isSameAuthor = index > 0 && comment.author.uid === comments[index - 1].author.uid;
                    return (
                        <CommentCard
                            key={comment.id}
                            comment={comment}
                            user={user}
                            postAuthor={post.author}
                            isSameAuthor={isSameAuthor}
                        />
                    )
                })
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