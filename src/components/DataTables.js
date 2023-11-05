import React, { useState ,useEffect} from 'react';
import { HiDatabase, HiOutlineUpload } from 'react-icons/hi';
import Papa from 'papaparse';
import { useQueryContext } from './QueryContextProvider';

const DataTables = () => {
  const [selectedCsv, setSelectedCsv] = useState(null); // Initialize with null
  const { setSelectedQuery } = useQueryContext();
  const tableNames = [
    "categories",
    "customers",
    "dataOutput",
    "employee_territories",
    "employees",
    "order_details",
    "orders",
    "products",
    "regions",
    "shippers",
    "suppliers",
    "territories"
  ];

  const [importedData, setImportedData] = useState([]);
  const [importedCsvName, setImportedCsvName] = useState(null);

  // Handle CSV selection
  const handleCsvSelection = (csvFileName) => {
    setSelectedCsv(csvFileName);
    setSelectedQuery(`SELECT * FROM ${csvFileName}`);
  };
  useEffect(() => {
    handleCsvSelection(""); // Choose a default table here
  }, []); // Call it on component mount

  const handleCsvFileImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Extract the file name without the ".csv" extension
      const fileName = file.name.replace('.csv', '');

      Papa.parse(file, {
        complete: (result) => {
          // This will log the parsed CSV data to the console
          console.log('Parsed CSV Data:', result.data);
          // Process the CSV data as needed
          setImportedData(result.data);
          setImportedCsvName(fileName);
          setSelectedCsv(fileName);
          setSelectedQuery(`SELECT * FROM ${fileName}`);
        },
        header: true, // Assumes the first row is the header
      });
      // Set the selected CSV file name
      setSelectedCsv(fileName);
    }
  };

  return (
    <div className="data-tables">
      <div className="sidebar bg-white shadow-md p-4 rounded-lg">
        <div className="flex items-center mb-4">
          <HiDatabase size={24} className="text-gray-600" />
          <h2 className="text-xl font-semibold ml-2">Data Tables</h2>
          <label htmlFor="csvFileInput" className="cursor-pointer ml-4">
            <div className="flex items-center ml-32">
              <HiOutlineUpload size={24} className="text-pink-500" /> 
              <span className="text-xl font-semibold text-pink-500">Import</span>
            </div>
          </label>
          <input
            type="file"
            id="csvFileInput"
            accept=".csv"
            style={{ display: 'none' }}
            onChange={handleCsvFileImport}
          />
        </div>
        <ul className="pl-0 space-y-2 max-h-[12rem] overflow-y-auto">
          {importedCsvName ? ( 
            <li
              className={`${
                selectedCsv === importedCsvName
                  ? 'bg-pink-100 text-pink-700'
                  : 'bg-gray-100 text-gray-700'
              } p-2 rounded cursor-pointer hover:bg-pink-100 transition-all duration-300`}
              onClick={() => handleCsvSelection(importedCsvName)}
            >
              {importedCsvName}
            </li>
          ) : null}
          {tableNames.map((tableName) => (
            <li
              key={tableName}
              className={`${
                selectedCsv === tableName
                  ? 'bg-pink-100 text-pink-700'
                  : 'bg-gray-100 text-gray-700'
              } p-2 rounded cursor-pointer hover-bg-pink-100 transition-all duration-300`}
              onClick={() => handleCsvSelection(tableName)}
            >
              {tableName}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DataTables;
