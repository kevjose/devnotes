import React from 'react';

const Joblist = () => {
  return (
    <div className='bg-white flex flex-col w-full p-2'>
      <div className='w-full h-full flex flex-col'>
        <div className='w-full p-2'>
          <input
            className='focus:outline-none border border-gray-200 w-full rounded px-2 py-2 placeholder-gray-500 text-sm'
            placeholder='Search by job position'
          />
        </div>
        <div className='h-full p-2'>
          <ul className='h-full overflow-y-auto'>
            <li className='flex flex-wrap border border-gray-200 rounded h-auto min-h-12 px-2 py-2 text-gray-500 shadow'>
              <div className='lg:w-1/6 flex-shrink-0 w-full flex flex-col justify-center items-start'>
                <img
                  src='https://logo.clearbit.com/razorpay.com'
                  className='object-cover rounded'
                  alt='razorpay'
                />
                <h3 className='text-blue-800 font-bold text-md'>Razorpay</h3>
                <a
                  href='https://razorpay.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-600 text-sm'
                >
                  https://razorpay.com
                </a>
              </div>
              <div className='lg:w-4/6 flex-shrink-0 w-full flex flex-col'>
                <p className='text-gray-700 text-sm'>
                  Payment Gateway for India: Start Accepting Payments Instantly
                  with Razorpay's Free Payment Gateway. Supports Netbanking,
                  Credit, Debit Cards, UPI etc. Razorpay allows businesses to
                  accept, process and disburse payments with ease.
                </p>
                <br />
                <p className='text-sm text-blue-600 font-semibold'>
                  Open positions
                </p>
                <div className='-ml-1 overflow-x-auto w-full block'>
                  <span className='bg-blue-300 text-gray-900 p-2 text-xs font-semibold  rounded-lg m-1 inline-block tracking-tight capitalize'>
                    Senior Software Engineer
                  </span>
                  <span className='bg-yellow-300 text-gray-900 p-2 text-xs font-semibold  rounded-lg m-1 inline-block tracking-tight capitalize'>
                    Software Engineer
                  </span>
                  <span className='bg-yellow-300 text-gray-900 p-2 text-xs font-semibold  rounded-lg m-1 inline-block tracking-tight capitalize'>
                    Javascript Engineer
                  </span>
                  <span className='bg-yellow-300 text-gray-900 p-2 text-xs font-semibold  rounded-lg m-1 inline-block tracking-tight capitalize'>
                    SDET2
                  </span>
                  <span className='bg-yellow-300 text-gray-900 p-2 text-xs font-semibold  rounded-lg m-1 inline-block tracking-tight capitalize'>
                    UI2
                  </span>
                  <span className='bg-red-300 text-gray-900 p-2 text-xs font-semibold  rounded-lg m-1 inline-block tracking-tight capitalize'>
                    Analyst
                  </span>
                  <span className='bg-red-300 text-gray-900 p-2 text-xs font-semibold  rounded-lg m-1 inline-block tracking-tight capitalize'>
                    Program manager
                  </span>
                  <span className='bg-red-300 text-gray-900 p-2 text-xs font-semibold  rounded-lg m-1 inline-block tracking-tight capitalize'>
                    Senior Software Engineer
                  </span>
                  <span className='bg-red-300 text-gray-900 p-2 text-xs font-semibold  rounded-lg m-1 inline-block tracking-tight capitalize'>
                    Test Engineer
                  </span>
                  <span className='bg-red-300 text-gray-900 p-2 text-xs font-semibold  rounded-lg m-1 inline-block tracking-tight capitalize'>
                    QA
                  </span>
                </div>
              </div>
              <div className='lg:w-1/6 flex-shrink-0 w-full flex flex-col justify-center items-start lg:items-center lg:border-l lg:border-gray-200'>
                <p className='text-xs text-blue-700 uppercase font-semibold cursor-pointer mt-2 lg:mt-0'>
                  View details <>&#8594;</>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Joblist;
