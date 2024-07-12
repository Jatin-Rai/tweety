import React from 'react';
import Layout from './Layout';
import { useGetUsersQuery } from '../redux/slices/firestoreApi';
import UserCard from '../components/ui/UserCard';
import { Spinner } from '../components/ui';
import { useSelector } from 'react-redux';

const PeoplePage = () => {
  const currentUser = useSelector(state => state.auth.user);

  const {
    data: users,
    isLoading: usersLoading,
    error: usersError
  } = useGetUsersQuery();

  const filteredUsers = users?.filter(user => user.id !== currentUser?.uid);

  return (
    <Layout>
      <div className='pt-28 w-2/3 flex flex-col items-center gap-2'>
        {usersLoading ? (
          <Spinner />
        ) : (
          filteredUsers.map(user => (
            <UserCard key={user.id} user={user} />
          ))
        )}
        {usersError && <p>{usersError.message}</p>}
      </div>
    </Layout>
  );
};

export default PeoplePage;
