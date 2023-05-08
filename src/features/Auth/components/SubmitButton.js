import React from 'react';

const SubmitButton = ({ userAuthAttempt, onSubmit }) => {
  return (
    <button
        onClick={onSubmit}
      className={`
        border-blue-500 border-2 py-0.5 rounded-2xl text-blue-500 font-bold text-xl
         hover:text-white hover:bg-blue-500
        ${(userAuthAttempt.emailValidated && (userAuthAttempt.continued ? userAuthAttempt.passwordValidated : true)) ? 'opacity-100 h-full' : 'opacity-0 h-0'}
        transition-all duration-300 ease-in-out
      `}
    >
      Continue
    </button>
  );
};

export default SubmitButton;