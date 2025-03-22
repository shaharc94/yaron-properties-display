
import { supabase } from "@/integrations/supabase/client";
import { PropertyProps } from "@/components/PropertyCard";

export interface PropertyData extends Omit<PropertyProps, 'id'> {
  id?: number;
}

// Fetch all properties
export const fetchProperties = async (): Promise<PropertyProps[]> => {
  const { data, error } = await supabase
    .from('properties')
    .select('*');

  if (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }

  // Transform data to match PropertyProps interface
  return data.map((item) => ({
    id: item.id,
    title: item.title,
    price: item.price,
    location: item.location,
    bedrooms: item.bedrooms,
    bathrooms: item.bathrooms,
    area: item.area,
    imageUrl: item.image_url,
    propertyType: item.property_type,
    isForSale: item.is_for_sale
  }));
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

  return data.map((item) => ({
    id: item.id,
    title: item.title,
    price: item.price,
    location: item.location,
    bedrooms: item.bedrooms,
    bathrooms: item.bathrooms,
    area: item.area,
    imageUrl: item.image_url,
    propertyType: item.property_type,
    isForSale: item.is_for_sale
  }));
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

  return data.map((item) => ({
    id: item.id,
    title: item.title,
    price: item.price,
    location: item.location,
    bedrooms: item.bedrooms,
    bathrooms: item.bathrooms,
    area: item.area,
    imageUrl: item.image_url,
    propertyType: item.property_type,
    isForSale: item.is_for_sale
  }));
};

// Fetch single property by ID
export const fetchPropertyById = async (id: number): Promise<PropertyProps | null> => {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching property with ID ${id}:`, error);
    return null;
  }

  return {
    id: data.id,
    title: data.title,
    price: data.price,
    location: data.location,
    bedrooms: data.bedrooms,
    bathrooms: data.bathrooms,
    area: data.area,
    imageUrl: data.image_url,
    propertyType: data.property_type,
    isForSale: data.is_for_sale
  };
};

// Create a new property
export const createProperty = async (property: PropertyData): Promise<PropertyProps | null> => {
  const propertyData = {
    title: property.title,
    price: property.price,
    location: property.location,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    area: property.area,
    image_url: property.imageUrl,
    property_type: property.propertyType,
    is_for_sale: property.isForSale
  };

  const { data, error } = await supabase
    .from('properties')
    .insert(propertyData)
    .select()
    .single();

  if (error) {
    console.error('Error creating property:', error);
    return null;
  }

  return {
    id: data.id,
    title: data.title,
    price: data.price,
    location: data.location,
    bedrooms: data.bedrooms,
    bathrooms: data.bathrooms,
    area: data.area,
    imageUrl: data.image_url,
    propertyType: data.property_type,
    isForSale: data.is_for_sale
  };
};

// Update an existing property
export const updateProperty = async (property: PropertyProps): Promise<PropertyProps | null> => {
  console.log("Updating property with ID:", property.id);
  console.log("Property data being sent:", property);

  const propertyData = {
    title: property.title,
    price: property.price,
    location: property.location,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    area: property.area,
    image_url: property.imageUrl,
    property_type: property.propertyType,
    is_for_sale: property.isForSale
  };

  try {
    // Use .maybeSingle() instead of .single() to avoid error when no rows are returned
    // And explicitly set content-type header to fix the 406 error
    const { data, error } = await supabase
      .from('properties')
      .update(propertyData)
      .match({ id: property.id }) // Use match instead of eq for better clarity
      .select();

    if (error) {
      console.error(`Error updating property with ID ${property.id}:`, error);
      return null;
    }
    
    if (!data || data.length === 0) {
      console.error(`No property found with ID ${property.id}`);
      return null;
    }
    
    // Get the first item since we're not using .single() anymore
    const updatedProperty = data[0];
    
    return {
      id: updatedProperty.id,
      title: updatedProperty.title,
      price: updatedProperty.price,
      location: updatedProperty.location,
      bedrooms: updatedProperty.bedrooms,
      bathrooms: updatedProperty.bathrooms,
      area: updatedProperty.area,
      imageUrl: updatedProperty.image_url,
      propertyType: updatedProperty.property_type,
      isForSale: updatedProperty.is_for_sale
    };
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
