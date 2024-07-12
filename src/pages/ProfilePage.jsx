import React from 'react';
import Layout from './Layout';
import { useSelector } from 'react-redux';
import {
    useGetFollowersQuery,
    useGetFollowingQuery,
    useGetPostsByUserQuery
} from '../redux/slices/firestoreApi';
import { Avatar, Spinner, Tabs } from '../components/ui';

const ProfilePage = () => {
    const username = useSelector(state => state.auth.user?.username);
    const userId = useSelector(state => state.auth.user?.uid);

    const {
        data: posts,
        isLoading: postsLoading,
        isError: postsError
    } = useGetPostsByUserQuery(userId);
    const {
        data: followers,
        isLoading: followersLoading,
        error: followersError
    } = useGetFollowersQuery(userId);
    const {
        data: following,
        isLoading: followingLoading,
        error: followingError
    } = useGetFollowingQuery(userId);

    return (
        <Layout>
            <section className='w-full pt-28 flex flex-col items-center'>
                {postsLoading || followersLoading || followingLoading ? (
                    <Spinner />
                ) : (
                    <>
                        <div className='flex items-center mb-8'>
                            <Avatar username={username} />
                            <span className="text-violet-800 text-3xl font-semibold ml-5">
                                {username}
                            </span>
                        </div>
                        <Tabs posts={posts} username={username} followers={followers} following={following} />
                        {postsError && <p>Unable to load posts. {postsError.message}</p>}
                        {followersError && <p>Unable to load followers. {followersError.message}</p>}
                        {followingError && <p>Unable to load followings. {followingError.message}</p>}
                    </>
                )}
            </section>
        </Layout>
    );
};

export default ProfilePage;
