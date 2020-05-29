import React from 'react';
import SiteHeader from './components/SiteHeader';
// import SiteFilters from './components/SearchFilters';
// import SideNav from './components/SideNav';
// import Resume from './components/Resume';
import { ResumeProvider } from './contexts/ResumeContext';
import { JobsProvider } from './contexts/JobsContext';
import Joblist from './components/Joblist';
// import Kanban from './components/Kanban';

function App() {
  return (
    <div className="min-h-screen bg-gray-300 antialiased xl:flex xl:flex-col xl:h-screen">
      <SiteHeader className="xl:flex-shrink-0" />
      <div className="xl:flex-1 xl:flex xl:overflow-y-hidden">
        <ResumeProvider>
          {/* <SideNav /> */}
          <JobsProvider>
            <Joblist />
          </JobsProvider>

          {/* <SiteFilters /> */}
          {/* <Resume /> */}
        </ResumeProvider>
      </div>
    </div>
    // <Kanban />
  );
}

export default App;
