
import { supabase } from "@/integrations/supabase/client";
import { PropertyProps } from "@/components/PropertyCard";
import { PropertyData, mapPropertyData, toSupabaseFormat } from "./propertyBaseService";

// Create a new property
export const createProperty = async (property: PropertyData): Promise<PropertyProps | null> => {
  const propertyData = toSupabaseFormat(property);

  const { data, error } = await supabase
    .from('properties')
    .insert(propertyData)
    .select()
    .single();

  if (error) {
    console.error('Error creating property:', error);
    return null;
  }

  return mapPropertyData(data);
};

// Update an existing property
export const updateProperty = async (property: PropertyProps): Promise<PropertyProps | null> => {
  console.log("Updating property with ID:", property.id);
  
  if (!property.id) {
    console.error("Cannot update property: missing property ID");
    return null;
  }

  const propertyData = toSupabaseFormat(property);
  console.log("Property data being sent to Supabase:", propertyData);

  // Using upsert to ensure the update succeeds
  const { data, error } = await supabase
    .from('properties')
    .update(propertyData)
    .eq('id', property.id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating property with ID ${property.id}:`, error);
    return null;
  }
  
  console.log("Raw data returned from update operation:", data);
  
  if (!data) {
    console.error("No data returned from update operation");
    return null;
  }
  
  // Map the returned data
  const mappedData = mapPropertyData(data);
  console.log("Mapped data after update:", mappedData);
  return mappedData;
};

// Delete a property
export const deleteProperty = async (id: number): Promise<boolean> => {
  const { error } = await supabase
    .from('properties')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`Error deleting property with ID ${id}:`, error);
    return false;
  }

  return true;
};
