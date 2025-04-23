
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { WheatOff } from "lucide-react";

interface DeallocateCropDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  farmerId: string | null;
  onDeallocate: () => void;
}

const DeallocateCropDialog: React.FC<DeallocateCropDialogProps> = ({
  open,
  onOpenChange,
  farmerId,
  onDeallocate,
}) => {
  const [crops, setCrops] = useState<Array<{cropId: string, cropName: string}>>([]);
  const [selectedCropId, setSelectedCropId] = useState<string>("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (farmerId && open) {
      // Load farmer crops
      try {
        const farmerJSON = window.localStorage.getItem(farmerId);
        if (farmerJSON) {
          const farmer = JSON.parse(farmerJSON);
          if (farmer.allocatedCrops && Array.isArray(farmer.allocatedCrops)) {
            setCrops(farmer.allocatedCrops.map(crop => ({ 
              cropId: crop.cropId, 
              cropName: crop.cropName 
            })));
          }
        }
      } catch (error) {
        console.error("Error loading farmer crops:", error);
      }
    } else {
      setCrops([]);
      setSelectedCropId("");
    }
  }, [farmerId, open]);

  const handleDeallocate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!farmerId || !selectedCropId) return;
    setSaving(true);

    try {
      // Get farmer data
      const farmerJSON = window.localStorage.getItem(farmerId);
      if (!farmerJSON) {
        setSaving(false);
        return;
      }
      
      const farmer = JSON.parse(farmerJSON);
      
      // Remove the selected crop
      if (farmer.allocatedCrops && Array.isArray(farmer.allocatedCrops)) {
        farmer.allocatedCrops = farmer.allocatedCrops.filter(
          (crop: { cropId: string }) => crop.cropId !== selectedCropId
        );
        
        // Save updated farmer data
        window.localStorage.setItem(farmerId, JSON.stringify(farmer));
      }
      
      // Reset and close
      setSelectedCropId("");
      setSaving(false);
      onOpenChange(false);
      onDeallocate();
    } catch (error) {
      console.error("Error deallocating crop:", error);
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <WheatOff className="h-5 w-5 mr-2 text-red-500" />
            Deallocate Crop from Farmer
          </DialogTitle>
        </DialogHeader>
        
        <form className="space-y-4" onSubmit={handleDeallocate}>
          {crops.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-amber-600">This farmer has no allocated crops.</p>
            </div>
          ) : (
            <div className="space-y-2">
              <label htmlFor="cropSelect" className="block text-sm font-medium text-gray-700">
                Select Crop to Deallocate
              </label>
              <Select
                value={selectedCropId}
                onValueChange={setSelectedCropId}
              >
                <SelectTrigger id="cropSelect" className="w-full">
                  <SelectValue placeholder="Select a crop" />
                </SelectTrigger>
                <SelectContent>
                  {crops.map((crop) => (
                    <SelectItem key={crop.cropId} value={crop.cropId}>
                      {crop.cropName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          <DialogFooter>
            <Button 
              type="submit" 
              disabled={saving || crops.length === 0 || !selectedCropId}
              variant="destructive"
            >
              Deallocate
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DeallocateCropDialog;
