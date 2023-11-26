import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './tailwind.css';
import  QueryContextProvider  from './components/QueryContextProvider';

const App = lazy(() => import('./App'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <QueryContextProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <App />
      </Suspense>
    </QueryContextProvider>
  // </React.StrictMode>
);
