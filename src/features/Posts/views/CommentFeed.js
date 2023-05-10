import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { db } from '../../../firebase';
import CommentCard from '../components/CommentCard';
import CommentForm from '../forms/CommentForm';
import { MdQuestionAnswer } from 'react-icons/md';

const CommentFeed = ({ 
    post,
    user,
    breakpoint,
    width,
    height,
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
    console.log(comments?.length)
    }, [comments])

  return (
    <div className={`w-full px-5 mt-20 `}>
        <div className='flex items-center mb-2 justify-center'>
            <div className='w-full border-b-2 border-black'/>
            <div className='flex items-center px-2'>
                <MdQuestionAnswer className='mr-2 text-2xl' />
                <h1 className='text-2xl font-semibold'>Discussion</h1>
            </div>
            <div className='w-full border-b-2 border-black'/>
        </div>
        <div
            className={`flex flex-col-reverse overflow-y-auto w-full scrollbar-hide`}
            style={{height: comments?.length < 5 ? 200 : 400}}
        >
            <div className='flex flex-col mb-2 mx-1 mr-3'>
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
                    <div className='text-gray-500 text-center text-xl'>
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