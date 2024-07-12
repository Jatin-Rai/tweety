import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authStateListener } from '../redux/slices/authSlice';

const useAuth = (redirectPath) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, user } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(authStateListener);
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            navigate(redirectPath);
        }
    }, [user, navigate, redirectPath]);

    return { loading, error, user };
};

export default useAuth;
