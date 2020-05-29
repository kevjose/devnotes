import React, { useRef } from 'react';

const TabBar = (props) => {
  const tabsRef = useRef(null);

  const scrollBy = (x) => {
    tabsRef.current.scrollLeft += x;
  };

  return (
    <div className="mt-4 mb-6 flex items-center">
      <div
        className="flex mr-2 cursor-pointer select-none text-gray-600 hover:text-gray-800"
        onClick={() => scrollBy(-100)}
      >
        <i className="material-icons">chevron_left</i>
      </div>

      <ul ref={tabsRef} className="flex overflow-x-scroll list-none">
        {props.children}
      </ul>

      <div
        className="flex mr-8 cursor-pointer select-none text-gray-600 hover:text-gray-800"
        onClick={() => scrollBy(100)}
      >
        <i className="material-icons">chevron_right</i>
      </div>
    </div>
  );
};

export default TabBar;
