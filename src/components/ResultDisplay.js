import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { useQueryContext } from './QueryContextProvider';

const ResultDisplay = React.memo(() => {
  const { selectedQuery, isClicked, setIsClicked,importedData,importedCsvName,isImported, setIsImported } = useQueryContext();
  const [activeTab, setActiveTab] = useState('Output');
  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(itemsPerPage);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsClicked(false);
    setCurrentPage(1);
    setStartIndex(0);
    setEndIndex(itemsPerPage);
  }, [selectedQuery, setIsClicked]);

  useEffect(() => {
    if (importedData.length > 0 && selectedQuery === `SELECT * FROM ${importedCsvName}`) {
      setTableData(importedData);
      return;
    }
    
      // Fetch data for other queries
      const fetchTableData = async () => {
        if (selectedQuery) {
          const tableName = extractTableName(selectedQuery);

          if (tableName) {
            const csvFileName = `${tableName}.csv`;
            setLoading(true);

            try {
              const response = await fetch(`/data/${csvFileName}`);
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }

              const data = await response.text();
              const parsedData = parseCSVData(data);
              setTableData(parsedData);
            } catch (error) {
              // Handle error if needed
            } finally {
              setLoading(false);
            }
          }
        }
      };

      fetchTableData();
    
  }, [selectedQuery, importedCsvName, importedData]);

  useEffect(() => {
    setStartIndex((currentPage - 1) * itemsPerPage);
    setEndIndex(currentPage * itemsPerPage);
  }, [currentPage, itemsPerPage]);

  const extractTableName = (query) => {
    const tableNameMatch = query.match(/FROM\s+(\w+)/i);
    return tableNameMatch ? tableNameMatch[1] : null;
  };

  const parseCSVData = (csvText) => {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',');
    const data = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
      if (values.length === headers.length) {
        const row = {};
        for (let j = 0; j < headers.length; j++) {
          row[headers[j]] = values[j];
        }
        data.push(row);
      }
    }

    return data;
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const filteredTableData = tableData.filter((row) =>
    Object.values(row).some((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div>
<div className="tabs-container mb-4 space-x-4">
  <button

    className={`tab-button  ${activeTab === 'Output' ? 'active-tab' : ''}`}
    onClick={() => setActiveTab('Output')}
  >
    Output
  </button>
  <button

className={`tab-button  ${activeTab === 'TableData' ? 'active-tab' : ''}`}
    onClick={() => setActiveTab('TableData')}
  >
    Table Data
  </button>
</div>


<div className="result-display bg-gray-100 text-gray-800 p-4 rounded-lg shadow-lg">
  {isClicked ? (
    <div>
      {activeTab === 'Output' && (
        <div>
          <div className="search-filter-section mb-4">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 border rounded focus:outline-none w-full md:w-1/2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {filteredTableData.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-lg">
                <thead className="bg-blue-500 text-white">
                  <tr>
                    {Object.keys(filteredTableData[0]).map((key) => (
                      <th className="p-3 text-lg font-semibold" key={key}>
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredTableData.slice(startIndex, endIndex).map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className={rowIndex % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'}
                    >
                      {Object.values(row).map((value, columnIndex) => (
                        <td className="p-3 border border-gray-300" key={columnIndex}>
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="no-data-message text-center mt-4 text-red-600">
              No matching data found
            </div>
          )}

          <div className="pagination mt-4 flex justify-between items-center">
            <button
              className={`${
                currentPage === 1
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white font-semibold py-2 px-4 rounded-full shadow-md transition-transform transform hover:scale-105`}
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-lg font-semibold">
              Page {currentPage}
            </span>
            <button
              className={`${
                endIndex >= filteredTableData.length
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white font-semibold py-2 px-4 rounded-full shadow-md transition-transform transform hover:scale-105`}
              onClick={handleNextPage}
              disabled={endIndex >= filteredTableData.length}
            >
              Next
            </button>
          </div>
        </div>
      )}
{activeTab === 'TableData' && (
  <div>
    <h2 className="text-3xl font-extrabold mb-4">Table Headers</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Object.keys(filteredTableData[0]).map((key, index) => (
        <div
          key={index}
          className="bg-gray-300 bg-blur p-6 rounded-lg shadow-md"
        >
          <div className="text-xl font-semibold mb-2">{key}</div>
          <div className="text-gray-700">
            Data Type: {typeof filteredTableData[0][key]}
          </div>
        </div>
      ))}
    </div>
  </div>
      )}
    </div>
  ) : (
    <div className="placeholder-message text-center">
      {loading ? (
        <FontAwesomeIcon icon={faPlay} className="play-icon text-5xl text-blue-500 mb-2" />
      ) : (
        <div>
          <FontAwesomeIcon icon={faPlay} className="play-icon text-5xl text-blue-500 mb-2" />
          <p className="placeholder-text text-2xl text-red-600">
            Run a query to display the data
          </p>
        </div>
      )}
    </div>
  )}
</div>
</div>

  );
});

export default ResultDisplay;
