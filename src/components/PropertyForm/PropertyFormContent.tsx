
import { PropertyProps } from "../PropertyCard";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import PropertyImagePreview from "./PropertyImagePreview";

interface PropertyFormContentProps {
  formData: PropertyProps;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const PropertyFormContent = ({ formData, handleChange }: PropertyFormContentProps) => {
  return (
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
          placeholder="https://example.com/image.jpg"
          required
        />
        <p className="text-sm text-gray-500">יש להזין כתובת URL מלאה המתחילה ב-https://</p>
      </div>
      
      {formData.imageUrl && <PropertyImagePreview imageUrl={formData.imageUrl} />}
    </div>
  );
};

export default PropertyFormContent;
