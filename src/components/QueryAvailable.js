import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { useQueryContext } from './QueryContextProvider';

const QueryAvailable = React.memo(() => {
  const { setSelectedQuery, selectedQuery } = useQueryContext();
  const preloadedQueries = [
    'SELECT * FROM customers;',
    'SELECT product_name, unit_price FROM products WHERE unit_price > 20;',
    // Add more preloaded queries
  ];

  const [searchTerm, setSearchTerm] = useState('');

  const filteredQueries = preloadedQueries.filter((query) =>
    query.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="sidebar-component bg-white shadow-md p-4 rounded-lg">
      <h3 className="text-2xl font-semibold flex items-center mb-4">
        <FontAwesomeIcon icon={faLightbulb} className="text-yellow-400 mr-2" />
        <h2 className="text-xl font-semibold ml-2">Available Queries</h2>
      </h3>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search queries..."
          className="p-2 border border-gray-300 rounded-md w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ul className="pl-0 space-y-2 max-h-[8rem] md:max-h-[12rem] lg:max-h-[16rem] overflow-y-auto">
        {filteredQueries.map((query, index) => (
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
});

export default QueryAvailable;
