
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface AllocateCropDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  farmerId: string | null;
  onAllocate: () => void;
}

const initialCrop = { cropName: "", harvestLocation: "", transportDestination: "", price: "" };

const AllocateCropDialog: React.FC<AllocateCropDialogProps> = ({
  open,
  onOpenChange,
  farmerId,
  onAllocate,
}) => {
  const [crop, setCrop] = useState(initialCrop);
  const [saving, setSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCrop((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!farmerId) return;
    setSaving(true);

    const farmerJSON = window.localStorage.getItem(farmerId) || null;
    if (!farmerJSON) {
      setSaving(false);
      return;
    }
    const farmer = JSON.parse(farmerJSON);
    const newCrop = {
      cropId: "C" + Math.floor(1000 + Math.random() * 9000),
      cropName: crop.cropName,
      harvestLocation: crop.harvestLocation,
      transportDestination: crop.transportDestination,
      price: Number(crop.price),
    };
    farmer.allocatedCrops = Array.isArray(farmer.allocatedCrops)
      ? [...farmer.allocatedCrops, newCrop]
      : [newCrop];
    window.localStorage.setItem(farmerId, JSON.stringify(farmer));
    
    // Dispatch an event to notify other components
    document.dispatchEvent(new Event('allocatedCropsUpdated'));
    
    setCrop(initialCrop);
    setSaving(false);
    toast.success(`Crop allocated successfully to farmer ${farmerId}`);
    onOpenChange(false);
    onAllocate();
  };

  return (
    <Dialog open={open} onOpenChange={opened => { if (!opened) setCrop(initialCrop); onOpenChange(opened) }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Allocate Crop to Farmer</DialogTitle>
        </DialogHeader>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <Input
            name="cropName"
            placeholder="Crop Name"
            value={crop.cropName}
            onChange={handleChange}
            required
          />
          <Input
            name="harvestLocation"
            placeholder="Harvest Location"
            value={crop.harvestLocation}
            onChange={handleChange}
            required
          />
          <Input
            name="transportDestination"
            placeholder="Transport Destination"
            value={crop.transportDestination}
            onChange={handleChange}
            required
          />
          <Input
            name="price"
            type="number"
            placeholder="Price (₹/kg)"
            value={crop.price}
            onChange={handleChange}
            required
            min={1}
          />
          <DialogFooter>
            <Button type="submit" disabled={saving}>Allocate</Button>
            <DialogClose asChild>
              <Button type="button" variant="secondary">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AllocateCropDialog;
