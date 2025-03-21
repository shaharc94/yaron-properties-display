
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertiesSection from "@/components/PropertiesSection";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";

const Sale = () => {
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
                <BreadcrumbLink href="/sale">נכסים למכירה</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        <div className="container mx-auto px-4 pb-8">
          <h1 className="text-3xl font-bold text-realestate-primary mb-6 text-right">נכסים למכירה</h1>
          <p className="text-gray-600 mb-8 text-right">
            מצאו את הנכס המושלם למכירה באזור המרכז. אנו מציעים דירות, פנטהאוזים, דופלקסים ובתים פרטיים ברמת גן וגבעתיים.
          </p>
        </div>
        
        <PropertiesSection filterType="sale" />
      </main>
      <Footer />
    </div>
  );
};

export default Sale;
