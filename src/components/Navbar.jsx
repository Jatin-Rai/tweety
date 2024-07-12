import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { signout } from '../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { MdArrowDropDown, MdEdit } from 'react-icons/md';
import { Avatar, CreatePostModal } from './ui';
import { links } from '../constants/links';

const Navbar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const username = useSelector(state => state.auth.user?.username);

  const { clearUser } = useSelector(state => state.auth);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleSignout = () => {
    dispatch(signout());
    dispatch(clearUser());
    navigate('/');
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <nav className='fixed w-full bg-white flex items-center justify-between px-40 py-6 shadow z-50'>
      <Link to="/feeds" className='text-2xl font-semibold text-violet-600'>Tweety</Link>
      <div>
        <button
          className='flex items-center text-violet-600 border-2 border-violet-600 py-2 px-4 rounded-lg italic font-mono font-semibold hover:bg-violet-600 hover:text-white hover:shadow cursor-pointer'
          onClick={toggleModal}
        >
          Write
          <MdEdit className='size-6' />
        </button>
      </div>
      <ul className='flex items-center space-x-8'>
        {links.map(({ id, title, to }) => (
          <li key={id} className='font-semibold'>
            <NavLink
              to={to}
              className={({ isActive }) =>
                isActive ? 'text-violet-600' : ''
              }
            >
              {title}
            </NavLink>
          </li>
        ))}
        <div
          className='relative inline-flex items-center gap-2 font-semibold cursor-pointer'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Avatar username={username} />
          {username}
          <MdArrowDropDown />
          <>
            {isHovered && (
              <div className='absolute right-0 top-8 flex flex-col space-y-4 mt-2 py-2 px-3 bg-white border border-violet-600 text-sm rounded shadow-lg'>
                <Link to="/profile" className='hover:text-violet-600'>Profile</Link>
                <button
                  onClick={handleSignout}
                  className='hover:text-violet-600'
                >
                  Logout
                </button>
              </div>
            )}
          </>
        </div>
      </ul>
      {isModalOpen && <CreatePostModal onClose={toggleModal} />}
    </nav>
  );
};

export default Navbar;
