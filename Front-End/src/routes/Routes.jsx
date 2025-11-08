import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';
import PublicRoute from '../components/common/PublicRoute';
import { useAuth } from '../hooks/useAuth';
import Logout from '../pages/Logout';
// Import PrivateRoute if you have one for protected routes

const AppRoutes = () => {
  const {logout} = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/logout' element={<Logout />} />
      
      {/* Public routes - redirect if authenticated */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      

      {/* Protected routes */}
      <Route path="/profile" element={<Profile />} />
      
      {/* 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;