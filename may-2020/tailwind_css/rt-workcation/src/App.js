import React from 'react';
import SiteHeader from './components/SiteHeader';
import SiteFilters from './components/SearchFilters';

function App() {
  return (
    <div className='min-h-screen bg-gray-200 antialiased xl:flex xl:flex-col xl:h-screen'>
      <SiteHeader className='xl:flex-shrink-0' />
      <div className='xl:flex-1 xl:flex xl:overflow-y-hidden'>
        <SiteFilters />
      </div>
    </div>
  );
}

export default App;
