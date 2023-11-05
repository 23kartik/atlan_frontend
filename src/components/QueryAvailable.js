import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { useQueryContext } from './QueryContextProvider';


const QueryAvailable = () => {
  const { setSelectedQuery,selectedQuery } = useQueryContext();
  const preloadedQueries = [
    'SELECT * FROM customers;',
    'SELECT product_name, unit_price FROM products WHERE unit_price > 20;',
    // Add more preloaded queries
  ];

  return (
    <div className="sidebar-component bg-white shadow-md p-4 rounded-lg">
      <h3 className="text-2xl font-semibold flex items-center mb-4">
        <FontAwesomeIcon icon={faLightbulb} className="text-yellow-400 mr-2" />
        <h2 className="text-xl font-semibold ml-2">  Available Queries</h2>
      </h3>
      <ul className="pl-0 space-y-2 max-h-[8rem] overflow-y-auto">
        {preloadedQueries.map((query, index) => (
          <li
            key={index}
            className={`text-blue-700 text-lg mb-2 p-2 rounded-md bg-gray-100 hover:bg-yellow-100 transition-all duration-300 cursor-pointer ${
              selectedQuery === query ? 'bg-yellow-100' : ''
            }`}
            onClick={() => setSelectedQuery(query)}
          >
            {query}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QueryAvailable;