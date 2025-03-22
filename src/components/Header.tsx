
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Lock } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/">
            <h1 className="text-2xl font-bold text-realestate-primary">ירון נכסים</h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 space-x-reverse">
          <Button 
            variant="link" 
            className={`font-medium ${isActive('/') ? 'text-realestate-primary' : 'text-realestate-dark hover:text-realestate-primary'}`}
            asChild
          >
            <Link to="/">דף הבית</Link>
          </Button>
          <Button 
            variant="link" 
            className={`font-medium ${isActive('/sale') ? 'text-realestate-primary' : 'text-realestate-dark hover:text-realestate-primary'}`}
            asChild
          >
            <Link to="/sale">נכסים למכירה</Link>
          </Button>
          <Button 
            variant="link" 
            className={`font-medium ${isActive('/rent') ? 'text-realestate-primary' : 'text-realestate-dark hover:text-realestate-primary'}`}
            asChild
          >
            <Link to="/rent">נכסים להשכרה</Link>
          </Button>
          <Button 
            variant="link" 
            className={`font-medium ${isActive('/about') ? 'text-realestate-primary' : 'text-realestate-dark hover:text-realestate-primary'}`}
            asChild
          >
            <Link to="/about">אודות</Link>
          </Button>
          <Button 
            variant="link" 
            className={`font-medium ${isActive('/contact') ? 'text-realestate-primary' : 'text-realestate-dark hover:text-realestate-primary'}`}
            asChild
          >
            <Link to="/contact">צור קשר</Link>
          </Button>
          <Button className="bg-realestate-primary hover:bg-realestate-dark text-white mr-4" asChild>
            <Link to="/contact">
              <Phone className="h-4 w-4 ml-2" />
              התקשרו עכשיו
            </Link>
          </Button>
          <Button 
            variant="outline" 
            className="border-realestate-primary text-realestate-primary hover:bg-realestate-primary hover:text-white" 
            asChild
          >
            <Link to="/admin">
              <Lock className="h-4 w-4 ml-2" />
              ניהול
            </Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white pb-4 px-4">
          <div className="flex flex-col space-y-2">
            <Button 
              variant="ghost" 
              className={`justify-start font-medium ${isActive('/') ? 'text-realestate-primary' : 'text-realestate-dark hover:text-realestate-primary'}`}
              asChild
              onClick={() => setIsMenuOpen(false)}
            >
              <Link to="/">דף הבית</Link>
            </Button>
            <Button 
              variant="ghost" 
              className={`justify-start font-medium ${isActive('/sale') ? 'text-realestate-primary' : 'text-realestate-dark hover:text-realestate-primary'}`}
              asChild
              onClick={() => setIsMenuOpen(false)}
            >
              <Link to="/sale">נכסים למכירה</Link>
            </Button>
            <Button 
              variant="ghost" 
              className={`justify-start font-medium ${isActive('/rent') ? 'text-realestate-primary' : 'text-realestate-dark hover:text-realestate-primary'}`}
              asChild
              onClick={() => setIsMenuOpen(false)}
            >
              <Link to="/rent">נכסים להשכרה</Link>
            </Button>
            <Button 
              variant="ghost" 
              className={`justify-start font-medium ${isActive('/about') ? 'text-realestate-primary' : 'text-realestate-dark hover:text-realestate-primary'}`}
              asChild
              onClick={() => setIsMenuOpen(false)}
            >
              <Link to="/about">אודות</Link>
            </Button>
            <Button 
              variant="ghost" 
              className={`justify-start font-medium ${isActive('/contact') ? 'text-realestate-primary' : 'text-realestate-dark hover:text-realestate-primary'}`}
              asChild
              onClick={() => setIsMenuOpen(false)}
            >
              <Link to="/contact">צור קשר</Link>
            </Button>
            <Button 
              className="bg-realestate-primary hover:bg-realestate-dark text-white mt-2"
              asChild
              onClick={() => setIsMenuOpen(false)}
            >
              <Link to="/contact">
                <Phone className="h-4 w-4 ml-2" />
                התקשרו עכשיו
              </Link>
            </Button>
            <Button 
              variant="outline" 
              className="border-realestate-primary text-realestate-primary hover:bg-realestate-primary hover:text-white mt-2"
              asChild
              onClick={() => setIsMenuOpen(false)}
            >
              <Link to="/admin">
                <Lock className="h-4 w-4 ml-2" />
                ניהול
              </Link>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
