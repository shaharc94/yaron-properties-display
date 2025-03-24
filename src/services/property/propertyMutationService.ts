
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

  try {
    // Fix: Use the maybeSingle() method to properly handle the response
    // This ensures we don't get a 406 error and properly handle single/no results
    const { data, error } = await supabase
      .from('properties')
      .update(propertyData)
      .eq('id', property.id)
      .select('*')
      .maybeSingle();

    if (error) {
      console.error(`Error updating property with ID ${property.id}:`, error);
      return null;
    }
    
    if (!data) {
      console.error(`No data returned after updating property with ID ${property.id}`);
      return null;
    }
    
    return mapPropertyData(data);
  } catch (error) {
    console.error(`Caught exception updating property with ID ${property.id}:`, error);
    return null;
  }
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
