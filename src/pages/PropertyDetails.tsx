
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, MapPin, Hotel, Bath, SquareFoot, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { properties } from "@/data/properties";

const PropertyDetails = () => {
  const { id } = useParams();
  const property = properties.find(p => p.id === Number(id));

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">הנכס לא נמצא</h1>
            <p className="mb-6">הנכס המבוקש אינו קיים במערכת</p>
            <Button className="bg-realestate-primary hover:bg-realestate-dark" asChild>
              <a href="/">חזרה לדף הבית</a>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  <Home className="h-4 w-4 ml-1" />
                  דף הבית
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={property.isForSale ? "/sale" : "/rent"}>
                  {property.isForSale ? "נכסים למכירה" : "נכסים להשכרה"}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>{property.title}</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        <div className="container mx-auto px-4 py-6">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-[400px] relative">
              <img 
                src={property.imageUrl} 
                alt={property.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-realestate-primary text-white px-4 py-2 rounded-md">
                {property.isForSale ? "למכירה" : "להשכרה"}
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="text-right">
                  <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
                  <div className="flex items-center text-gray-600">
                    <p>{property.location}</p>
                    <MapPin className="h-5 w-5 mr-2" />
                  </div>
                </div>
                
                <div className="text-left">
                  <p className="text-3xl font-bold text-realestate-primary">
                    {property.isForSale 
                      ? `₪${property.price.toLocaleString()}` 
                      : `₪${property.price.toLocaleString()} / חודש`}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <Hotel className="h-6 w-6 mx-auto mb-2 text-realestate-primary" />
                    <p className="text-gray-900 font-semibold">{property.bedrooms} חדרים</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <Bath className="h-6 w-6 mx-auto mb-2 text-realestate-primary" />
                    <p className="text-gray-900 font-semibold">{property.bathrooms} חדרי רחצה</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <SquareFoot className="h-6 w-6 mx-auto mb-2 text-realestate-primary" />
                    <p className="text-gray-900 font-semibold">{property.area} מ"ר</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-right">תיאור הנכס</h2>
                <p className="text-gray-700 text-right leading-relaxed">
                  {property.propertyType} מרהיב{property.propertyType === "דירה" || property.propertyType === "דירת גן" ? "ה" : ""} 
                  {" "}{property.bedrooms} חדרים ב{property.location}. הנכס כולל {property.bathrooms} חדרי רחצה 
                  ומשתרע על פני {property.area} מ"ר. מיקום מצוין, קרוב לכל השירותים המרכזיים, 
                  תחבורה ציבורית, מרכזי קניות ומוסדות חינוך. עיצוב מודרני ומרווח, הרבה אור טבעי, 
                  ואווירה נעימה. מתאים למשפחות ולזוגות הבית מתוחזק ברמה גבוהה ומוכן למגורים באופן מיידי.
                </p>
              </div>
              
              <div className="text-center">
                <Button className="bg-realestate-primary hover:bg-realestate-dark text-white px-8 py-4 text-lg">
                  <Phone className="h-5 w-5 ml-2" />
                  צור קשר לגבי הנכס
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PropertyDetails;
