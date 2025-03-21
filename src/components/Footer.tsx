
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-realestate-primary text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">ירון נכסים</h3>
            <p className="text-gray-300 mb-4">
              חברת תיווך מובילה המתמחה במכירה והשכרה של נכסים ברחבי הארץ.
              אנו מחויבים לעזור לכם למצוא את הנכס המושלם עבורכם.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">ניווט מהיר</h3>
            <ul className="space-y-2 text-right">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white block">דף הבית</Link>
              </li>
              <li>
                <Link to="/sale" className="text-gray-300 hover:text-white block">נכסים למכירה</Link>
              </li>
              <li>
                <Link to="/rent" className="text-gray-300 hover:text-white block">נכסים להשכרה</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white block">אודות</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white block">צור קשר</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">צור קשר</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <MapPin className="h-5 w-5 ml-2 text-realestate-secondary" />
                <span>רחוב אבן גבירול 30, תל אביב</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 ml-2 text-realestate-secondary" />
                <span>03-1234567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 ml-2 text-realestate-secondary" />
                <span>info@yaronproperties.com</span>
              </li>
            </ul>
            
            <div className="mt-4">
              <h4 className="text-lg font-bold mb-2">שעות פעילות</h4>
              <ul className="space-y-1">
                <li className="flex justify-between">
                  <span>ראשון - חמישי</span>
                  <span>9:00 - 18:00</span>
                </li>
                <li className="flex justify-between">
                  <span>שישי</span>
                  <span>9:00 - 13:00</span>
                </li>
                <li className="flex justify-between">
                  <span>שבת</span>
                  <span>סגור</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} ירון נכסים. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
