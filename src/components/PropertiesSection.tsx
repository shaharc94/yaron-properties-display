
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropertyCard from "./PropertyCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { properties } from "@/data/properties";

interface PropertiesSectionProps {
  filterType?: "all" | "sale" | "rent";
}

const PropertiesSection = ({ filterType = "all" }: PropertiesSectionProps) => {
  const [activeTab, setActiveTab] = useState<"all" | "sale" | "rent">(filterType);
  
  // Update active tab when filterType prop changes
  useEffect(() => {
    setActiveTab(filterType);
  }, [filterType]);
  
  const filterProperties = () => {
    if (activeTab === "all") return properties;
    if (activeTab === "sale") return properties.filter(prop => prop.isForSale);
    if (activeTab === "rent") return properties.filter(prop => !prop.isForSale);
    return properties;
  };

  // This handler ensures type safety
  const handleTabChange = (value: string) => {
    setActiveTab(value as "all" | "sale" | "rent");
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-realestate-primary mb-4">הנכסים שלנו</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            אנו מציעים מגוון רחב של נכסים באזורים המבוקשים ביותר בישראל. בין אם אתם מחפשים לקנות, למכור או לשכור, יש לנו את הנכס המושלם עבורכם.
          </p>
        </div>
        
        <Tabs defaultValue={activeTab} className="mb-8" onValueChange={handleTabChange} value={activeTab}>
          <div className="flex justify-center">
            <TabsList>
              <TabsTrigger value="all">כל הנכסים</TabsTrigger>
              <TabsTrigger value="sale">למכירה</TabsTrigger>
              <TabsTrigger value="rent">להשכרה</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterProperties().map((property) => (
                <Link to={`/property/${property.id}`} key={property.id}>
                  <PropertyCard {...property} />
                </Link>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="sale" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterProperties().map((property) => (
                <Link to={`/property/${property.id}`} key={property.id}>
                  <PropertyCard {...property} />
                </Link>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="rent" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterProperties().map((property) => (
                <Link to={`/property/${property.id}`} key={property.id}>
                  <PropertyCard {...property} />
                </Link>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="text-center mt-10">
          <Button className="bg-realestate-primary hover:bg-realestate-dark" asChild>
            {activeTab === "all" && <Link to="/sale">צפייה בכל הנכסים למכירה</Link>}
            {activeTab === "sale" && <Link to="/rent">צפייה בנכסים להשכרה</Link>}
            {activeTab === "rent" && <Link to="/sale">צפייה בנכסים למכירה</Link>}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PropertiesSection;
