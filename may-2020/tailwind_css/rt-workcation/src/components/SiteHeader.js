import React, { useState } from 'react';
import { Dropdown, DropdownButton } from './Dropdown';
import useToogle from '../hooks/useToggle';

const SiteHeader = () => {
  const [isOpen, toggleOpen] = useToogle(false);
  const [isAccountOpen, toggleAccountOpen] = useToogle(false);
  const [focused, setFocus] = useState(false);

  return (
    <header className='bg-gray-900 sm:flex sm:items-center sm:justify-between xl:bg-white'>
      <div className='flex justify-between px-4 py-3 xl:w-64 xl:bg-gray-900 xl:justify-center xl:py-5'>
        <div>
          <svg
            className='h-8 w-auto'
            viewBox='0 0 185 32'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          ></svg>
        </div>

        <div className='flex sm:hidden'>
          <button
            onClick={toggleOpen}
            type='button'
            className='px-2 text-gray-500 hover:text-white focus:outline-none focus:text-white'
          >
            <svg
              className='h-6 w-6 fill-current'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
            >
              {!isOpen ? (
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z'
                />
              ) : (
                <path
                  fillRule='evenodd'
                  d='M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z'
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      <nav
        className={`sm:flex sm:items-center sm:px-4 xl:flex-1 xl:justify-between ${
          isOpen ? 'hidden' : 'block'
        }`}
      >
        <div className='hidden xl:block xl:relative xl:max-w-xs xl:w-full'>
          <div className='absolute inset-y-0 left-0 flex items-center pl-3'>
            <svg
              className='h-6 w-6 fill-current text-gray-600'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M16.32 14.9l1.1 1.1c.4-.02.83.13 1.14.44l3 3a1.5 1.5 0 0 1-2.12 2.12l-3-3a1.5 1.5 0 0 1-.44-1.14l-1.1-1.1a8 8 0 1 1 1.41-1.41l.01-.01zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z' />
            </svg>
          </div>
          <input
            className='block w-full border border-transparent bg-gray-200 focus:outline-non focus:bg-white focus:border-gray-300 text-gray-900 rounded-lg pl-10 pr-4 py-2'
            placeholder='Search by keywords'
          />
        </div>

        <div className='sm:flex sm:items-center'>
          <div className='px-2 pt-2 pb-5 border-b border-gray-800 sm:flex sm:border-b-0 sm:py-0 sm:px-0'>
            <a
              href='team'
              className='block px-3 py-1 rounded font-semibold text-white hover:bg-gray-800 sm:text-sm sm:px-2 xl:text-gray-900 xl:hover:bg-gray-200'
            >
              Team
            </a>
            <a
              href='#projects'
              className='mt-1 block px-3 py-1 rounded font-semibold text-white hover:bg-gray-800 sm:mt-0 sm:text-sm sm:px-2 sm:ml-2 xl:text-gray-900 xl:hover:bg-gray-200'
            >
              Projects
            </a>
            <a
              href='#messages'
              className='mt-1 block px-3 py-1 rounded font-semibold text-white hover:bg-gray-800 sm:mt-0 sm:text-sm sm:px-2 sm:ml-2 xl:text-gray-900 xl:hover:bg-gray-200'
            >
              Messages
            </a>
          </div>
          <div className='relative px-5 py-5 sm:py-0 sm:ml-4 sm:px-0'>
            <div className='flex items-center sm:hidden'>
              <img
                className='h-10 w-10 object-cover rounded-full border-2 border-gray-600'
                src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80'
                alt=''
              />
              <span className='ml-4 font-semibold text-gray-200 sm:hidden'>
                Jane doe
              </span>
            </div>

            <div className='mt-5 sm:hidden'>
              <a
                href='#account'
                className='block text-gray-400 hover:text-white'
              >
                Account settings
              </a>
              <a
                href='#support'
                className=' mt-3 block text-gray-400 hover:text-white'
              >
                Support
              </a>
              <a
                href='#sign-out'
                className='mt-3 block text-gray-400 hover:text-white'
              >
                Sign out
              </a>
            </div>
            <div className='hidden sm:block'>
              <DropdownButton
                toggleAccountOpen={toggleAccountOpen}
                setFocus={setFocus}
              >
                <span
                  className={`block h-8 w-8 overflow-hidden rounded-full border-2 ${
                    focused || isOpen
                      ? 'border-white xl:border-indigo-500'
                      : 'border-gray-600 xl:border-gray-300'
                  }`}
                >
                  <img
                    className='h-full w-full object-cover'
                    src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80'
                    alt=''
                  />
                </span>
              </DropdownButton>
              <Dropdown
                isAccountOpen={isAccountOpen}
                toggleAccountOpen={toggleAccountOpen}
              >
                <a
                  href='#account'
                  className='block hover:text-white text-gray-800 px-4 py-2 hover:bg-indigo-500'
                >
                  Account settings
                </a>
                <a
                  href='#support'
                  className='block hover:text-white text-gray-800 mt-0 px-4 py-2 hover:bg-indigo-500'
                >
                  Support
                </a>
                <a
                  href='#sign-out'
                  className='block hover:text-white text-gray-800 mt-0 px-4 py-2 hover:bg-indigo-500'
                >
                  Sign out
                </a>
              </Dropdown>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default SiteHeader;
