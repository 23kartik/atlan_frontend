import React, { createContext, useContext, useState, memo } from 'react';

const QueryContext = createContext();

export const useQueryContext = () => {
  return useContext(QueryContext);
};

const QueryContextProvider = memo(({ children }) => {
  const [selectedQuery, setSelectedQuery] = useState('');
  const [isClicked, setIsClicked] = useState(false);

  return (
    <QueryContext.Provider value={{ selectedQuery, setSelectedQuery, isClicked, setIsClicked }}>
      {children}
    </QueryContext.Provider>
  );
});

export default QueryContextProvider;
