import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LogoWithText from '../common/LogoWithText';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const isAuthPage = ['/login', '/register', '/forgot-password'].includes(location.pathname);

  return (
    <header className="bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              <LogoWithText />
            </Link>
            {/* <div className="ml-10 flex space-x-8">
              <Link
                to="/"
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Accueil
              </Link>
            </div> */}
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-gray-700">
                  Bonjour, {user?.fullname}
                </span>
                <button
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                {isAuthPage ? (
                    <Link
                      to="/"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                    >
                      Accueil
                    </Link>
                ):(
                  <>
                    <Link
                      to="/login"
                      className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Connexion
                    </Link>
                    <Link
                      to="/register"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                    >
                      Inscription
                    </Link>
                  </>
              )}
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
