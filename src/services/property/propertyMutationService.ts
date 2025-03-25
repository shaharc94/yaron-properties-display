
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

  // Do a clean update operation
  const { data, error } = await supabase
    .from('properties')
    .update(propertyData)
    .eq('id', property.id)
    .select('*');

  if (error) {
    console.error(`Error updating property with ID ${property.id}:`, error);
    return null;
  }
  
  console.log("Raw data returned from update operation:", data);
  
  // If no data is returned, fetch the property directly
  if (!data || data.length === 0) {
    console.log("No data returned from update, fetching property directly");
    const { data: fetchedData, error: fetchError } = await supabase
      .from('properties')
      .select('*')
      .eq('id', property.id)
      .single();
      
    if (fetchError) {
      console.error(`Error fetching updated property with ID ${property.id}:`, fetchError);
      return null;
    }
    
    console.log("Fetched property data after update:", fetchedData);
    return mapPropertyData(fetchedData);
  }
  
  // Map the first item from the returned array
  return mapPropertyData(data[0]);
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
