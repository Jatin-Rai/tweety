import React from 'react';

const Avatar = ({ username }) => {
    return (
        <div
            className='bg-violet-500 rounded-full w-10 h-10 text-center text-2xl text-white border-2 border-violet-600 flex items-center justify-center'
        >
            {username.charAt(0).toUpperCase()}
        </div>
    );
};

export default Avatar;
