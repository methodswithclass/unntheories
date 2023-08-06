import { Routes, Route } from 'react-router-dom';
import Home from '../states/Home';
import Piece from '../states/Piece';

const routes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blogs/:blog" element={<Piece />} />
    </Routes>
  );
};

export default routes;
