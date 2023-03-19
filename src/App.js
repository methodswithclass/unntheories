import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorBoundary from './app/components/error/ErrorBoundary';
import './styles/index.scss';
import Home, { loader as homeLoader } from './app/states/Home';
import Piece, { loader as pieceLoader } from './app/states/Piece';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    loader: homeLoader,
  },
  {
    path: 'blogs/:blog',
    element: <Piece />,
    loader: pieceLoader,
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
