import React, { useState, useEffect } from 'react';
import { Grid, Paper, Button, TextareaAutosize } from '@mui/material';
import { useQueryContext } from './QueryContextProvider';

const QueryEditor = ({  onSaveQuery, onExecuteQuery, theme }) => {
  const [query, setQuery] = useState('');
  const { selectedQuery,setSelectedQuery,setIsClicked } = useQueryContext();
  useEffect(() => {
    if (selectedQuery) {
      setQuery(selectedQuery);
    }
  }, [selectedQuery]);

  const executeQuery = () => {
    if (query.trim() !== '') {
      onSaveQuery(query);
      onExecuteQuery(query);
      setIsClicked(true);
    }
  };

  const saveQuery = () => {
    if (query.trim() !== '') {
      onSaveQuery(query);
     
    }
  };

  const clearQuery = () => {
    setQuery('');
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: '40px', display: 'flex', height: '400px', width: '100%', alignItems: 'stretch', backgroundColor: '#D2D3D3' }}>
          <div className='w-full md:w-2/3 lg:w-3/4 xl:w-2/3 2xl:w-1/2 mb-4 md:mb-0 '>
            <TextareaAutosize
              rowsMin={10}
              value={query}
              onChange={(e) => setSelectedQuery(e.target.value)}
              placeholder="Enter your SQL query"
              style={{
                width: '120%',
                height: '100%',
                padding: '18px',
                border: '1px solid #ccc',
                color: theme === 'light' ? 'black' : 'white',
              }}
            />
          </div>
          <div className='w-full md:w-1/3 lg:w-1/4 xl:w-1/3 2xl:w-1/2 mt-4 md:mt-16 flex flex-col items-end'>
            <Button variant="contained" color="primary" onClick={executeQuery} className='mb-4 w-full md:w-1/2 lg:w-2/3 xl:w-1/2 2xl:w-3/4 ' style={{ marginBottom: '8px' }}>
              Run
            </Button>
            <Button variant="contained" onClick={saveQuery} className='mb-4 w-full md:w-1/2 lg:w-2/3 xl:w-1/2 2xl:w-3/4' style={{ marginBottom: '8px' }}>
              Save
            </Button>
            <Button variant="contained" onClick={clearQuery} className='w-full md:w-1/2 lg:w-2/3 xl:w-1/2 2xl:w-3/4'>
              Clear
            </Button>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default QueryEditor;