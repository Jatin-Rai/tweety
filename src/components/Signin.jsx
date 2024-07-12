import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signin } from '../redux/slices/authSlice';
import useAuth from '../hooks/useAuth';
import { AuthForm } from './ui';

const Signin = () => {
    const dispatch = useDispatch();
    const { loading, error } = useAuth("/feeds");

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signin({ email, password }));
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h1 className="text-center text-3xl font-bold">
                    Welcome to <span className='text-violet-600'>Tweety</span>
                </h1>
                <h2 className="mt-10 text-center text-2xl font-semibold leading-9 text-gray-900">Sign in to your account</h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <AuthForm
                    handleSubmit={handleSubmit}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    error={error}
                    loading={loading}
                    buttonText="Sign in"
                    loadingText="Signing in..."
                />
                <p className="mt-10 text-center text-sm text-gray-500">
                    Don&apos;t have an account?{" "}
                    <Link to="/signup" className="font-semibold text-violet-600 hover:text-violet-700">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Signin;