import React from 'react';
const DropdownButton = props => {
  const { toggleAccountOpen, setFocus } = props;
  return (
    <button
      onClick={toggleAccountOpen}
      type='button'
      className='block focus:outline-none'
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    >
      {props.children}
    </button>
  );
};

const Dropdown = props => {
  const { isAccountOpen, toggleAccountOpen } = props;
  return (
    <div className={isAccountOpen ? 'block' : 'hidden'}>
      <button
        onClick={() => toggleAccountOpen(false)}
        type='button'
        className='z-30 block fixed inset-0 w-full h-full cursor-default'
      ></button>
      <div className='absolute z-40 right-0'>
        <div className='mt-3 bg-white xl:border rounded-lg w-48 py-2 shadow-xl'>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export { DropdownButton, Dropdown };
