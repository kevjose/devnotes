import React from 'react';

const Checkbox = props => {
  return (
    <label className='mt-3 flex items-center sm:w-1/2 sm:px-2 lg:w-full'>
      <input
        className={`bg-${props.background}-900 focus:bg-${props.background}-700`}
        name={props.name}
        type='checkbox'
      />
      <span className={`ml-2 text-${props.color}`}>{props.content}</span>
    </label>
  );
};

export default Checkbox;
