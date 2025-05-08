
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  onToggleHistory: () => void;
}

const Header = ({ onToggleHistory }: HeaderProps) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm px-4 py-3 mb-6">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-clearchat-blue">ClearChat</span>
          <span className="hidden md:inline text-gray-500">Clarify</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <Button 
            variant="ghost" 
            onClick={onToggleHistory}
            className="text-gray-600 hover:text-clearchat-blue hover:bg-blue-50"
          >
            History
          </Button>

          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link to="/profile">
                <Button variant="ghost" className="text-gray-600 hover:text-clearchat-blue hover:bg-blue-50">
                  Profile
                </Button>
              </Link>
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost" className="text-gray-600 hover:text-clearchat-blue hover:bg-blue-50">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="outline">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-md z-10 py-2 px-4">
          <nav className="flex flex-col space-y-2">
            <Button 
              variant="ghost" 
              onClick={() => {
                onToggleHistory();
                setMobileMenuOpen(false);
              }}
              className="justify-start"
            >
              History
            </Button>

            {isAuthenticated ? (
              <>
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    Profile
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    Login
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full justify-start">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
