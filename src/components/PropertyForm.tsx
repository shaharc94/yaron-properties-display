
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PropertyProps } from "./PropertyCard";

interface PropertyFormProps {
  property: PropertyProps | null;
  onSave: (property: PropertyProps) => void;
  onCancel: () => void;
}

const PropertyForm = ({ property, onSave, onCancel }: PropertyFormProps) => {
  // Create a blank property template with default values
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

  // If editing, use the provided property, otherwise use the empty template
  const [formData, setFormData] = useState<PropertyProps>(property || emptyProperty);

  // Update form if property changes (e.g., when switching from add to edit)
  useEffect(() => {
    setFormData(property || emptyProperty);
  }, [property]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Handle different input types
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
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
        >
          ביטול
        </Button>
        <Button 
          type="submit"
          className="bg-realestate-primary hover:bg-realestate-dark"
        >
          שמור
        </Button>
      </div>
    </form>
  );
};

export default PropertyForm;
