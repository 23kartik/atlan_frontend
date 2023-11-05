import React, { lazy, Suspense,useState } from 'react';
import DataTables from './components/DataTables';
import QueryEditor from './components/QueryEditor';
import QueryHistory from './components/QueryHistory';
import SavedQueries from './components/SavedQueries';
import QueryAvailable from './components/QueryAvailable';
import Navbar from './components/Navbar';
const LazyResultDisplay = lazy(() => import('./components/ResultDisplay'));


const App = () => {
  const [savedQueries, setSavedQueries] = useState([]); // Store saved queries here
  const [executedQueries, setExecutedQueries] = useState([]); // Store executed queries here


  const [theme, setTheme] = useState(
    localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'
  );

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };


  const [selectedQuery, setSelectedQuery] = useState(''); // Store the selected query

  const handleSelectQuery = (query) => {
    setSelectedQuery(query);
  };



  const handleSaveQuery = (query) => {
    setSavedQueries([...savedQueries, query]); // Update saved queries
  };

  const handleExecuteQuery = (query) => {
    setExecutedQueries([...executedQueries, query]); // Update executed queries
  };

  return (
    <div className="" >
      <Navbar onToggleTheme={toggleTheme} currentTheme={theme} />
      <div className="min-h-screen flex" >
        <div className="w-2/6 p-4 bg-gray-100 h-screen overflow-y-auto">
          <div className="w-2/7  p-0 bg-gray-100">
            {/* Left sidebar */}
            <QueryAvailable
              selectedQuery={selectedQuery}
              onSelectQuery={handleSelectQuery}
             
            />
            <div className="mt-4">
              {/* Add 1rem vertical space */}
              <DataTables />
            </div>
            <div className="mt-4">
              {/* Add 1rem vertical space */}
              <QueryHistory executedQueries={executedQueries} />
            </div>
            <div className="mt-4">
              {/* Add 1rem vertical space */}
              <SavedQueries savedQueries={savedQueries}  />
            </div>
          </div>
        </div>
        <div className="w-3/4 p-4 mt-8">
  {/* Right content */}
  <QueryEditor
    onSaveQuery={handleSaveQuery}
    onExecuteQuery={handleExecuteQuery}
    theme={theme}
    selectedQuery={selectedQuery}
  />
  <div className="mt-4"> {/* Add vertical margin */}
  <Suspense fallback={<div>Loading...</div>}>
        <LazyResultDisplay />
      </Suspense>
  </div>
</div>

      </div>
    </div>
  );
};

export default App;
