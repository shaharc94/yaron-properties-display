import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { PropertyProps } from "../PropertyCard";
import { createProperty, updateProperty } from "@/services/property";
import PropertyFormHeader from "./PropertyFormHeader";
import PropertyFormContent from "./PropertyFormContent";
import PropertyFormActions from "./PropertyFormActions";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PropertyFormProps {
  property: PropertyProps | null;
  onSave: (property: PropertyProps) => void;
  onCancel: () => void;
}

const PropertyFormContainer = ({ property, onSave, onCancel }: PropertyFormProps) => {
  const emptyProperty: PropertyProps = {
    id: 0,
    title: "",
    price: 0,
    location: "",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    imageUrl: "",
    propertyType: "",
    isForSale: true
  };

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<PropertyProps>(
    property ? JSON.parse(JSON.stringify(property)) : { ...emptyProperty }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'number') {
      setFormData({
        ...formData,
        [name]: Number(value)
      });
    } else if (name === 'isForSale') {
      setFormData({
        ...formData,
        isForSale: value === 'true'
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const validateImageUrl = (url: string): string => {
    if (!url) return "נדרשת כתובת URL לתמונה";
    
    if (url.startsWith('http://') || url.startsWith('https://')) return "";
    
    if (url.startsWith('?') || url.startsWith('&')) {
      return "כתובת URL לא תקינה. נדרשת כתובת מלאה המתחילה ב-https://";
    }
    
    return "כתובת URL לא תקינה. נדרשת כתובת מלאה המתחילה ב-https://";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const imageUrlError = validateImageUrl(formData.imageUrl);
    if (imageUrlError) {
      setError(imageUrlError);
      setLoading(false);
      toast({
        title: "שגיאה בשמירת הנכס",
        description: imageUrlError,
        variant: "destructive",
      });
      return;
    }
    
    try {
      const propertyToSave = JSON.parse(JSON.stringify(formData));
      console.log("Before save - Property to save:", propertyToSave);
      
      let savedProperty: PropertyProps | null;
      
      if (property && property.id) {
        propertyToSave.id = property.id;
        
        console.log("Sending property update with ID:", propertyToSave.id);
        
        savedProperty = await updateProperty(propertyToSave);
        console.log("Response from updateProperty:", savedProperty);
        
        if (savedProperty) {
          setFormData(savedProperty);
          
          toast({
            title: "הנכס עודכן בהצלחה",
            description: "פרטי הנכס עודכנו בהצלחה במערכת",
          });
          onSave(savedProperty);
        } else {
          throw new Error("Failed to update property");
        }
      } else {
        savedProperty = await createProperty(propertyToSave);
        console.log("Response from createProperty:", savedProperty);
        
        if (savedProperty) {
          toast({
            title: "הנכס נוסף בהצלחה",
            description: "הנכס החדש נוסף בהצלחה למערכת",
          });
          onSave(savedProperty);
        } else {
          throw new Error("Failed to create property");
        }
      }
    } catch (error) {
      console.error("Error saving property:", error);
      setError("שגיאה בשמירת הנכס. אנא נסה שוב מאוחר יותר.");
      toast({
        title: "שגיאה בשמירת הנכס",
        description: "אירעה שגיאה בשמירת הנכס. אנא נסה שוב מאוחר יותר.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
      <PropertyFormHeader property={property} />
      
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <PropertyFormContent 
        formData={formData} 
        handleChange={handleChange} 
      />
      
      <PropertyFormActions 
        loading={loading} 
        onCancel={onCancel} 
      />
    </form>
  );
};

export default PropertyFormContainer;
