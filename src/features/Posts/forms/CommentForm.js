import React, { useRef, useState } from 'react';
import { db } from '../../../firebase'; // Import the Firestore instance
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'; // Import Firestore functions

const CommentForm = ({ user, postId }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = async () => {
    if (comment.trim() === '') return; // Do nothing if the comment is empty

    const commentData = {
      author: {
        email: user.email,
        uid: user.uid,
        displayName: user.displayName,
      },
      body: comment,
      createdAt: serverTimestamp(),
    };
    try {
      const commentsRef = collection(db, 'posts', postId, 'comments');
      
      await addDoc(commentsRef, commentData);
    } catch (error) {
      console.error('Error adding comment: ', error);
    }

    setComment('');
    ref.current.value = '';
    ref.current.blur();
  };

  const ref = useRef(null);

  return (
    <div>
      <textarea
        className={`
                w-full border-2 border-gray-300 rounded-lg p-2 resize-none empty:h-[45px] h-[100px]
                duration-300 ease-out focus:outline-none hover:border-blue-500 hover:placeholder-blue-500
                focus:text-blue-500 focus:border-blue-500 focus:placeholder-blue-500 focus:h-[100px] overflow-hidden
            `}
        ref={ref}
        placeholder='Write a comment..'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit();
          }
        }}
      />
    </div>
  );
};

export default CommentForm;