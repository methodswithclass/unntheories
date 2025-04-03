import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router";
import Home from "../states/Home";
import Piece from "../states/Piece";
import Login from "../states/Login";
import AdminList from "../states/AdminList";
import AdminView from "../states/AdminView";

const Root = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/home");
  }, []);
  return <div>an error has occured</div>;
};

const routes = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/blogs/:blog" element={<Piece />} />
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin/:blog" element={<AdminView />} />
      <Route path="/admin/create" element={<AdminView />} />
      <Route path="/admin" element={<AdminList />} />
      <Route path="/" element={<Root />} />
    </Routes>
  );
};

export default routes;
