
import { PropertyProps } from "../PropertyCard";

interface PropertyFormHeaderProps {
  property: PropertyProps | null;
}

const PropertyFormHeader = ({ property }: PropertyFormHeaderProps) => {
  return (
    <h2 className="text-2xl font-bold mb-6">
      {property ? 'עריכת נכס' : 'הוספת נכס חדש'}
    </h2>
  );
};

export default PropertyFormHeader;
