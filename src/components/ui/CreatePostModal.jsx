import React, { useState } from 'react';
import { useCreatePostMutation } from '../../redux/slices/firestoreApi';
import { useSelector } from 'react-redux';
import { MdClose } from 'react-icons/md';

const CreatePostModal = ({ onClose }) => {
    const { user } = useSelector(state => state.auth);
    const [createPost, { isLoading, isError }] = useCreatePostMutation();

    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (user) {
            await createPost({ userId: user.uid, content });
            setContent('');
            onClose();
        } else {
            return <p className='text-sm text-red-600'>Please login to create your post.</p>
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg w-full max-w-md p-6">
                <div className='flex justify-between'>
                    <h2 className="text-xl font-bold mb-4">Create Post</h2>
                    <MdClose className='size-6 hover:text-gray-400 cursor-pointer' onClick={onClose} />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <textarea
                            id="content"
                            name="content"
                            type="text"
                            placeholder="What's on your mind?"
                            rows={5}
                            required
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:border-violet-500"
                        />
                    </div>
                    <>
                        <button
                            type="submit"
                            className="w-full bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-md"
                        >
                            {isLoading ? 'Posting...' : 'Post'}
                        </button>
                    </>
                    {isError && (
                        <p className="text-red-500 text-sm mt-2">Error posting. Please try again.</p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default CreatePostModal;
