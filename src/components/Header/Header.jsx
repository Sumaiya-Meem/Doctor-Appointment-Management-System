import { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import logo from '../../assets/images/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItem = (
    <>
      <NavLink
        to="/"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "text-white font-bold underline"
            : "text-white "
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
            : "text-white "
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
            : "text-white "
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
            <NavLink
              to=""
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "bg-purple-600 text-white py-2 px-4 rounded-3xl font-medium border-[1px]"
                  : "bg-purple-600 text-white py-2 px-4 rounded-3xl font-medium border-[1px]"
              }
            >
              Sign In
            </NavLink>
          </div>

          {/* Mobile menu*/}
          <button 
            className="md:hidden text-2xl text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              {navItem}
              <div className="pt-4  border-gray-200">
                
                <NavLink
                  to=""
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "bg-purple-500 border-[1px] text-white py-2 px-4 rounded-lg font-medium block text-center"
                      : "bg-purple-500 border-[1px] text-white py-2 px-4 rounded-lg font-medium block text-center"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </NavLink>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;