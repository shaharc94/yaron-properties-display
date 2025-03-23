
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface PropertyFormActionsProps {
  loading: boolean;
  onCancel: () => void;
}

const PropertyFormActions = ({ loading, onCancel }: PropertyFormActionsProps) => {
  return (
    <div className="flex justify-end space-x-4">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={loading}
      >
        ביטול
      </Button>
      <Button 
        type="submit"
        className="bg-realestate-primary hover:bg-realestate-dark"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            שומר...
          </>
        ) : (
          'שמור'
        )}
      </Button>
    </div>
  );
};

export default PropertyFormActions;
