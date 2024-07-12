import React from 'react';
import { Navbar } from '../components';

const Layout = ({ children }) => {
    return (
        <main className="bg-gray-50 min-h-screen pb-10">
            <Navbar />
            <section className='w-full flex justify-center'>
            {children}
            </section>
        </main>
    )
};

export default Layout;