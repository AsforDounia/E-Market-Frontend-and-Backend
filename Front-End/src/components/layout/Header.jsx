import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Avatar, Button, Dropdown, DropdownItem, LogoWithText } from '../common';
import { AiOutlineUser, AiOutlineLogout } from 'react-icons/ai';

const Header = () => {
  const { isAuthenticated, user } = useAuth();
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
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-gray-700 hidden md:block">
                  Bonjour, {user?.fullname}
                </span>
                
                <Dropdown 
                  trigger={
                    <Avatar 
                      avatarUrl={user?.avatarUrl} 
                      fullname={user?.fullname} 
                      size="md"
                      className="cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
                    />
                  }
                  position="right"
                >
                  <DropdownItem 
                    icon={<AiOutlineUser className="w-5 h-5" />}
                    onClick={() => window.location.href = '/profile'}
                  >
                    Mon Profil
                  </DropdownItem>
                  
                  <div className="border-t border-gray-200 my-1"></div>
                  
                  <DropdownItem 
                    icon={<AiOutlineLogout className="w-5 h-5" />}
                    onClick={() => window.location.href = '/logout'}
                    className="text-red-600 hover:bg-red-50"
                  >
                    Déconnexion
                  </DropdownItem>
                </Dropdown>
              </>
            ) : (
              <>
                {isAuthPage ? (
                  <Link to="/">
                    <Button size="md">Accueil</Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/login">
                      <Button variant="ghost" size="md">
                        Connexion
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button size="md">Inscription</Button>
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