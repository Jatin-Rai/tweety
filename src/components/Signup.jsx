import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signup } from '../redux/slices/authSlice';
import useAuth from '../hooks/useAuth';
import { AuthForm } from './ui';

const Signup = () => {
  const dispatch = useDispatch();
  const { loading, error } = useAuth("/profile");

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup({ username, email, password }));
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-center text-3xl font-bold">
          Welcome to <span className='text-violet-600'>Tweety</span>
        </h1>
        <h2 className="mt-10 text-center text-2xl font-semibold leading-9 text-gray-900">Create your account</h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <AuthForm
          handleSubmit={handleSubmit}
          signup
          username={username}
          setUsername={setUsername}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          error={error}
          loading={loading}
          buttonText="Sign up"
          loadingText="Signing up please wait..."
        />
        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/" className="font-semibold text-violet-600 hover:text-violet-700">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;