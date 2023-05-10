import React, { useRef, useState } from 'react';
import { db } from '../../../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatStrikethroughIcon from '@mui/icons-material/FormatStrikethrough';
import InsertLinkIcon from '@mui/icons-material/InsertLink';

const CommentForm = ({ user, postId }) => {
  const [format, setFormat] = useState(() => '');

  const handleFormat = (event, newFormat) => {
    setFormat(newFormat);

    const selectedText = window.getSelection().toString();
    const wrappedText = wrapSelectedText(newFormat, selectedText);

    if (wrappedText) {
      document.execCommand('insertHTML', false, wrappedText);
    }
  };

  const wrapSelectedText = (format, selectedText) => {
    switch (format) {
      case 'bold':
        return `<strong>${selectedText}</strong>`;
      case 'italic':
        return `<em>${selectedText}</em>`;
      case 'strikethrough':
        return `<s>${selectedText}</s>`;
      case 'link':
        return `<a href="${selectedText}">${selectedText}</a>`;
      default:
        return null;
    }
  };

  const commentRef = useRef(null);

  const handleSubmit = async () => {
    const comment = commentRef.current.innerHTML;

    if (comment.trim() === '') return;

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

    commentRef.current.innerHTML = '';
  };

  return (
    <>
      <div>
        <ToggleButtonGroup
          size="small"
          value={format}
          exclusive
          onChange={handleFormat}
          aria-label="text formatting"
        >
          <ToggleButton value="bold" aria-label="bold">
            <FormatBoldIcon />
          </ToggleButton>
          <ToggleButton value="italic" aria-label="italic">
            <FormatItalicIcon />
          </ToggleButton>
          <ToggleButton value="strikethrough" aria-label="strikethrough">
            <FormatStrikethroughIcon />
          </ToggleButton>
          <ToggleButton value="link" aria-label="link">
            <InsertLinkIcon />
          </ToggleButton>
        </ToggleButtonGroup>
        <div
          ref={commentRef}
          className="w-full p-2 mb-2 mt-1 border-2 border-gray-200 rounded-md outline-none resize-none focus:text-blue-500 focus:border-blue-500 focus:placeholder:text-blue-500 focus:placeholder:text-opacity-50"
          contentEditable
          placeholder="Add a comment..."
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
        ></div>
      </div>
    </>
  );
};

export default CommentForm;