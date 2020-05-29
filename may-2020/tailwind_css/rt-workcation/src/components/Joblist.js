import React, { useEffect } from 'react';
import TabBar from './TabBar';
import { getJobs } from '../api/jobs';
import {
  useJobsContext,
  FETCH_JOBS,
  LOADING_JOBS,
} from '../contexts/JobsContext';
import useToogle from '../hooks/useToggle';

const JobItem = ({ jobData }) => {
  const [showDetail, setShowDetail] = useToogle(false);
  return (
    <li
      className="flex flex-wrap border border-gray-200 rounded h-auto min-h-12 px-2 py-2 text-gray-500 shadow"
      key={jobData._id}
    >
      <div className="lg:w-1/6 flex-shrink-0 w-full flex flex-col justify-center items-start">
        <img
          src={`https://logo.clearbit.com/${jobData.url}`}
          className="object-cover rounded"
          alt={`${jobData.company}`}
        />
        <h3 className="text-blue-800 font-bold text-md ml-1">
          {jobData.company}
        </h3>
        <a
          href={`${jobData.url}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 text-sm ml-1"
        >
          {jobData.url}
        </a>
      </div>
      <div className="lg:w-4/6 flex-shrink-0 w-full flex flex-col">
        <p className="text-gray-700 text-sm">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
        <br />
        <p className="text-sm text-blue-600 font-semibold">Open positions</p>
        <TabBar>
          {jobData.items.map((item) => (
            <li key={item.source_url} className="mx-1 list-none">
              <div className="whitespace-no-wrap bg-blue-800 text-white p-2 text-xs font-semibold  rounded m-1 inline-block tracking-tight capitalize">
                {item.clean_title}
              </div>
            </li>
          ))}
        </TabBar>
      </div>
      <div className="lg:w-1/6 flex-shrink-0 w-full flex flex-col justify-center items-start lg:items-center lg:border-l lg:border-gray-200">
        <p
          className="text-xs text-blue-700 uppercase font-semibold cursor-pointer mt-2 lg:mt-0"
          onClick={() => setShowDetail((o) => !o)}
        >
          View details &nbsp; {showDetail ? <>&#8595;</> : <>&#8594;</>}
        </p>
      </div>

      {showDetail && (
        <div className="whitespace-no-wrap lg:w-full flex-shrink-0 w-full flex justify-start items-start h-48 border-t overflow-x-auto">
          {jobData.items.map((item) => {
            return (
              <div
                className="w-full lg:w-1/3 h-full pt-2 ml-2"
                key={item.source_url}
              >
                <p className="text-sm font-semibold text-gray-600">
                  {item.clean_title}
                </p>
                <p className="text-xs font-semibold text-gray-900 overflow-hidden">
                  {item.company}
                </p>
                <p className="text-gray-700 tracking-tighter">
                  <span className="text-xs">{item.job_type}</span>
                  &nbsp;&nbsp;
                  <span className="text-xs">at &nbsp; {item.location}</span>
                  &nbsp;&nbsp;
                </p>
                <p className="text-gray-700 tracking-tighter">
                  <span className="text-xs">
                    Posted on: &nbsp;{item.posted_on}
                  </span>{' '}
                </p>
                <p className="whitespace-normal text-xs font-semibold text-gray-700 h-8 overflow-y-auto">
                  <span className="text-blue-600">Relevant skills &nbsp; </span>
                  {item.relevant_skills.splice(0, 5).join(', ')}
                </p>
                <br />
                <a
                  href={item.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" text-blue-700 bg-transparent border border-solid border-blue-500 font-semibold uppercase px-3 py-1 rounded outline-none focus:outline-none mx-1 my-2 text-xs"
                >
                  Apply via {item.source}
                </a>
              </div>
            );
          })}
        </div>
      )}
    </li>
  );
};

const Joblist = () => {
  const { jobs, jobsDispatch } = useJobsContext();

  useEffect(() => {
    jobsDispatch({
      type: LOADING_JOBS,
    });
    getJobs()
      .then((res) => {
        jobsDispatch({
          type: FETCH_JOBS,
          payload: {
            data: res,
          },
        });
      })
      .catch((e) => console.log(e));
  }, [jobsDispatch]);
  console.log(jobs);
  return (
    <div className="bg-white flex flex-col w-full p-2 items-center">
      <div className="h-full flex flex-col lg:w-10/12 w-full">
        <div className="w-full p-2 pt-24">
          <input
            className="focus:outline-none border border-gray-200 w-full rounded px-2 py-2 placeholder-gray-600 text-sm"
            placeholder="Search by job position"
          />
        </div>
        <div className="h-full p-2 overflow-y-auto">
          <ul className="h-full">
            {!jobs.loading &&
              jobs.data.map((job) => {
                return <JobItem jobData={job} key={job._id} />;
              })}
            {/* <li className="flex flex-wrap border border-gray-200 rounded h-auto min-h-12 px-2 py-2 text-gray-500 shadow">
              <div className="lg:w-1/6 flex-shrink-0 w-full flex flex-col justify-center items-start">
                <img
                  src="https://logo.clearbit.com/razorpay.com"
                  className="object-cover rounded"
                  alt="razorpay"
                />
                <h3 className="text-blue-800 font-bold text-md ml-1">
                  Razorpay
                </h3>
                <a
                  href="https://razorpay.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm ml-1"
                >
                  https://razorpay.com
                </a>
              </div>
              <div className="lg:w-4/6 flex-shrink-0 w-full flex flex-col">
                <p className="text-gray-700 text-sm">
                  Payment Gateway for India: Start Accepting Payments Instantly
                  with Razorpay's Free Payment Gateway. Supports Netbanking,
                  Credit, Debit Cards, UPI etc. Razorpay allows businesses to
                  accept, process and disburse payments with ease.
                </p>
                <br />
                <p className="text-sm text-blue-600 font-semibold">
                  Open positions
                </p>
                <TabBar>
                  {tabs.map((tab) => (
                    <li key={tab.key} className="mx-1 list-none">
                      <div className="bg-blue-800 text-white p-2 text-xs font-semibold  rounded m-1 inline-block tracking-tight capitalize">
                        {tab.key}
                      </div>
                    </li>
                  ))}
                </TabBar>
                {/* <div className="-ml-1 overflow-x-auto w-full block">
                  <span className="bg-blue-300 text-gray-900 p-2 text-xs font-semibold  rounded-lg m-1 inline-block tracking-tight capitalize">
                    Senior Software Engineer
                  </span>
                  <span className="bg-yellow-300 text-gray-900 p-2 text-xs font-semibold  rounded-lg m-1 inline-block tracking-tight capitalize">
                    Software Engineer
                  </span>
                  <span className="bg-yellow-300 text-gray-900 p-2 text-xs font-semibold  rounded-lg m-1 inline-block tracking-tight capitalize">
                    Javascript Engineer
                  </span>
                  <span className="bg-yellow-300 text-gray-900 p-2 text-xs font-semibold  rounded-lg m-1 inline-block tracking-tight capitalize">
                    SDET2
                  </span>
                  <span className="bg-yellow-300 text-gray-900 p-2 text-xs font-semibold  rounded-lg m-1 inline-block tracking-tight capitalize">
                    UI2
                  </span>
                  <span className="bg-red-300 text-gray-900 p-2 text-xs font-semibold  rounded-lg m-1 inline-block tracking-tight capitalize">
                    Analyst
                  </span>
                  <span className="bg-red-300 text-gray-900 p-2 text-xs font-semibold  rounded-lg m-1 inline-block tracking-tight capitalize">
                    Program manager
                  </span>
                  <span className="bg-red-300 text-gray-900 p-2 text-xs font-semibold  rounded-lg m-1 inline-block tracking-tight capitalize">
                    Senior Software Engineer
                  </span>
                  <span className="bg-red-300 text-gray-900 p-2 text-xs font-semibold  rounded-lg m-1 inline-block tracking-tight capitalize">
                    Test Engineer
                  </span>
                  <span className="bg-red-300 text-gray-900 p-2 text-xs font-semibold  rounded-lg m-1 inline-block tracking-tight capitalize">
                    QA
                  </span>
                </div>
              </div>
              <div className="lg:w-1/6 flex-shrink-0 w-full flex flex-col justify-center items-start lg:items-center lg:border-l lg:border-gray-200">
                <p className="text-xs text-blue-700 uppercase font-semibold cursor-pointer mt-2 lg:mt-0">
                  View details <>&#8594;</>
                </p>
              </div>
                  </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Joblist;
