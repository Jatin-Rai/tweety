// Tabs.jsx
import React, { useState } from 'react';
import Card from './Card';
import TabButton from './TabButton';
import UserCard from './UserCard';

const Tabs = ({
    posts,
    username,
    followers,
    following
}) => {

    const [activeTab, setActiveTab] = useState('posts');

    const tabData = [
        { label: 'Posts', key: 'posts', count: posts?.length },
        { label: 'Followers', key: 'followers', count: followers?.length },
        { label: 'Following', key: 'following', count: following?.length }
    ];

    const renderContent = () => {
        if (activeTab === 'posts') {
            return (
                <ul className='flex flex-col justify-center items-center gap-2'>
                    {posts.length === 0 ? (
                        "No post available"
                    ) : (
                        posts.map(post => <Card key={post.id} data={post} profileUsername={username} />)
                    )}
                </ul>
            );
        } else if (activeTab === 'followers') {
            return (
                <ul className='flex flex-col justify-center items-center gap-2'>
                    {followers.length === 0 ? (
                        "You don't have any followers."
                    ) : (
                        followers.map(follower => <UserCard key={follower.userId} user={follower} />)
                    )}
                </ul>
            );
        } else if (activeTab === 'following') {
            return (
                <ul className='flex flex-col justify-center items-center gap-2'>
                    {following.length === 0 ? (
                        "You haven't followed anyone yet."
                    ) : (
                        following.map(follow => <UserCard key={follow.userId} user={follow} />)
                    )}
                </ul>
            );
        }
    };

    return (
        <div className="w-full max-w-2xl">
            <div className="flex justify-around border-b-2 border-gray-200 mb-8">
                {tabData.map(tab => (
                    <TabButton
                        key={tab.key}
                        label={tab.label}
                        count={tab.count}
                        isActive={activeTab === tab.key}
                        onClick={() => setActiveTab(tab.key)}
                    />
                ))}
            </div>
            {renderContent()}
        </div>
    );
};

export default Tabs;
