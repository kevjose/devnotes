import React from 'react';

const Radio = props => {
  return (
    <label className='mt-3 sm:w-1/4 sm:px-2 flex items-center lg:w-full lg:px-0'>
      <input
        className={`bg-${props.background}-900 focus:bg-${props.background}-700`}
        type='radio'
        value={props.value}
        name={props.name}
      />
      <span className={`ml-2 text-${props.color}`}>{props.content}</span>
    </label>
  );
};

export default Radio;
