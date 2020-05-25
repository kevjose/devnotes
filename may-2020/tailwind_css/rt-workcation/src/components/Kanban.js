import React from 'react';

const Kanban = () => {
  return (
    <div className='h-screen flex'>
      <div className='w-64 px-8 py-4 bg-gray-100 border-r overflow-auto'>
        <img
          src='https://cdn.onlinewebfonts.com/svg/img_424936.png'
          alt='logo'
          className='h-8 w-8'
        />
        <nav className='mt-8'>
          <h3 className='text-xs font-semibold text-gray-600 uppercase tracking-wide'>
            Issues
          </h3>
          <div className='mt-2 -mx-3'>
            <a
              href='#all'
              className='flex justify-between items-center px-3 py-2 bg-gray-200 rounded-lg'
            >
              <span className='text-sm font-medium text-gray-900'>All</span>
              <span className='text-xs font-semibold text-gray-700'>36</span>
            </a>
            <a
              href='#all'
              className='flex justify-between items-center px-3 py-2  rounded-lg'
            >
              <span className='text-sm font-medium text-gray-700'>
                Assigned to me
              </span>
              <span className='text-xs font-semibold text-gray-700'>2</span>
            </a>
            <a
              href='#all'
              className='flex justify-between items-center px-3 py-2  rounded-lg'
            >
              <span className='text-sm font-medium text-gray-700'>
                Created by me
              </span>
              <span className='text-xs font-semibold text-gray-700'>1</span>
            </a>
            <a
              href='#all'
              className='flex justify-between items-center px-3 py-2  rounded-lg'
            >
              <span className='text-sm font-medium text-gray-700'>
                Archived
              </span>
            </a>
          </div>

          <h3 className='mt-8 text-xs font-semibold text-gray-600 uppercase tracking-wide'>
            Tags
          </h3>
          <div className='mt-2 -mx-3'>
            <a
              href='#all'
              className='flex justify-between items-center px-3 py-2 rounded-lg'
            >
              <span className='text-sm font-medium text-gray-700'>Bug</span>
            </a>
            <a
              href='#all'
              className='flex justify-between items-center px-3 py-2  rounded-lg'
            >
              <span className='text-sm font-medium text-gray-700'>
                Feature request
              </span>
            </a>
            <a
              href='#all'
              className='flex justify-between items-center px-3 py-2  rounded-lg'
            >
              <span className='text-sm font-medium text-gray-700'>
                Marketing
              </span>
            </a>
            <a
              href='#all'
              className='flex justify-between items-center px-3 py-2  rounded-lg'
            >
              <span className='text-sm font-medium text-gray-700'>v2.0</span>
            </a>
            <a
              href='#all'
              className='flex justify-between items-center px-3 py-2 rounded-lg'
            >
              <span className='text-sm font-medium text-gray-900'>
                Enhancement
              </span>
            </a>
            <a
              href='#all'
              className='flex justify-between items-center px-3 py-2  rounded-lg'
            >
              <span className='text-sm font-medium text-gray-700'>Design</span>
            </a>
          </div>
          <button className='mt-2 -ml-1 flex items-center text-sm font-medium text-gray-600'>
            <span
              className='material-icons text-gray-500'
              aria-label='add'
              role='img'
            >
              add
            </span>
            <span className='ml-1'>New Project</span>
          </button>
        </nav>
      </div>
      <div className='flex-1 min-w-0 bg-white flex flex-col'>
        <div className='flex-shrink-0 border-b-2 border-gray-200'>
          <header className='px-6'>
            <div className='flex justify-between items-center border-b border-gray-200 py-3'>
              <div>
                <div className='relative'>
                  <span
                    role='img'
                    className='material-icons text-gray-600 absolute inset-y-0 left-0 flex items-center pl-3'
                  >
                    search
                  </span>
                  <input
                    className='rounded-md border border-gray-400 pl-10 pr-4 py-2 text-sm text-gray-900 placeholder-gray-600 w-64'
                    placeholder='Search'
                  />
                </div>
              </div>

              <div className='flex items-center'>
                <button>
                  <span role='img' className='material-icons text-gray-500'>
                    notification_important
                  </span>
                </button>
                <button className='ml-6'>
                  <img
                    className='h-8 w-8 rounded-full object-cover'
                    src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                    alt='profile pic'
                  />
                </button>
              </div>
            </div>

            <div className='flex items-center justify-between py-2'>
              <div className='flex items-center'>
                <h2 className='text-2xl font-semibold text-gray-900 leading-tight'>
                  All Issues
                </h2>
                <div className='ml-6 flex items-center'>
                  <span className='rounded-full border-2 border-white'>
                    <img
                      className='h-6 w-6 rounded-full object-cover'
                      src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                      alt='profile pic'
                    />
                  </span>
                  <span className='-ml-2 rounded-full border-2 border-white'>
                    <img
                      className='h-6 w-6 rounded-full object-cover'
                      src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                      alt='profile pic'
                    />
                  </span>
                  <span className='-ml-2 rounded-full border-2 border-white'>
                    <img
                      className='h-6 w-6 rounded-full object-cover'
                      src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                      alt='profile pic'
                    />
                  </span>
                  <span className='-ml-2 rounded-full border-2 border-white'>
                    <img
                      className='h-6 w-6 rounded-full object-cover'
                      src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                      alt='profile pic'
                    />
                  </span>
                </div>
              </div>
              <div className='flex'>
                <span className='inline-flex p-1 border bg-gray-200 rounded-md'>
                  <button className='px-2 py-1 rounded'>
                    <span role='img' className='material-icons text-gray-600'>
                      view_headline
                    </span>
                  </button>
                  <button className='px-2 py-1 rounded bg-white shadow'>
                    <span role='img' className='material-icons text-gray-600'>
                      view_column
                    </span>
                  </button>
                </span>
                <button className='ml-5 flex items-center pl-2 pr-4  text-sm font-medium text-white bg-gray-800 rounded-md px-3 py-2 hover:bg-gray-700'>
                  <span
                    className='material-icons text-gray-500'
                    aria-label='add'
                    role='img'
                  >
                    add
                  </span>
                  <span className='ml-1'>New Issue</span>
                </button>
              </div>
            </div>
          </header>
        </div>

        <div className='flex-1 overflow-auto'>
          <main className='p-3 inline-flex'>
            <div className='flex-shrink-0 p-3 w-64 bg-gray-100 rounded-md'>
              <h3 className='text-sm font-medium text-gray-900'>Backlog</h3>
              <ul className='mt-2'>
                <li>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>

                <li className='mt-3'>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>

                <li className='mt-3'>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>

                <li className='mt-3'>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>

                <li className='mt-3'>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>

            <div className='ml-3 flex-shrink-0 p-3 w-64 bg-gray-100 rounded-md'>
              <h3 className='text-sm font-medium text-gray-900'>Backlog</h3>
              <ul className='mt-2'>
                <li>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>

                <li className='mt-3'>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>

                <li className='mt-3'>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>

                <li className='mt-3'>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>

                <li className='mt-3'>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>

                <li className='mt-3'>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>

                <li className='mt-3'>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>

                <li className='mt-3'>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>

                <li className='mt-3'>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>

            <div className='ml-3 flex-shrink-0 p-3 w-64 bg-gray-100 rounded-md'>
              <h3 className='text-sm font-medium text-gray-900'>Backlog</h3>
              <ul className='mt-2'>
                <li>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>

                <li className='mt-3'>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>

                <li className='mt-3'>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>

                <li className='mt-3'>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>

                <li className='mt-3'>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>

            <div className='ml-3 flex-shrink-0 p-3 w-64 bg-gray-100 rounded-md'>
              <h3 className='text-sm font-medium text-gray-900'>Backlog</h3>
              <ul className='mt-2'>
                <li>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>

                <li className='mt-3'>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>

                <li className='mt-3'>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>

                <li className='mt-3'>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>

                <li className='mt-3'>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>

            <div className='ml-3 flex-shrink-0 p-3 w-64 bg-gray-100 rounded-md'>
              <h3 className='text-sm font-medium text-gray-900'>Backlog</h3>
              <ul className='mt-2'>
                <li>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>

                <li className='mt-3'>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>

                <li className='mt-3'>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>

                <li className='mt-3'>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>

                <li className='mt-3'>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>

            <div className='ml-3 flex-shrink-0 p-3 w-64 bg-gray-100 rounded-md'>
              <h3 className='text-sm font-medium text-gray-900'>Backlog</h3>
              <ul className='mt-2'>
                <li>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>

                <li className='mt-3'>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>

                <li className='mt-3'>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>

                <li className='mt-3'>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>

                <li className='mt-3'>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>

            <div className='ml-3 flex-shrink-0 p-3 w-64 bg-gray-100 rounded-md'>
              <h3 className='text-sm font-medium text-gray-900'>Backlog</h3>
              <ul className='mt-2'>
                <li>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>

                <li className='mt-3'>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>

                <li className='mt-3'>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>

                <li className='mt-3'>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>

                <li className='mt-3'>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>

            <div className='ml-3 flex-shrink-0 p-3 w-64 bg-gray-100 rounded-md'>
              <h3 className='text-sm font-medium text-gray-900'>Backlog</h3>
              <ul className='mt-2'>
                <li>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>

                <li className='mt-3'>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>

                <li className='mt-3'>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>

                <li className='mt-3'>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>

                <li className='mt-3'>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>

            <div className='ml-3 flex-shrink-0 p-3 w-64 bg-gray-100 rounded-md'>
              <h3 className='text-sm font-medium text-gray-900'>Backlog</h3>
              <ul className='mt-2'>
                <li>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>

                <li className='mt-3'>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>

                <li className='mt-3'>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>

                <li className='mt-3'>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>

                <li className='mt-3'>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>

            <div className='ml-3 flex-shrink-0 p-3 w-64 bg-gray-100 rounded-md'>
              <h3 className='text-sm font-medium text-gray-900'>Backlog</h3>
              <ul className='mt-2'>
                <li>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>

                <li className='mt-3'>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>

                <li className='mt-3'>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>

                <li className='mt-3'>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>

                <li className='mt-3'>
                  <a
                    href='#issue'
                    className='block rounded-md shadow bg-white p-5'
                  >
                    <div className='flex justify-between'>
                      <p className='text-sm font-medium text-gray-900 leading-snug'>
                        Add discount code to checkout page
                      </p>
                      <span>
                        <img
                          className='h-6 w-6 rounded-full object-cover m-1'
                          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80'
                          alt='profile pic'
                        />
                      </span>
                    </div>
                    <div className='flex justify-between items-baseline'>
                      <div className='text-sm text-gray-600'>
                        <time dateTime='2019-09-14'>Sep 14</time>
                      </div>
                      <div className='mt-2'>
                        <span className='bg-teal-100 inline-flex items-center rounded px-2 py-1 leading-tight'>
                          <svg
                            className='h-2 w-2 text-teal-500'
                            viewBox='0 0 8 8'
                            fill='currentColor'
                          >
                            <circle cx='4' cy='4' r='3' />
                          </svg>
                          <span className='ml-2 text-sm font-medium text-teal-900'>
                            Feature request
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Kanban;
