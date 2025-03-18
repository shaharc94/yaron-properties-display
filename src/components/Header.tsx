
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-realestate-primary">ירון נכסים</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 space-x-reverse">
          <Button variant="link" className="text-realestate-dark hover:text-realestate-primary font-medium">
            דף הבית
          </Button>
          <Button variant="link" className="text-realestate-dark hover:text-realestate-primary font-medium">
            נכסים למכירה
          </Button>
          <Button variant="link" className="text-realestate-dark hover:text-realestate-primary font-medium">
            נכסים להשכרה
          </Button>
          <Button variant="link" className="text-realestate-dark hover:text-realestate-primary font-medium">
            אודות
          </Button>
          <Button variant="link" className="text-realestate-dark hover:text-realestate-primary font-medium">
            צור קשר
          </Button>
          <Button className="bg-realestate-primary hover:bg-realestate-dark text-white mr-4">
            <Phone className="h-4 w-4 ml-2" />
            התקשרו עכשיו
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
            <Button variant="ghost" className="justify-start text-realestate-dark hover:text-realestate-primary font-medium">
              דף הבית
            </Button>
            <Button variant="ghost" className="justify-start text-realestate-dark hover:text-realestate-primary font-medium">
              נכסים למכירה
            </Button>
            <Button variant="ghost" className="justify-start text-realestate-dark hover:text-realestate-primary font-medium">
              נכסים להשכרה
            </Button>
            <Button variant="ghost" className="justify-start text-realestate-dark hover:text-realestate-primary font-medium">
              אודות
            </Button>
            <Button variant="ghost" className="justify-start text-realestate-dark hover:text-realestate-primary font-medium">
              צור קשר
            </Button>
            <Button className="bg-realestate-primary hover:bg-realestate-dark text-white mt-2">
              <Phone className="h-4 w-4 ml-2" />
              התקשרו עכשיו
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
