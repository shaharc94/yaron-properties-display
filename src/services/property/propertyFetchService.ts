
import { supabase } from "@/integrations/supabase/client";
import { PropertyProps } from "@/components/PropertyCard";
import { mapPropertyData } from "./propertyBaseService";

// Fetch all properties
export const fetchProperties = async (): Promise<PropertyProps[]> => {
  const { data, error } = await supabase
    .from('properties')
    .select('*');

  if (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }

  return data.map(mapPropertyData);
};

// Fetch properties for sale only
export const fetchPropertiesForSale = async (): Promise<PropertyProps[]> => {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('is_for_sale', true);

  if (error) {
    console.error('Error fetching properties for sale:', error);
    throw error;
  }

  return data.map(mapPropertyData);
};

// Fetch properties for rent only
export const fetchPropertiesForRent = async (): Promise<PropertyProps[]> => {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('is_for_sale', false);

  if (error) {
    console.error('Error fetching properties for rent:', error);
    throw error;
  }

  return data.map(mapPropertyData);
};

// Fetch single property by ID
export const fetchPropertyById = async (id: number): Promise<PropertyProps | null> => {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error(`Error fetching property with ID ${id}:`, error);
    return null;
  }

  if (!data) {
    console.log(`No property found with ID ${id}`);
    return null;
  }

  return mapPropertyData(data);
};
