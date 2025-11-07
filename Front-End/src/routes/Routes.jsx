import { Routes, Route } from 'react-router-dom';

// Pages
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />


      {/* 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
