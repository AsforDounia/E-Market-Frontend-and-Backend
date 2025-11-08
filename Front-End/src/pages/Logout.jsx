import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect( async () => {
    await logout();           // Clear user/token
    navigate("/login");
  }, [logout, navigate]);

  return null;
};

export default Logout;
