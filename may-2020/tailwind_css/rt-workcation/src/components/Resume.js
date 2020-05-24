import React from 'react';
import { useResumeContext } from '../contexts/ResumeContext';

const Resume = () => {
  const { state } = useResumeContext();
  const basic_profile = state.resume.basics;
  return (
    <div
      className='p-10 w-full bg-white border antialiased overflow-y-auto'
      style={{ fontFamily: 'Fira Sans' }}
    >
      <div className='grid grid-cols-4 items-center'>
        <div className='col-span-3 flex items-center'>
          <img
            className='rounded object-cover mr-4 w-32 h-32'
            src={basic_profile.picture}
            alt='display pic'
          />
          <div>
            <h1 className='font-bold text-4xl text-gray-600'>
              {basic_profile.name}
            </h1>
            <h6 className='font-medium text-sm'>{basic_profile.designation}</h6>
            <div className='flex flex-col mt-4 text-xs'>
              <span>{basic_profile.location.address}</span>
              <span>{basic_profile.location.city}</span>
              <span>
                {basic_profile.location.region},{' '}
                {basic_profile.location.postalCode}
              </span>
            </div>
          </div>
        </div>
        <div className='col-span-1 text-xs'>
          <div className='flex items-center my-3'>
            <span
              className='material-icons text-lg mr-2'
              aria-label='telephone'
              role='img'
            >
              phone
            </span>
            <a href={`tel:${basic_profile.phone}`}>
              <span className='font-medium break-all'>
                {basic_profile.phone}
              </span>
            </a>
          </div>
          <div className='flex items-center my-3'>
            <span
              className='material-icons text-lg mr-2'
              aria-label='email'
              role='img'
            >
              email
            </span>
            <a href={`mailto:${basic_profile.email}`}>
              <span className='font-medium break-all lowercase'>
                {basic_profile.email}
              </span>
            </a>
          </div>
        </div>
      </div>
      <hr className='my-6' />

      <div>
        <h6 className='text-xs font-bold uppercase mt-6 mb-2'>
          Professional Objective
        </h6>
        <div className='text-sm'>
          <p>
            To obtain a job within my chosen field that will challenge me and
            allow me to use my education, skills and past experiences in a way
            that is mutually beneficial to both myself and my employer and allow
            for future growth and advancement.
          </p>
        </div>
      </div>

      <div>
        <h6 className='text-xs font-bold uppercase mt-6 mb-2'>
          Work Experience
        </h6>
        <div className='mt-3'>
          <div className='flex justify-between'>
            <div>
              <h6 className='font-semibold'>LetsVenture Pte. Ltd</h6>
              <p className='text-xs'> Frontend engineer</p>
            </div>
            <span className='text-xs font-medium'>(Jan 2015 - July 2016)</span>
          </div>

          <div className='mt-2 text-sm'>
            <ul className='list-disc ml-4'>
              <li>
                Organized customer information and account data for business
                planning and customer service purposes.
              </li>
              <li>
                Created excel spreadsheets to track customer data and perform
                intense reconciliation process.
              </li>
              <li>
                Created excel spreadsheets to track customer data and perform
                intense reconciliation process.
                <br />
                <strong>Key achievement: &nbsp;</strong>
                Designed and executed an automatized system for following up
                with customers, increasing customer retention by 22%.
              </li>
            </ul>
          </div>
        </div>

        <div className='mt-3'>
          <div className='flex justify-between'>
            <div>
              <h6 className='font-semibold'>AOT Technologies Pte. Ltd.</h6>
              <p className='text-xs'> Frontend engineer</p>
            </div>
            <span className='text-xs font-medium'>(Jan 2014 - July 2015)</span>
          </div>

          <div className='mt-2 text-sm'>
            <ul className='list-disc ml-4'>
              <li>
                Organized customer information and account data for business
                planning and customer service purposes.
              </li>
              <li>
                Created excel spreadsheets to track customer data and perform
                intense reconciliation process.
              </li>
              <li>
                Created excel spreadsheets to track customer data and perform
                intense reconciliation process.
                <br />
                <strong>Key achievement: &nbsp;</strong>
                Designed and executed an automatized system for following up
                with customers, increasing customer retention by 22%.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-6'>
        <div>
          <h6 className='text-xs font-bold uppercase mt-6 mb-2'>Skills</h6>
          <div className='mt-1 flex flex-wrap'>
            <span className='text-xs rounded-full px-3 py-1 font-medium my-2 mr-2 bg-gray-900 text-gray-200'>
              Javascript
            </span>
            <span className='text-xs rounded-full px-3 py-1 font-medium my-2 mr-2 bg-gray-900 text-gray-200'>
              HTML5
            </span>
            <span className='text-xs rounded-full px-3 py-1 font-medium my-2 mr-2 bg-gray-900 text-gray-200'>
              CSS3
            </span>
            <span className='text-xs rounded-full px-3 py-1 font-medium my-2 mr-2 bg-gray-900 text-gray-200'>
              Javascript
            </span>
            <span className='text-xs rounded-full px-3 py-1 font-medium my-2 mr-2 bg-gray-900 text-gray-200'>
              HTML5
            </span>
            <span className='text-xs rounded-full px-3 py-1 font-medium my-2 mr-2 bg-gray-900 text-gray-200'>
              CSS3
            </span>
            <span className='text-xs rounded-full px-3 py-1 font-medium my-2 mr-2 bg-gray-900 text-gray-200'>
              Javascript
            </span>
            <span className='text-xs rounded-full px-3 py-1 font-medium my-2 mr-2 bg-gray-900 text-gray-200'>
              HTML5
            </span>
            <span className='text-xs rounded-full px-3 py-1 font-medium my-2 mr-2 bg-gray-900 text-gray-200'>
              CSS3
            </span>
            <span className='text-xs rounded-full px-3 py-1 font-medium my-2 mr-2 bg-gray-900 text-gray-200'>
              Javascript
            </span>
            <span className='text-xs rounded-full px-3 py-1 font-medium my-2 mr-2 bg-gray-900 text-gray-200'>
              HTML5
            </span>
            <span className='text-xs rounded-full px-3 py-1 font-medium my-2 mr-2 bg-gray-900 text-gray-200'>
              CSS3
            </span>
          </div>
        </div>

        <div>
          <h6 className='text-xs font-bold uppercase mt-6 mb-2'>Hobbies</h6>
          <div className='mt-1 flex flex-wrap'>
            <span className='text-xs rounded-full px-3 py-1 font-medium my-2 mr-2 bg-gray-900 text-gray-200'>
              Sketching
            </span>
            <span className='text-xs rounded-full px-3 py-1 font-medium my-2 mr-2 bg-gray-900 text-gray-200'>
              Speed Coding
            </span>
            <span className='text-xs rounded-full px-3 py-1 font-medium my-2 mr-2 bg-gray-900 text-gray-200'>
              Travel
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
