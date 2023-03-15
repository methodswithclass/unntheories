import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorBoundary from './app/components/error/ErrorBoundary';
import './styles/index.scss';
import Home from './app/states/Home';
import Piece from './app/states/Piece';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: 'blogs/:blog',
        element: <Piece />,
      },
    ],
  },
]);

const App = () => {
  return (
    <div className="museo">
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </div>
  );
};

export default App;
