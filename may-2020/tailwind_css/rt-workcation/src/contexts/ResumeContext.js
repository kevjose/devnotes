import React, { createContext, useReducer, useContext } from 'react';
import { set } from 'lodash';

export const ResumeContext = createContext();
export const INPUT_CHANGE = 'INPUT_CHANGE';
export const SAVE_TO_LOCAL_STORAGE = 'SAVE_TO_LOCAL_STORAGE';
export const LOAD_FROM_LOCAL_STORAGE = 'LOAD_FROM_LOCAL_STORAGE';

const initialState = {
  resume: {
    basics: {
      visible: true,
      label: 'Basic Information',
      name: 'John Doe',
      designation: 'Programmer',
      picture:
        'https://www.fetchland.com/wp-content/uploads/2016/04/Zach-Woods-300x225.png',
      email: 'john@gmail.com',
      phone: '(912) 555-4321',
      website: 'http://johndoe.com',
      summary: 'A summary of John Doe...',
      location: {
        address: '2712 Broadway St',
        postalCode: 'CA 94115',
        city: 'San Francisco',
        countryCode: 'US',
        region: 'California'
      }
    },
    work: {
      visible: true,
      label: 'Work Experience',
      items: [
        {
          company: 'Company',
          position: 'President',
          website: 'http://company.com',
          startDate: '2013-01-01',
          endDate: '2014-01-01',
          summary: 'Description...',
          highlights: ['Started the company']
        }
      ]
    }
  }
};

const ResumeReducer = (state, { type, payload }) => {
  switch (type) {
    case INPUT_CHANGE:
      console.log(type, payload, set({ ...state }, payload.key, payload.value));
      return set({ ...state }, payload.key, payload.value);
    case SAVE_TO_LOCAL_STORAGE:
      localStorage.setItem('state', JSON.stringify(state));
      return state;
    case LOAD_FROM_LOCAL_STORAGE:
      if (!payload) return state;
      return payload;
    default:
      return state;
  }
};

export const ResumeProvider = props => {
  const [state, dispatch] = useReducer(ResumeReducer, initialState);
  const resumeData = { state, dispatch };
  return (
    <ResumeContext.Provider value={resumeData}>
      {props.children}
    </ResumeContext.Provider>
  );
};

export const useResumeContext = () => {
  return useContext(ResumeContext);
};
