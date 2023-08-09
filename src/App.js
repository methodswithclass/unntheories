import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import ErrorBoundary from './app/components/error/ErrorBoundary';
import Routes from './app/routes';
import { overrideConsole } from './app/utils/utils';
import './styles/index.scss';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 15 } },
});

const App = () => {
  const { REACT_APP_ENV: env } = process.env;
  if (env !== 'local') {
    overrideConsole();
  }
  return (
    <div className="museo">
      <ErrorBoundary>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <Routes />
          </QueryClientProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </div>
  );
};

export default App;
