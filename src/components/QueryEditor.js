import React, { useState, useEffect } from 'react';
import { Grid, Paper, Button, TextareaAutosize } from '@mui/material';
import { useQueryContext } from './QueryContextProvider';

const QueryEditor = React.memo(({ onSaveQuery, onExecuteQuery, theme }) => {
  const [query, setQuery] = useState('');
  const { selectedQuery, setSelectedQuery, setIsClicked } = useQueryContext();

  useEffect(() => {
    if (selectedQuery) {
      setQuery(selectedQuery);
    }
  }, [selectedQuery]);

  const executeQuery = () => {
    if (query.trim() !== '') {
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

  const buttonStyles = {
    marginBottom: '8px',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.2s, box-shadow 0.3s',
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper
          elevation={3}
          style={{
            padding: '40px',
            display: 'flex',
            height: '400px',
            width: '100%',
            alignItems: 'stretch',
            backgroundColor: '#D2D3D3',
          }}
        >
          <div className='w-full md:w-2/3 lg:w-3/4 xl:w-2/3 2xl:w-1/2 mb-4 md:mb-0 '>
            <TextareaAutosize
              rowsMin={10}
              value={query}
              onChange={(e) => setSelectedQuery(e.target.value)}
              placeholder="Enter your SQL query"
              style={{
                width: '100%',
                height: '100%',
                padding: '18px',
                border: '1px solid #ccc',
                color: theme === 'light' ? 'black' : 'white',
              }}
            />
          </div>
          <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/3 2xl:w-1/2 mt-2 xs:mt-16 sm:mt-16 md:mt-16 lg:mt-20 xl:mt-24 2xl:mt-28 flex flex-col items-end ml-4 md:ml-4 lg:ml-4 xl:ml-4 2xl:ml-4'>

            <Button
              variant="contained"
              color="primary"
              style={{
                ...buttonStyles,
                backgroundImage: 'linear-gradient(to right, #5A3E92, #7052A1)',
                color: 'white',
              }}
              onClick={executeQuery}
              className='mb-4 w-full md:w-full lg:w-full xl:w-full 2xl:w-full'
            >
              Run
            </Button>
            <Button
              variant="contained"
              color="success"
              style={{
                ...buttonStyles,
                backgroundImage: 'linear-gradient(to right, #41B883, #06A777)',
                color: 'white',
              }}
              onClick={saveQuery}
              className='mb-4 w-full md:w-full lg:w-full xl:w-full 2xl:w-full'
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="error"
              style={{
                ...buttonStyles,
                backgroundImage: 'linear-gradient(to right, #E44D26, #D3392F)',
                color: 'white',
              }}
              onClick={clearQuery}
              className='w-full md:w-full lg:w-full xl:w-full 2xl:w-full'
            >
              Clear
            </Button>
          </div>
        </Paper>
      </Grid>
    </Grid>
  )
});

export default QueryEditor;
