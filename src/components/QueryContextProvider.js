import React, { createContext, useContext, useState } from 'react';

const QueryContext = createContext();

export const useQueryContext = () => {
  return useContext(QueryContext);
};

export const QueryContextProvider = ({ children }) => {
  const [selectedQuery, setSelectedQuery] = useState('');
  const [isClicked, setIsClicked] = useState(false);

  return (
    <QueryContext.Provider value={{ selectedQuery, setSelectedQuery,isClicked, setIsClicked }}>
      {children}
    </QueryContext.Provider>
  );
};
