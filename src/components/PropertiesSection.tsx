
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropertyCard from "./PropertyCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { fetchProperties, fetchPropertiesForSale, fetchPropertiesForRent } from "@/services/propertyService";
import { PropertyProps } from "@/components/PropertyCard";

interface PropertiesSectionProps {
  filterType?: "all" | "sale" | "rent";
}

const PropertiesSection = ({ filterType = "all" }: PropertiesSectionProps) => {
  const [activeTab, setActiveTab] = useState<"all" | "sale" | "rent">(filterType);
  const [properties, setProperties] = useState<PropertyProps[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  // Update active tab when filterType prop changes
  useEffect(() => {
    setActiveTab(filterType);
  }, [filterType]);
  
  useEffect(() => {
    const loadProperties = async () => {
      setLoading(true);
      try {
        let data: PropertyProps[] = [];
        
        switch (activeTab) {
          case "all":
            data = await fetchProperties();
            break;
          case "sale":
            data = await fetchPropertiesForSale();
            break;
          case "rent":
            data = await fetchPropertiesForRent();
            break;
        }
        
        setProperties(data);
      } catch (error) {
        console.error("Failed to load properties:", error);
        toast({
          title: "שגיאה בטעינת הנכסים",
          description: "לא ניתן לטעון את רשימת הנכסים כרגע. אנא נסה שוב מאוחר יותר.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadProperties();
  }, [activeTab, toast]);

  // This handler ensures type safety
  const handleTabChange = (value: string) => {
    setActiveTab(value as "all" | "sale" | "rent");
  };

  const renderProperties = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-realestate-primary" />
        </div>
      );
    }

    if (properties.length === 0) {
      return (
        <div className="text-center py-16">
          <p className="text-lg text-gray-600">לא נמצאו נכסים תואמים.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <Link to={`/property/${property.id}`} key={property.id}>
            <PropertyCard {...property} />
          </Link>
        ))}
      </div>
    );
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
            {renderProperties()}
          </TabsContent>
          
          <TabsContent value="sale" className="mt-8">
            {renderProperties()}
          </TabsContent>
          
          <TabsContent value="rent" className="mt-8">
            {renderProperties()}
          </TabsContent>
        </Tabs>
        
        <div className="text-center mt-10">
          {activeTab === "all" && (
            <Button className="bg-realestate-primary hover:bg-realestate-dark" asChild>
              <Link to="/sale">צפייה בכל הנכסים למכירה</Link>
            </Button>
          )}
          {activeTab === "sale" && (
            <Button className="bg-realestate-primary hover:bg-realestate-dark" asChild>
              <Link to="/rent">צפייה בנכסים להשכרה</Link>
            </Button>
          )}
          {activeTab === "rent" && (
            <Button className="bg-realestate-primary hover:bg-realestate-dark" asChild>
              <Link to="/sale">צפייה בנכסים למכירה</Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default PropertiesSection;
