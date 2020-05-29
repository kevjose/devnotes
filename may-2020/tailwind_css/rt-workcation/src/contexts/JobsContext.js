import React, { createContext, useReducer, useContext } from 'react';

export const JobsContext = createContext();

const initialState = {
  loading: false,
  data: [],
};

// actions

export const FETCH_JOBS = 'FETCH_JOBS';
export const LOADING_JOBS = 'LOADING_JOBS';

export const jobsReducer = (state, action) => {
  switch (action.type) {
    case FETCH_JOBS:
      console.log(action);
      return {
        loading: false,
        data: action.payload.data,
      };
    case LOADING_JOBS:
      console.log(action);
      return {
        loading: true,
        data: [],
      };
    default:
      return state;
  }
};

export const JobsProvider = (props) => {
  const [jobs, jobsDispatch] = useReducer(jobsReducer, initialState);
  const jobsData = { jobs, jobsDispatch };

  return <JobsContext.Provider value={jobsData} {...props} />;
};

export const useJobsContext = () => {
  return useContext(JobsContext);
};
