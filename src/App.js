import React, { lazy, Suspense,useState } from 'react';
import DataTables from './components/DataTables';
import QueryEditor from './components/QueryEditor';
import QueryHistory from './components/QueryHistory';
import SavedQueries from './components/SavedQueries';
import QueryAvailable from './components/QueryAvailable';
import Navbar from './components/Navbar';
const LazyResultDisplay = lazy(() => import('./components/ResultDisplay'));


const App = () => {
  const [savedQueries, setSavedQueries] = useState([]); 
  const [executedQueries, setExecutedQueries] = useState([]); 


  const [theme, setTheme] = useState(
    localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'
  );

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };


  const [selectedQuery, setSelectedQuery] = useState(''); 

  const handleSelectQuery = (query) => {
    setSelectedQuery(query);
  };



  const handleSaveQuery = (query) => {
    setSavedQueries([...savedQueries, query]); 
  };

  const handleExecuteQuery = (query) => {
    setExecutedQueries([...executedQueries, query]); 
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
              <DataTables />
            </div>
            <div className="mt-4">
              <QueryHistory executedQueries={executedQueries} />
            </div>
            <div className="mt-4">
              <SavedQueries savedQueries={savedQueries}  />
            </div>
          </div>
        </div>
        <div className="w-3/4 p-4 mt-8">

  <QueryEditor
    onSaveQuery={handleSaveQuery}
    onExecuteQuery={handleExecuteQuery}
    theme={theme}
    selectedQuery={selectedQuery}
  />
  <div className="mt-4"> 
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
