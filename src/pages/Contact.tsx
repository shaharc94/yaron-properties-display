
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    
    // Show success toast
    toast({
      title: "הטופס נשלח בהצלחה",
      description: "נחזור אליך בהקדם האפשרי",
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: ""
    });
  };

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
                <BreadcrumbLink href="/contact">צור קשר</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-realestate-primary mb-12 text-center">צור קשר</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-right">פרטי התקשרות</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-end">
                  <div className="text-right">
                    <p className="font-semibold">כתובת המשרד</p>
                    <p className="text-gray-600">רחוב אבן גבירול 30, תל אביב</p>
                  </div>
                  <MapPin className="h-8 w-8 ml-4 text-realestate-primary" />
                </div>
                
                <div className="flex items-center justify-end">
                  <div className="text-right">
                    <p className="font-semibold">טלפון</p>
                    <p className="text-gray-600">03-1234567</p>
                  </div>
                  <Phone className="h-8 w-8 ml-4 text-realestate-primary" />
                </div>
                
                <div className="flex items-center justify-end">
                  <div className="text-right">
                    <p className="font-semibold">דוא"ל</p>
                    <p className="text-gray-600">info@yaronproperties.com</p>
                  </div>
                  <Mail className="h-8 w-8 ml-4 text-realestate-primary" />
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4 text-right">שעות פעילות</h3>
                <div className="space-y-2 text-right">
                  <p><span className="font-semibold">ראשון - חמישי:</span> 9:00 - 18:00</p>
                  <p><span className="font-semibold">שישי:</span> 9:00 - 13:00</p>
                  <p><span className="font-semibold">שבת:</span> סגור</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-right">טופס יצירת קשר</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4 text-right">
                <div>
                  <label className="block text-gray-700 mb-2">שם מלא</label>
                  <Input
                    dir="rtl"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">דוא"ל</label>
                  <Input
                    dir="rtl"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">טלפון</label>
                  <Input
                    dir="rtl"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">הודעה</label>
                  <Textarea
                    dir="rtl"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full min-h-[120px]"
                  />
                </div>
                
                <Button
                  type="submit"
                  className="bg-realestate-primary hover:bg-realestate-dark text-white w-full"
                >
                  שליחה
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
