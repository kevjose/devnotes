import React, { useState, useEffect } from 'react';
import useToogle from '../hooks/useToggle';
import {
  useResumeContext,
  SAVE_TO_LOCAL_STORAGE,
  INPUT_CHANGE,
  LOAD_FROM_LOCAL_STORAGE
} from '../contexts/ResumeContext';

const SearchFilters = () => {
  const [isOpen, setOpen] = useToogle(false);
  const [openTab, setOpenTab] = useState(1);

  const { state, dispatch } = useResumeContext();

  useEffect(() => {
    const localStoreResume = JSON.parse(localStorage.getItem('state'));
    dispatch({ type: LOAD_FROM_LOCAL_STORAGE, payload: localStoreResume });
  }, [dispatch]);

  const handleChange = (key, value) => {
    console.log(key, value);
    dispatch({
      type: INPUT_CHANGE,
      payload: {
        key,
        value
      }
    });

    dispatch({
      type: SAVE_TO_LOCAL_STORAGE
    });
  };

  const renderBaiscProfile = (data, path) => {
    return Object.keys(data).map(item => {
      if (typeof data[item] === 'object') {
        return (
          <React.Fragment key={`${path}.${item}`}>
            <label className='block px-3 py-3'>
              <div className='text-xl font-semibold text-gray-500 capitalize'>
                {item}
              </div>
              <hr />
            </label>
            {renderBaiscProfile(data[item], `${path}.${item}`)}
          </React.Fragment>
        );
      }
      return (
        <label className='block px-2 py-2' key={`${path}.${item}`}>
          <div className='text-sm font-semibold text-gray-500 py-1 capitalize'>
            {item}
          </div>
          <input
            className='px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full'
            type='text'
            onChange={e => handleChange(`${path}.${item}`, e.target.value)}
            value={data[item]}
          />
        </label>
      );
    });
  };
  return (
    <section className='bg-gray-800 xl:w-1/4 xl:h-full'>
      <div className='flex justify-between px-4 py-3 xl:hidden'>
        <div className='relative max-w-xs w-full'>
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
            className='block w-full bg-gray-900 focus:outline-none focus:bg-white focus:text-gray-900 text-white rounded-lg pl-10 pr-4 py-2'
            placeholder='Search by keywords'
          />
        </div>
        <button
          type='button'
          className={`ml-4 inline-flex items-center hover:bg-gray-600 focus:outline-none focus:shadow-outline rounded-lg shadow pl-3 pr-4 ${
            isOpen ? 'bg-gray-600' : 'bg-gray-700'
          }`}
          onClick={() => setOpen(o => !o)}
        >
          <svg
            className='h-6 w-6 fill-current text-gray-500'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M3 6a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm3 6a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1zm4 5a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-4z' />
          </svg>
          <span className='ml-1 text-white font-medium'>Edit</span>
        </button>
      </div>
      {/* Tabbed section start */}

      <div
        className={`xl:block w-full flex flex-col xl:h-full ${
          isOpen ? 'block' : 'hidden'
        } `}
      >
        <ul
          className='flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row px-3'
          role='tablist'
        >
          <li className='mr-2 flex-auto text-center'>
            <a
              className={
                'text-xs font-bold uppercase px-5 py-3 block leading-normal ' +
                (openTab === 1
                  ? 'text-white border-b border-white'
                  : 'text-gray-600')
              }
              onClick={e => {
                e.preventDefault();
                setOpenTab(1);
              }}
              data-toggle='tab'
              href='#link1'
              role='tablist'
            >
              Content
            </a>
          </li>
          <li className='mr-2 flex-auto text-center'>
            <a
              className={
                'text-xs font-bold uppercase px-5 py-3 block leading-normal ' +
                (openTab === 2
                  ? 'text-white border-b border-white'
                  : 'text-gray-600')
              }
              onClick={e => {
                e.preventDefault();
                setOpenTab(2);
              }}
              data-toggle='tab'
              href='#link2'
              role='tablist'
            >
              Settings
            </a>
          </li>
        </ul>
        {/* Tab 1 content */}
        <form
          className={` xl:flex-col xl:justify-between ${
            openTab === 1 ? 'xl:flex block' : 'hidden'
          } xl:pb-16 h-64 overflow-y-auto xl:h-full`}
        >
          <div className='lg:flex xl:block'>
            <div className='px-4 py-4 border-t border-gray-900 lg:w-1/3 border xl:w-full'>
              <h3 className='text-xl text-bold text-gray-500'>Basic profile</h3>
              <div className='flex flex-col flex-wrap'>
                {renderBaiscProfile(state.resume.basics, 'resume.basics')}
              </div>
            </div>
          </div>
          <div className='bg-gray-900 px-4 py-4 sm:text-right'>
            <button
              className={`block w-full sm:w-auto sm:inline-block bg-blue-800 hover:bg-blue-700 font-semibold text-white px-4 py-2 rounded-lg xl:block xl:w-full`}
            >
              Save
            </button>
          </div>
        </form>
      </div>
      {/* Tabbed section end */}
    </section>
  );
};

export default SearchFilters;