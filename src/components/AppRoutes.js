import React from "react";
import { Routes, Route } from "react-router-dom";
import Chat from "./Chat";
import Home from "./Home";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/chat" element={<Chat/>}/>
    </Routes>
  );
};

export default AppRoutes;
