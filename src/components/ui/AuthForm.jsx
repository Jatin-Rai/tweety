import React from 'react';
import Input from './Input';

const AuthForm = ({
    handleSubmit,
    signup,
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    buttonText,
    loadingText
}) => (
    <form onSubmit={handleSubmit} className="space-y-6">
        {signup && <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">Username</label>
            <div className="mt-2">
                <Input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
        </div>

        }
        <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email address</label>
            <div className="mt-2">
                <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
        </div>
        <div>
            <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">Password</label>
            </div>
            <div className="mt-2">
                <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
        </div>
        <div className='text-center'>
            <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white hover:bg-violet-700 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-violet-600"
            >
                {loading ? loadingText : buttonText}
            </button>
            {error && <span className='text-red-600 text-xs'>{error}</span>}
        </div>
    </form>
);

export default AuthForm;
