import React from 'react';

const TabButton = ({ label, count, isActive, onClick }) => {
    return (
        <button
            className={`py-2 px-4 ${isActive ? 'border-b-4 border-violet-800 text-violet-800 font-semibold' : 'text-gray-500'}`}
            onClick={onClick}
        >
            {label} <span className='text-sm'>({count})</span>
        </button>
    );
};

export default TabButton;
