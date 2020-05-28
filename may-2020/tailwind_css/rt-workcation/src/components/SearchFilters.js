import React, { useState, useEffect } from 'react';
import useToogle from '../hooks/useToggle';
import {
  useResumeContext,
  SAVE_TO_LOCAL_STORAGE,
  INPUT_CHANGE,
  LOAD_FROM_LOCAL_STORAGE,
  ADD_ITEM,
  REMOVE_ITEM
} from '../contexts/ResumeContext';

const SearchFilters = () => {
  const [isOpen, setOpen] = useToogle(false);
  const [showBasicProfile, setShowBasicProfile] = useToogle(false);
  const [showWork, setShowWork] = useToogle(true);
  const [openTab, setOpenTab] = useState(1);

  const { state, dispatch } = useResumeContext();

  useEffect(() => {
    localStorage.removeItem('state');
    const localStoreResume = JSON.parse(localStorage.getItem('state-1'));
    dispatch({ type: LOAD_FROM_LOCAL_STORAGE, payload: localStoreResume });
  }, [dispatch]);

  const handleChange = (key, value) => {
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

  const handleAddItem = (key, value) => {
    dispatch({
      type: ADD_ITEM,
      payload: {
        key,
        value
      }
    });

    dispatch({
      type: SAVE_TO_LOCAL_STORAGE
    });
  };

  const handleRemoveItem = (key, value) => {
    dispatch({
      type: REMOVE_ITEM,
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
    if (Array.isArray(data) && typeof data[0] == 'object') {
      const addBlock = data[0];
      return (
        <React.Fragment>
          {data.map((item, index) => {
            if (typeof item === 'object')
              return (
                <React.Fragment key={`${path}.${index}`}>
                  <div className='border border-gray-600 mx-2 mb-2 rounded'>
                    <p className='px-2 pt-2 text-gray-200 font-semibold text-xs flex justify-between'>
                      {index + 1}.{' '}
                      <span
                        className='material-icons text-xl text-red-500 cursor-pointer'
                        onClick={() => handleRemoveItem(path, item)}
                      >
                        remove_circle
                      </span>
                    </p>
                    {renderBaiscProfile(item, `${path}.${index}`)}
                  </div>
                </React.Fragment>
              );
            else return null;
          })}
          <button
            className='text-gray-100 bg-transparent border border-solid border-gray-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mx-2 my-2'
            type='button'
            onClick={() => handleAddItem(path, addBlock)}
          >
            Add
          </button>
        </React.Fragment>
      );
    }
    return Object.keys(data).map(item => {
      if (typeof data[item] === 'object') {
        return (
          <React.Fragment key={`${path}.${item}`}>
            <label className='block px-3 py-3'>
              <div className='text-sm font-semibold text-gray-500 capitalize'>
                {item}
              </div>
              <hr className='border-gray-600' />
            </label>
            {renderBaiscProfile(data[item], `${path}.${item}`)}
          </React.Fragment>
        );
      }
      return (
        <label className='block px-2 py-2' key={`${path}.${item}`}>
          <div className='text-xs font-semibold text-gray-500 py-1 capitalize'>
            {item}
          </div>
          <input
            className='px-1 py-1 leading-loose placeholder-gray-400 text-white relative bg-gray-700 rounded text-xs shadow outline-none focus:outline-none w-full'
            type='text'
            onChange={e => handleChange(`${path}.${item}`, e.target.value)}
            value={data[item]}
          />
        </label>
      );
    });
  };
  return (
    <section className='bg-gray-800 xl:w-1/4 xl:h-full xl:flex-shrink-0'>
      <div className='flex justify-end px-4 py-3 xl:hidden'>
        {/* <div className='relative max-w-xs w-full'>
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
        </div> */}
        <button
          type='button'
          className={`ml-4 inline-flex items-center hover:bg-gray-600 focus:outline-none focus:shadow-outline rounded shadow pl-3 pr-4 py-2 ${
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
              <h3
                className='text-sm text-bold text-gray-500 cursor-pointer select-none'
                onClick={() => setShowBasicProfile(o => !o)}
              >
                {showBasicProfile ? <>&#8595;</> : <>&#8594;</>} &nbsp; Basic
                profile
              </h3>
              <div className='flex flex-col flex-wrap'>
                {showBasicProfile &&
                  renderBaiscProfile(state.resume.basics, 'resume.basics')}
              </div>
            </div>

            <div className='px-4 py-4 border-t border-gray-900 lg:w-1/3 border xl:w-full'>
              <h3
                className='text-sm text-bold text-gray-500 cursor-pointer select-none'
                onClick={() => setShowWork(o => !o)}
              >
                {showWork ? <>&#8595;</> : <>&#8594;</>} &nbsp; Work Experience
              </h3>
              <div className='flex flex-col flex-wrap'>
                {showWork &&
                  renderBaiscProfile(state.resume.work, 'resume.work')}
              </div>
            </div>
          </div>
        </form>
      </div>
      {/* Tabbed section end */}
    </section>
  );
};

export default SearchFilters;
