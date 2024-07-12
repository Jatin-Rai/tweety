import React, { useState } from 'react';
import { useEditPostMutation, useDeletePostMutation } from '../../redux/slices/firestoreApi';
import { useSelector } from 'react-redux';
import Avatar from './Avatar';
import { CiMenuKebab } from "react-icons/ci";
import { TiTick } from "react-icons/ti";


const Card = ({ data, profileUsername }) => {

    const { username, content, timestamp, userId } = data;
    
    const currentUser = useSelector(state => state.auth.user);
    
    const [editPost, { isLoading: isEditingPost }] = useEditPostMutation();
    const [deletePost, { isLoading: isDeletingPost }] = useDeletePostMutation();
    
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(content);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const displayUsername = username || profileUsername;

    const handleEdit = async () => {
        try {
            await editPost({ postId: data.id, content: editContent }).unwrap();
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to edit post:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await deletePost({ postId: data.id }).unwrap();
        } catch (error) {
            console.error('Failed to delete post:', error);
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className='relative shadow bg-white w-1/2 p-5 rounded-lg z-0'>
            <div className='flex items-center justify-between border-b border-gray-500'>
                {displayUsername && (
                    <div className='flex items-center space-x-2 pb-2'>
                        <Avatar username={displayUsername} />
                        <span className='text-2xl font-semibold text-violet-600'>
                            {displayUsername}
                        </span>
                    </div>
                )}
                <div className='flex gap-2'>
                    {timestamp && (
                        <div className='text-xs text-gray-600 italic'>
                            {new Date(timestamp.seconds * 1000).toLocaleString()}
                        </div>
                    )}
                    {currentUser.uid === userId && (
                        <CiMenuKebab
                            onClick={toggleDropdown}
                            className='cursor-pointer'
                        />
                    )}
                </div>
            </div>
            {isEditing ? (
                <div className='py-5 pr-8 pl-1'>
                    <textarea
                        className='w-full mt-3 p-2 border border-gray-400 rounded-lg outline-none resize-none'
                        rows={3}
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                    />
                    <div className='flex items-center justify-end'>
                        <button
                            onClick={handleEdit}
                            disabled={isEditingPost}
                            className='px-4 py-2 mt-2 bg-green-500 rounded-lg hover:shadow-md'
                        >
                            <TiTick className='text-white size-8' />
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className='px-4 py-2 mt-2 bg-gray-300 rounded-lg hover:shadow-md ml-2'
                        >
                            ❌
                        </button>
                    </div>
                </div>
            ) : (
                <div className='relative py-5 text-justify px-12 text-gray-800'>
                    {content}
                </div>
            )}
            {isDropdownOpen && (
                <div className='absolute right-0 top-12 flex flex-col space-y-4 mt-2 py-2 px-3 bg-white border border-violet-600 text-sm rounded shadow-lg z-50'>
                    <button
                        onClick={() => {
                            setIsEditing(true);
                            setIsDropdownOpen(false);
                        }}
                        className='hover:text-violet-600'
                    >
                        Edit
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={isDeletingPost}
                        className='hover:text-violet-600'
                    >
                        Delete
                    </button>
                </div>
            )}
            <div className='absolute w-8 h-16 bg-gradient-to-tr from-purple-500 via-violet-600 to-purple-700 right-0 bottom-4 rounded-l-full' />
        </div>
    );
};

export default Card;
