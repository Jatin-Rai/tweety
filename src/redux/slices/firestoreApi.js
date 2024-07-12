import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { collection, getDocs, query, orderBy, where, Timestamp, setDoc, doc, deleteDoc, getDoc, updateDoc, addDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase';

export const firestoreApi = createApi({
    reducerPath: 'firestoreApi',
    baseQuery: fetchBaseQuery({}),
    endpoints: (builder) => ({
        createPost: builder.mutation({
            async queryFn({ userId, content }) {
                try {
                    const newPost = {
                        userId,
                        content,
                        timestamp: Timestamp.now(),
                    };
                    const docRef = await addDoc(collection(db, 'posts'), newPost);
                    return { data: { id: docRef.id, ...newPost } };
                } catch (error) {
                    return { error };
                }
            },
            invalidatesTags: ['Posts'],
        }),

        getPosts: builder.query({
            async queryFn() {
                try {
                    const postsQuery = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
                    const querySnapshot = await getDocs(postsQuery);
                    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    return { data };
                } catch (error) {
                    return { error };
                }
            },
            providesTags: ['Posts'],
        }),

        getPostsByUser: builder.query({
            async queryFn(userId) {
                try {
                    const userPostsQuery = query(
                        collection(db, 'posts'),
                        where('userId', '==', userId),
                        orderBy('timestamp', 'desc')
                    );
                    const querySnapshot = await getDocs(userPostsQuery);
                    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    return { data };
                } catch (error) {
                    return { error };
                }
            },
            providesTags: (userId) => [{ type: 'Posts', id: userId }],
        }),

        editPost: builder.mutation({
            async queryFn({ postId, content }) {
                try {
                    const postRef = doc(db, 'posts', postId);
                    await updateDoc(postRef, { content, timestamp: Timestamp.now() });
                    return { data: { success: true } };
                } catch (error) {
                    return { error };
                }
            },
            invalidatesTags: ['Posts'],
        }),

        deletePost: builder.mutation({
            async queryFn({ postId }) {
                try {
                    const postRef = doc(db, 'posts', postId);
                    await deleteDoc(postRef);
                    return { data: { success: true } };
                } catch (error) {
                    return { error };
                }
            },
            invalidatesTags: ['Posts'],
        }),


        getUsers: builder.query({
            async queryFn() {
                try {
                    const querySnapshot = await getDocs(collection(db, 'users'));
                    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    return { data };
                } catch (error) {
                    return { error };
                }
            },
            providesTags: ['Users'],
        }),

        getFollowers: builder.query({
            async queryFn(userId) {
                try {
                    const followersQuery = query(collection(db, 'users', userId, 'followers'));
                    const querySnapshot = await getDocs(followersQuery);
                    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    return { data };
                } catch (error) {
                    return { error };
                }
            },
            providesTags: (userId) => [{ type: 'Followers', id: userId }],
        }),

        getFollowing: builder.query({
            async queryFn(userId) {
                try {
                    const followingQuery = query(collection(db, 'users', userId, 'following'));
                    const querySnapshot = await getDocs(followingQuery);
                    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    return { data };
                } catch (error) {
                    return { error };
                }
            },
            providesTags: (userId) => [{ type: 'Following', id: userId }],
        }),

        followUser: builder.mutation({
            async queryFn({ userId, followId }) {
                try {
                    const userDoc = await getDoc(doc(db, 'users', userId));
                    const followDoc = await getDoc(doc(db, 'users', followId));

                    if (!userDoc.exists() || !followDoc.exists()) {
                        throw new Error("User not found");
                    }

                    const userUsername = userDoc.data().username;
                    const followUsername = followDoc.data().username;

                    const userRef = doc(db, 'users', userId, 'following', followId);
                    const followRef = doc(db, 'users', followId, 'followers', userId);

                    await setDoc(userRef, { userId: followId, username: followUsername, timestamp: Timestamp.now() });

                    await setDoc(followRef, { userId, username: userUsername, timestamp: Timestamp.now() });

                    return { data: { success: true } };
                } catch (error) {
                    return { error };
                }
            },
            invalidatesTags: ({ userId, followId }) => [
                { type: 'Following', id: userId },
                { type: 'Followers', id: followId },
            ],
        }),

        unfollowUser: builder.mutation({
            async queryFn({ userId, followId }) {
                try {
                    const userRef = doc(db, 'users', userId, 'following', followId);
                    const followRef = doc(db, 'users', followId, 'followers', userId);

                    await deleteDoc(userRef);
                    await deleteDoc(followRef);

                    return { data: { success: true } };
                } catch (error) {
                    return { error };
                }
            },
            invalidatesTags: ({ userId, followId }) => [
                { type: 'Following', id: userId },
                { type: 'Followers', id: followId },
            ],
        }),
    }),
});

export const {
    useGetPostsQuery,
    useGetUsersQuery,
    useGetPostsByUserQuery,
    useCreatePostMutation,
    useEditPostMutation,
    useDeletePostMutation,
    useGetFollowersQuery,
    useGetFollowingQuery,
    useFollowUserMutation,
    useUnfollowUserMutation,
} = firestoreApi;
