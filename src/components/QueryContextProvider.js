import React, { createContext, useContext, useState, useEffect } from 'react';

const QueryContext = createContext();

export const useQueryContext = () => {
  return useContext(QueryContext);
};

const QueryContextProvider = React.memo(({ children }) => {
  const [selectedQuery, setSelectedQuery] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [importedData, setImportedData] = useState([]);
  const [importedCsvName, setImportedCsvName] = useState(null);

  return (
    <QueryContext.Provider value={{
      selectedQuery,
      setSelectedQuery,
      isClicked,
      setIsClicked,
      importedData,
      setImportedData,
      importedCsvName,
      setImportedCsvName,
    }}>
      {children}
    </QueryContext.Provider>
  );
});

export default QueryContextProvider;
