import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { NotFound } from "../pages/NotFound";
import { TodoList } from "../pages/TodoList";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<TodoList />} />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/not-found" replace />} />
    </Routes>
  );
};

export default AppRouter;
