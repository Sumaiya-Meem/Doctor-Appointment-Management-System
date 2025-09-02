import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import logo from '../../assets/images/logo.png';
import toast from "react-hot-toast";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsMenuOpen(false);
    navigate('/');
    toast.success("You have been logged out successfully!");
  };


  const navItem = (
    <>
      <NavLink
        to="/"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "text-white font-bold underline"
            : "text-white hover:text-purple-200"
        }
        onClick={() => setIsMenuOpen(false)}
      >
        Home
      </NavLink>
      
      <NavLink
        to="/about"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "text-white font-bold underline"
            : "text-white hover:text-purple-200"
        }
        onClick={() => setIsMenuOpen(false)}
      >
        About Us
      </NavLink>
      <NavLink
        to="/contact"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "text-white font-bold underline"
            : "text-white hover:text-purple-200"
        }
        onClick={() => setIsMenuOpen(false)}
      >
        Contact Us
      </NavLink>
    </>
  );

  return (
    <header className="sticky top-0 z-50 bg-[#8c3bdb] shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <NavLink to="/" className="flex items-center">
            <img src={logo} className="h-12 mr-3" alt="Logo" />
          </NavLink>

          {/* Laptop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-lg">
            {navItem}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              // User is logged in
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-white">
                  {user.photo_url ? (
                    <img 
                      src={user.photo_url} 
                      alt={user.name} 
                      className="h-8 w-8 rounded-full object-cover border-2 border-white"
                    />
                  ) : (
                    <FaUserCircle className="h-8 w-8" />
                  )}
                  <div className="text-sm">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-purple-700 hover:bg-purple-800 text-white py-2 px-4 rounded-3xl font-medium flex items-center space-x-1"
                >
                  <FaSignOutAlt className="inline mr-1" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              // User is not logged in
              <NavLink
                to="/login"
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? "bg-purple-600 text-white py-2 px-4 rounded-3xl font-medium border-[1px]"
                    : "bg-purple-600 text-white py-2 px-4 rounded-3xl font-medium border-[1px] hover:bg-purple-700"
                }
              >
                Sign In
              </NavLink>
            )}
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-2xl text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-purple-400">
            <nav className="flex flex-col space-y-4">
              {navItem}
              <div className="pt-4 border-t border-purple-400">
                {user ? 
                (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-white p-2 bg-purple-700 rounded-lg">
                      {user.photo_url ? (
                        <img 
                          src={user.photo_url} 
                          alt={user.name} 
                          className="h-10 w-10 rounded-full object-cover border-2 border-white"
                        />
                  ) : (
                        <FaUserCircle className="h-10 w-10" />
                      )}
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full bg-purple-700 hover:bg-purple-800 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center space-x-1"
                    >
                      <FaSignOutAlt className="inline mr-1" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <NavLink
                    to="/login"
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? "bg-purple-500 border-[1px] text-white py-2 px-4 rounded-lg font-medium block text-center"
                        : "bg-purple-500 border-[1px] text-white py-2 px-4 rounded-lg font-medium block text-center hover:bg-purple-600"
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </NavLink>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;