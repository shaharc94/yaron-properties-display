
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");

  const handleSearch = () => {
    if (!searchLocation.trim()) {
      toast.warning("אנא הזן מיקום לחיפוש");
      return;
    }
    
    // In a real app, this would search properties based on filters
    // For now, we'll just redirect to the sale page
    navigate("/sale");
    toast.success("מחפש נכסים עבורך...");
  };

  return (
    <section className="hero-pattern text-white py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            מצאו את הנכס המושלם עבורכם
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            ירון נכסים מתמחה בנכסים באזור המרכז - רמת גן וגבעתיים
          </p>
          
          <div className="bg-white rounded-lg p-4 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Input 
                  placeholder="חיפוש ברמת גן או גבעתיים" 
                  className="w-full text-right text-gray-800"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                />
              </div>
              <div>
                <Select onValueChange={setPropertyType} value={propertyType}>
                  <SelectTrigger>
                    <SelectValue placeholder="סוג נכס" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">דירה</SelectItem>
                    <SelectItem value="house">בית פרטי</SelectItem>
                    <SelectItem value="penthouse">פנטהאוז</SelectItem>
                    <SelectItem value="commercial">נכס מסחרי</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Button 
                  className="w-full bg-realestate-primary hover:bg-realestate-dark"
                  onClick={handleSearch}
                >
                  <Search className="h-4 w-4 ml-2" />
                  חיפוש
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
