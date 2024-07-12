import React, { useEffect, useState } from 'react';

import Layout from './Layout';

import {
  useGetPostsQuery,
  useGetUsersQuery,
  useGetFollowingQuery
} from "../redux/slices/firestoreApi";
import { useSelector } from 'react-redux';

import Card from '../components/ui/Card';
import { Spinner } from '../components/ui';


const FeedsPage = () => {

  const currentUser = useSelector(state => state.auth.user);

  const {
    data: posts,
    isLoading: postsLoading,
    error: postsError
  } = useGetPostsQuery();
  
  const {
    data: users,
    isLoading: usersLoading,
    error: usersError
  } = useGetUsersQuery();
  
  const {
    data: following,
    isLoading: followingLoading,
    error: followingError
  } = useGetFollowingQuery(currentUser.uid);

  const [postsWithUsernames, setPostsWithUsernames] = useState([]);

  useEffect(() => {
    if (posts && users && following) {
      const userLookup = users.reduce((acc, user) => {
        acc[user.id] = user.username;
        return acc;
      }, {});

      const followingIds = following.map(f => f.userId);
      followingIds.push(currentUser.uid);

      const filteredPosts = posts.filter(post => followingIds.includes(post.userId));

      const updatedPostsWithUsernames = filteredPosts.map(post => ({
        ...post,
        username: userLookup[post.userId] || ''
      }));

      setPostsWithUsernames(updatedPostsWithUsernames);
    }
  }, [posts, users, following, currentUser.uid]);

  return (
    <Layout>
      <section className='pt-28 w-full'>
        {postsLoading || usersLoading || followingLoading
          ? <Spinner />
          : (
            <ul className='flex flex-col justify-center items-center gap-2'>
              {postsWithUsernames.map(post => (
                <Card key={post.id} data={post} />
              ))}
            </ul>
          )}
        {postsError && <p>{postsError.message}</p>}
        {usersError && <p>Error fetching users: {usersError.message}</p>}
        {followingError && <p>Error fetching following users: {followingError.message}</p>}
      </section>
    </Layout>
  );
};

export default FeedsPage;
