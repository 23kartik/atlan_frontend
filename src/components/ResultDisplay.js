import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faFileDownload } from '@fortawesome/free-solid-svg-icons';
import { useQueryContext } from './QueryContextProvider';

const ResultDisplay = () => {
  const { selectedQuery, isClicked, setIsClicked } = useQueryContext();
  const [tableData, setTableData] = useState([]);
  const [errorMessage, setErrorMessage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 5 rows per page
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(itemsPerPage);

  const [csvData, setCsvData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsClicked(false);
    setCurrentPage(1);
    setStartIndex(0);
    setEndIndex(itemsPerPage);
  }, [selectedQuery, setIsClicked]);

  const fetchTableData = () => {
    if (selectedQuery) {
      const tableName = extractTableName(selectedQuery);
      if (tableName) {
        const csvFileName = `${tableName}.csv`;

        setLoading(true);

        // Fetch data from the CSV file
        fetch(`/data/${csvFileName}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.text();
          })
          .then((data) => {
            if (csvData[0] !== data) {
              setCsvData([data, parseCSVData(data)]);
            }
            setErrorMessage([]);
          })
          .catch((error) => {
            setErrorMessage(['Error fetching data']);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setErrorMessage(['Invalid query. Please select a table']);
      }
    }
  };

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

  useEffect(() => {
    fetchTableData();
  }, [selectedQuery]);

  const handleNextPage = () => {
    // Calculate the next page index
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    setStartIndex((nextPage - 1) * itemsPerPage);
    setEndIndex(nextPage * itemsPerPage);
  };

  const handlePrevPage = () => {
    // Calculate the previous page index
    const prevPage = currentPage - 1;
    setCurrentPage(prevPage);
    setStartIndex((prevPage - 1) * itemsPerPage);
    setEndIndex(prevPage * itemsPerPage);
  };

  const exportTableData = () => {
    const csvContent = 'data:text/csv;charset=utf-8,' + csvData[0];
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'table_data.csv');
    link.click();
  };

  return (
    <div className="result-display bg-gray-100 text-gray-800 p-4 rounded-lg shadow-lg">
      {isClicked ? (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-extrabold">Table Data</h2>
            <button
              onClick={exportTableData}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-md flex items-center transition-transform transform hover:scale-105"
            >
              Export <FontAwesomeIcon icon={faFileDownload} className="ml-2" />
            </button>
          </div>
          {csvData[1] && csvData[1].length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-lg">
                <thead className="bg-blue-500 text-white">
                  <tr>
                    {Object.keys(csvData[1][0]).map((key) => (
                      <th className="p-3 text-lg font-semibold" key={key}>
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {csvData[1].slice(startIndex, endIndex).map((row, rowIndex) => (
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
              No data available
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
                endIndex >= csvData[1].length
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white font-semibold py-2 px-4 rounded-full shadow-md transition-transform transform hover:scale-105`}
              onClick={handleNextPage}
              disabled={endIndex >= csvData[1].length}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="placeholder-message text-center">
          {loading ? (
            <FontAwesomeIcon icon={faPlay} className="play-icon text-5xl text-blue-500 mb-2" />
          ) : (
            <div>
              <FontAwesomeIcon icon={faPlay} className="play-icon text-5xl text-blue-500 mb-2" />
              <p className="placeholder-text text-2xl text-red-600">Run a query to display the data</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;
