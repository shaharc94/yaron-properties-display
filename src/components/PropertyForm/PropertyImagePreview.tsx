
interface PropertyImagePreviewProps {
  imageUrl: string;
}

const PropertyImagePreview = ({ imageUrl }: PropertyImagePreviewProps) => {
  return (
    <div className="md:col-span-2">
      <p className="mb-2 font-medium">תצוגה מקדימה:</p>
      <img 
        src={imageUrl} 
        alt="תצוגה מקדימה" 
        className="w-full max-w-md h-48 object-cover rounded-md"
        onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/400x200?text=תמונה+לא+זמינה")}
      />
    </div>
  );
};

export default PropertyImagePreview;
