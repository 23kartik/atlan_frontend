import React from 'react';
import { useQueryContext } from './QueryContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

const SavedQueries = React.memo(({ savedQueries }) => {
    const { selectedQuery, setSelectedQuery } = useQueryContext();

  return (
    <div className="saved-queries bg-white shadow-md p-4 rounded-lg">
      <h3 className="text-2xl font-semibold mb-4 flex items-center">
        <FontAwesomeIcon icon={faSave} className="text-green-600 mr-2" />
        <h2 className="text-xl font-semibold ml-2">Saved Queries</h2>
      </h3>
      <ul className="pl-0 space-y-2 max-h-[6rem] md:max-h-[8rem] lg:max-h-[10rem] overflow-y-auto">
        {savedQueries.map((savedQuery, index) => (
          <li
            key={index}
            className={`text-blue-700 text-lg mb-2 p-2 rounded-md bg-gray-100 hover:bg-green-100 transition-all duration-300 cursor-pointer ${
              selectedQuery === savedQuery ? 'bg-green-100' : ''
            }`}
            onClick={() => setSelectedQuery(savedQuery)}
          >
            {savedQuery}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default SavedQueries;
