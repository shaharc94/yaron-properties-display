
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { PropertyProps } from "./PropertyCard";
import { createProperty, updateProperty } from "@/services/propertyService";
import { Loader2 } from "lucide-react";

interface PropertyFormProps {
  property: PropertyProps | null;
  onSave: (property: PropertyProps) => void;
  onCancel: () => void;
}

const PropertyForm = ({ property, onSave, onCancel }: PropertyFormProps) => {
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

  const [formData, setFormData] = useState<PropertyProps>(property || emptyProperty);

  useEffect(() => {
    setFormData(property || emptyProperty);
  }, [property]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      let savedProperty: PropertyProps | null;
      
      if (property && property.id) {
        // Make sure we're sending the correct property ID
        const propertyToUpdate = {
          ...formData,
          id: property.id
        };
        
        savedProperty = await updateProperty(propertyToUpdate);
        if (savedProperty) {
          toast({
            title: "הנכס עודכן בהצלחה",
            description: "פרטי הנכס עודכנו בהצלחה במערכת",
          });
        } else {
          throw new Error("Failed to update property");
        }
      } else {
        savedProperty = await createProperty(formData);
        if (savedProperty) {
          toast({
            title: "הנכס נוסף בהצלחה",
            description: "הנכס החדש נוסף בהצלחה למערכת",
          });
        } else {
          throw new Error("Failed to create property");
        }
      }
      
      if (savedProperty) {
        onSave(savedProperty);
      }
    } catch (error) {
      console.error("Error saving property:", error);
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
      <h2 className="text-2xl font-bold mb-6">
        {property ? 'עריכת נכס' : 'הוספת נכס חדש'}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">כותרת</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="price">מחיר</Label>
          <Input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location">מיקום</Label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="propertyType">סוג נכס</Label>
          <Input
            id="propertyType"
            name="propertyType"
            value={formData.propertyType}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="bedrooms">חדרים</Label>
          <Input
            id="bedrooms"
            name="bedrooms"
            type="number"
            value={formData.bedrooms}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="bathrooms">חדרי רחצה</Label>
          <Input
            id="bathrooms"
            name="bathrooms"
            type="number"
            value={formData.bathrooms}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="area">שטח (מ"ר)</Label>
          <Input
            id="area"
            name="area"
            type="number"
            value={formData.area}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="isForSale">סטטוס</Label>
          <select
            id="isForSale"
            name="isForSale"
            value={formData.isForSale.toString()}
            onChange={handleChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            required
          >
            <option value="true">למכירה</option>
            <option value="false">להשכרה</option>
          </select>
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="imageUrl">כתובת URL לתמונה</Label>
          <Input
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />
        </div>
        
        {formData.imageUrl && (
          <div className="md:col-span-2">
            <p className="mb-2 font-medium">תצוגה מקדימה:</p>
            <img 
              src={formData.imageUrl} 
              alt="תצוגה מקדימה" 
              className="w-full max-w-md h-48 object-cover rounded-md"
              onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/400x200?text=תמונה+לא+זמינה")}
            />
          </div>
        )}
      </div>
      
      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
        >
          ביטול
        </Button>
        <Button 
          type="submit"
          className="bg-realestate-primary hover:bg-realestate-dark"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              שומר...
            </>
          ) : (
            'שמור'
          )}
        </Button>
      </div>
    </form>
  );
};

export default PropertyForm;
