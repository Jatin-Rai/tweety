import React, { useState, useEffect } from 'react';
import Avatar from './Avatar';
import { useSelector } from 'react-redux';
import {
    useFollowUserMutation,
    useUnfollowUserMutation,
    useGetFollowersQuery
} from '../../redux/slices/firestoreApi';

const UserCard = ({ user }) => {
    const currentUser = useSelector(state => state.auth.user);
    const { data: followers, refetch, isLoading: isLoadingFollowers } = useGetFollowersQuery(user.id);
    const [isFollowed, setIsFollowed] = useState(false);
    const [followUser, { isLoading: isFollowing }] = useFollowUserMutation();
    const [unfollowUser, { isLoading: isUnfollowing }] = useUnfollowUserMutation();

    useEffect(() => {
        if (followers) {
            setIsFollowed(followers.some(follower => follower.userId === currentUser.uid));
        }
    }, [followers, currentUser]);

    const handleFollow = async () => {
        try {
            await followUser({
                userId: currentUser.uid,
                followId: user.id,
                followUsername: user.username,
                userUsername: currentUser.username
            }).unwrap();
            refetch();
        } catch (error) {
            console.error('Failed to follow user:', error);
        }
    };

    const handleUnfollow = async () => {
        try {
            await unfollowUser({ userId: currentUser.uid, followId: user.id }).unwrap();
            refetch();
        } catch (error) {
            console.error('Failed to unfollow user:', error);
        }
    };

    return (
        <div className='shadow bg-white w-2/3 p-5 rounded-lg z-0'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-3'>
                    <Avatar username={user.username} />
                    <span className='text-2xl font-semibold text-violet-600'>
                        {user.username}
                    </span>
                </div>
                <button
                    onClick={isFollowed ? handleUnfollow : handleFollow}
                    disabled={isLoadingFollowers || isFollowing || isUnfollowing}
                    className={`px-4 py-2 rounded-lg ${isFollowed ? 'bg-gray-500 text-white' : 'bg-violet-500 text-white'
                        } hover:shadow-md`}
                >
                    {isFollowed ? 'Following' : 'Follow'}
                </button>
            </div>
            <div className='mt-2 text-gray-600'>
                {user.email}
            </div>
        </div>
    );
};

export default UserCard;
