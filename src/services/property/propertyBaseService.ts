
import { supabase } from "@/integrations/supabase/client";
import { PropertyProps } from "@/components/PropertyCard";

export interface PropertyData extends Omit<PropertyProps, 'id'> {
  id?: number;
}

// Helper function to map Supabase property data to PropertyProps
export const mapPropertyData = (item: any): PropertyProps => ({
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
});

// Convert PropertyProps to Supabase format
export const toSupabaseFormat = (property: PropertyProps | PropertyData) => ({
  title: property.title,
  price: property.price,
  location: property.location,
  bedrooms: property.bedrooms,
  bathrooms: property.bathrooms,
  area: property.area,
  image_url: property.imageUrl,
  property_type: property.propertyType,
  is_for_sale: property.isForSale
});
