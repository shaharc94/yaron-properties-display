
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Building, MapPin, Bed, Bath, Move, Heart } from "lucide-react";

export interface PropertyProps {
  id: number;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  imageUrl: string;
  propertyType: string;
  isForSale: boolean;
}

const PropertyCard = ({
  title,
  price,
  location,
  bedrooms,
  bathrooms,
  area,
  imageUrl,
  propertyType,
  isForSale,
}: PropertyProps) => {
  return (
    <Card className="property-card overflow-hidden">
      <div className="relative">
        <img
          src={imageUrl}
          alt={title}
          className="h-56 w-full object-cover"
        />
        <Badge 
          className={`absolute top-3 right-3 ${isForSale ? 'bg-realestate-primary' : 'bg-realestate-secondary'}`}
        >
          {isForSale ? 'למכירה' : 'להשכרה'}
        </Badge>
        <button className="absolute top-3 left-3 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors">
          <Heart className="h-5 w-5 text-gray-500 hover:text-red-500" />
        </button>
      </div>
      <CardContent className="pt-4">
        <div className="flex items-center mb-2">
          <Building className="h-4 w-4 text-realestate-secondary ml-1" />
          <p className="text-sm text-gray-500">{propertyType}</p>
        </div>
        <h3 className="font-bold text-xl mb-1">{title}</h3>
        <div className="flex items-center mb-3">
          <MapPin className="h-4 w-4 text-gray-400 ml-1" />
          <p className="text-sm text-gray-500">{location}</p>
        </div>
        <p className="font-bold text-realestate-primary text-xl">
          ₪{price.toLocaleString()}
          <span className="text-gray-500 font-normal text-sm">
            {isForSale ? '' : ' / חודש'}
          </span>
        </p>
      </CardContent>
      <CardFooter className="border-t pt-4 pb-4 flex justify-between">
        <div className="flex items-center">
          <Bed className="h-4 w-4 text-gray-500 ml-1" />
          <span className="text-sm">{bedrooms} חדרים</span>
        </div>
        <div className="flex items-center">
          <Bath className="h-4 w-4 text-gray-500 ml-1" />
          <span className="text-sm">{bathrooms} חדרי רחצה</span>
        </div>
        <div className="flex items-center">
          <Move className="h-4 w-4 text-gray-500 ml-1" />
          <span className="text-sm">{area} מ"ר</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
