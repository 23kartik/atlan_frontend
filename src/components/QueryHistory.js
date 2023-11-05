import React from 'react';
import { useQueryContext } from './QueryContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory } from '@fortawesome/free-solid-svg-icons';

const QueryHistory = ({ executedQueries }) => {
  const { selectedQuery, setSelectedQuery } = useQueryContext();

  return (
    <div className="sidebar-component bg-white shadow-md p-4 rounded-lg">
      <h3 className="text-2xl font-semibold mb-4 flex items-center">
        <FontAwesomeIcon icon={faHistory} className="text-gray-600 mr-2" />
        <h2 className="text-xl font-semibold ml-2">Query History</h2> 
      </h3>
      <ul className="pl-0 space-y-2 max-h-[6rem] overflow-y-auto">
        {executedQueries.map((query, index) => (
          <li
            key={index}
            className={`text-blue-700 text-lg mb-2 p-2 rounded-md bg-gray-100 hover:bg-blue-100 transition-all duration-300 cursor-pointer ${
              selectedQuery === query ? 'bg-blue-100' : ''
            }`}
            onClick={() => setSelectedQuery(query)}          >
            {query}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QueryHistory;
