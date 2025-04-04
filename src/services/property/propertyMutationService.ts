
import { supabase } from "@/integrations/supabase/client";
import { PropertyProps } from "@/components/PropertyCard";
import { PropertyData, mapPropertyData, toSupabaseFormat } from "./propertyBaseService";

// Create a new property
export const createProperty = async (property: PropertyData): Promise<PropertyProps | null> => {
  const propertyData = toSupabaseFormat(property);

  try {
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
  } catch (error) {
    console.error('Error creating property:', error);
    return null;
  }
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

  try {
    // Use upsert instead of update for more reliable handling
    const { data, error } = await supabase
      .from('properties')
      .upsert({ ...propertyData, id: property.id })
      .select('*')
      .maybeSingle();

    if (error) {
      console.error(`Error updating property with ID ${property.id}:`, error);
      return null;
    }
    
    console.log("Raw data returned from update operation:", data);
    
    if (!data) {
      console.error("No data returned from update operation");
      // Try to fetch the property directly if the update didn't return data
      const { data: fetchedData, error: fetchError } = await supabase
        .from('properties')
        .select('*')
        .eq('id', property.id)
        .maybeSingle();
        
      if (fetchError || !fetchedData) {
        console.error(`Error fetching updated property with ID ${property.id}:`, fetchError);
        return null;
      }
      
      const mappedData = mapPropertyData(fetchedData);
      console.log("Fetched property data after update:", mappedData);
      return mappedData;
    }
    
    // Map the returned data
    const mappedData = mapPropertyData(data);
    console.log("Mapped data after update:", mappedData);
    return mappedData;
  } catch (error) {
    console.error(`Error updating property with ID ${property.id}:`, error);
    return null;
  }
};

// Delete a property
export const deleteProperty = async (id: number): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Error deleting property with ID ${id}:`, error);
      return false;
    }

    return true;
  } catch (error) {
    console.error(`Error deleting property with ID ${id}:`, error);
    return false;
  }
};
