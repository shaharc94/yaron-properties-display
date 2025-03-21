
import { useState } from "react";
import { properties } from "@/data/properties";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2, Plus } from "lucide-react";
import PropertyForm from "./PropertyForm";
import { PropertyProps } from "./PropertyCard";

const AdminProperties = () => {
  const [propertiesList, setPropertiesList] = useState([...properties]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<PropertyProps | null>(null);

  const handleAddNew = () => {
    setEditingProperty(null);
    setIsFormOpen(true);
  };

  const handleEdit = (property: PropertyProps) => {
    setEditingProperty(property);
    setIsFormOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("האם אתה בטוח שברצונך למחוק נכס זה?")) {
      setPropertiesList(propertiesList.filter(property => property.id !== id));
      // In a real app, this would also update the backend/database
    }
  };

  const handleSave = (property: PropertyProps) => {
    if (editingProperty) {
      // Update existing property
      setPropertiesList(propertiesList.map(p => p.id === property.id ? property : p));
    } else {
      // Add new property
      const newId = Math.max(...propertiesList.map(p => p.id), 0) + 1;
      setPropertiesList([...propertiesList, { ...property, id: newId }]);
    }
    setIsFormOpen(false);
    // In a real app, this would also update the backend/database
  };

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
