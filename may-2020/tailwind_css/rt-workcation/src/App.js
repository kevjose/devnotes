import React from 'react';
import SiteHeader from './components/SiteHeader';

function App() {
  return (
    <div className='min-h-screen bg-gray-200 antialiased xl:flex xl:flex-col xl:h-screen'>
      <SiteHeader className='xl:flex-shrink-0' />
    </div>
  );
}

export default App;
