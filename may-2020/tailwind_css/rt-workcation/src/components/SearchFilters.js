import React from 'react';
import useToogle from '../hooks/useToggle';
import Checkbox from './Checkbox';
import Radio from './Radio';

const SearchFilters = () => {
  const [isOpen, setOpen] = useToogle(false);

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
          <span className='ml-1 text-white font-medium'>Filters</span>
        </button>
      </div>
      <form
        className={`xl:block xl:h-full xl:flex xl:flex-col xl:justify-between ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        {/* Have a container that is scrollable along y axis if filters increase  also to justify content */}
        <div className='lg:flex xl:block xl:overflow-y-auto'>
          {/* Container for form elements providing padding border etc. also group a few filters*/}
          <div className='px-4 py-4 border-t border-gray-900 lg:w-1/3 border xl:w-full'>
            <div className='-mx-2 flex flex-wrap'>
              <label className='block w-1/2 px-2 sm:w-1/4 lg:w-1/2'>
                <span className='text-sm font-semibold text-gray-500'>
                  Title
                </span>
                <select className='mt-1 block w-full focus:text-white text-gray-900 shadow focus:bg-gray-600 h-8 outline-none'>
                  <option></option>
                  <option>4</option>
                </select>
              </label>
              <label className='block w-1/2 px-2 sm:w-1/4 lg:w-1/2'>
                <span className='text-sm font-semibold text-gray-500'>
                  Title
                </span>
                <select className='mt-1 block w-full focus:text-white text-gray-900 shadow focus:bg-gray-600 h-8 outline-none'>
                  <option></option>
                  <option>2</option>
                  <option>3</option>
                </select>
              </label>
              <label className='mt-4 lg:mt-4 sm:mt-0 block w-full px-2 sm:w-1/2 lg:w-full'>
                <span className='text-sm font-semibold text-gray-500'>
                  Title
                </span>
                <select className='mt-1 block w-full focus:text-white text-gray-900 shadow focus:bg-gray-600 h-8 outline-none'>
                  <option></option>
                  <option>Up to $2,000/wk</option>
                </select>
              </label>
            </div>
          </div>
          <div className='px-4 py-4 border-t border-gray-900 lg:w-1/3 border xl:w-full'>
            <span className='block text-sm font-semibold text-gray-500'>
              Property name
            </span>
            <div className='sm:flex sm:-mx-2 lg:block lg:mx-0'>
              <Radio
                content={'A'}
                value={'a'}
                name={'propertyType'}
                color='white'
                background='gray'
              />
              <Radio
                content={'B'}
                value={'b'}
                name={'propertyType'}
                color='white'
                background='gray'
              />
              <Radio
                content={'C'}
                value={'c'}
                name={'propertyType'}
                color='white'
                background='gray'
              />
              <Radio
                content={'D'}
                value={'d'}
                name={'propertyType'}
                color='white'
                background='gray'
              />
            </div>
          </div>
          <div className='px-4 py-4 border-t border-gray-900 lg:w-1/3 border xl:w-full'>
            <span className='block text-sm font-semibold text-gray-500'>
              Property name
            </span>
            <div className='sm:flex sm:-mx-2 sm:flex-wrap'>
              <Checkbox
                name={'a'}
                content={'A'}
                color='white'
                background='gray'
              />
              <Checkbox
                name={'b'}
                content={'B'}
                color='white'
                background='gray'
              />
              <Checkbox
                name={'c'}
                content={'C'}
                color='white'
                background='gray'
              />
              <Checkbox
                name={'d'}
                content={'D'}
                color='white'
                background='gray'
              />
              <Checkbox
                name={'e'}
                content={'E'}
                color='white'
                background='gray'
              />
              <Checkbox
                name={'f'}
                content={'F'}
                color='white'
                background='gray'
              />
              <Checkbox
                name={'g'}
                content={'G'}
                color='white'
                background='gray'
              />
            </div>
          </div>
        </div>
        <div className='bg-gray-900 px-4 py-4 sm:text-right'>
          <button
            className={`block w-full sm:w-auto sm:inline-block bg-blue-800 hover:bg-blue-700 font-semibold text-white px-4 py-2 rounded-lg xl:block xl:w-full`}
          >
            Filter out
          </button>
        </div>
      </form>
    </section>
  );
};

export default SearchFilters;
