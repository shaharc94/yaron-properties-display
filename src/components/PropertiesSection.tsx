
import { useState } from "react";
import PropertyCard, { PropertyProps } from "./PropertyCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const properties: PropertyProps[] = [
  {
    id: 1,
    title: "דירת גן מרווחת",
    price: 2750000,
    location: "רחוב הרצל 45, תל אביב",
    bedrooms: 4,
    bathrooms: 2,
    area: 120,
    imageUrl: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    propertyType: "דירת גן",
    isForSale: true
  },
  {
    id: 2,
    title: "פנטהאוז יוקרתי",
    price: 4500000,
    location: "רחוב בן גוריון 78, תל אביב",
    bedrooms: 5,
    bathrooms: 3,
    area: 180,
    imageUrl: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    propertyType: "פנטהאוז",
    isForSale: true
  },
  {
    id: 3,
    title: "דירת 3 חדרים משופצת",
    price: 6500,
    location: "רחוב דיזנגוף 120, תל אביב",
    bedrooms: 3,
    bathrooms: 1,
    area: 85,
    imageUrl: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    propertyType: "דירה",
    isForSale: false
  },
  {
    id: 4,
    title: "בית פרטי עם גינה",
    price: 5800000,
    location: "רחוב האלון 23, הרצליה פיתוח",
    bedrooms: 6,
    bathrooms: 4,
    area: 250,
    imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    propertyType: "בית פרטי",
    isForSale: true
  },
  {
    id: 5,
    title: "דירת סטודיו מעוצבת",
    price: 4800,
    location: "רחוב שינקין 52, תל אביב",
    bedrooms: 1,
    bathrooms: 1,
    area: 40,
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    propertyType: "סטודיו",
    isForSale: false
  },
  {
    id: 6,
    title: "דופלקס מרווח",
    price: 3900000,
    location: "רחוב סוקולוב 45, רמת השרון",
    bedrooms: 5,
    bathrooms: 3,
    area: 160,
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    propertyType: "דופלקס",
    isForSale: true
  }
];

const PropertiesSection = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  const filterProperties = () => {
    if (activeTab === "all") return properties;
    if (activeTab === "sale") return properties.filter(prop => prop.isForSale);
    if (activeTab === "rent") return properties.filter(prop => !prop.isForSale);
    return properties;
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
        
        <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
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
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="sale" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterProperties().map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="rent" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterProperties().map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="text-center mt-10">
          <Button className="bg-realestate-primary hover:bg-realestate-dark">
            צפייה בכל הנכסים
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PropertiesSection;
