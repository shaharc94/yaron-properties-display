
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2, Plus, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import PropertyForm from "./PropertyForm";
import { PropertyProps } from "./PropertyCard";
import { fetchProperties, deleteProperty } from "@/services/propertyService";

const AdminProperties = () => {
  const [propertiesList, setPropertiesList] = useState<PropertyProps[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<PropertyProps | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Load properties from Supabase
  const loadProperties = async () => {
    setLoading(true);
    try {
      const data = await fetchProperties();
      console.log("Loaded properties:", data);
      setPropertiesList(data);
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

  useEffect(() => {
    loadProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddNew = () => {
    setEditingProperty(null);
    setIsFormOpen(true);
  };

  const handleEdit = (property: PropertyProps) => {
    // Create a deep copy of the property to avoid reference issues
    console.log("Editing property:", property);
    const propertyCopy = JSON.parse(JSON.stringify(property)); // Deep copy
    setEditingProperty(propertyCopy);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("האם אתה בטוח שברצונך למחוק נכס זה?")) {
      try {
        const success = await deleteProperty(id);
        
        if (success) {
          // Refresh properties list from the database
          await loadProperties();
          
          toast({
            title: "הנכס נמחק בהצלחה",
            description: "הנכס נמחק בהצלחה מהמערכת",
          });
        } else {
          throw new Error("Failed to delete property");
        }
      } catch (error) {
        console.error(`Error deleting property with ID ${id}:`, error);
        toast({
          title: "שגיאה במחיקת הנכס",
          description: "לא ניתן למחוק את הנכס כרגע. אנא נסה שוב מאוחר יותר.",
          variant: "destructive",
        });
      }
    }
  };

  const handleSave = async (property: PropertyProps) => {
    console.log("Property saved:", property);
    // Refresh properties list from database
    await loadProperties();
    setIsFormOpen(false);
  };

  if (loading && propertiesList.length === 0) {
    return (
      <div className="flex justify-center items-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-realestate-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">רשימת נכסים</h2>
        <Button 
          onClick={handleAddNew}
          className="bg-realestate-primary hover:bg-realestate-dark"
        >
          <Plus className="ml-2" /> הוסף נכס חדש
        </Button>
      </div>

      {isFormOpen ? (
        <PropertyForm 
          property={editingProperty} 
          onSave={handleSave} 
          onCancel={() => setIsFormOpen(false)} 
        />
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>תמונה</TableHead>
                <TableHead>כותרת</TableHead>
                <TableHead>מחיר</TableHead>
                <TableHead>מיקום</TableHead>
                <TableHead>סוג</TableHead>
                <TableHead>סטטוס</TableHead>
                <TableHead>פעולות</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {propertiesList.map((property) => (
                <TableRow key={property.id}>
                  <TableCell>{property.id}</TableCell>
                  <TableCell>
                    <img 
                      src={property.imageUrl} 
                      alt={property.title} 
                      className="w-20 h-16 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell>{property.title}</TableCell>
                  <TableCell>{property.price.toLocaleString()} ₪</TableCell>
                  <TableCell>{property.location}</TableCell>
                  <TableCell>{property.propertyType}</TableCell>
                  <TableCell>{property.isForSale ? 'למכירה' : 'להשכרה'}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleEdit(property)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(property.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AdminProperties;
