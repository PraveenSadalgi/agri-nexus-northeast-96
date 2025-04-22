
export interface Farmer {
  id: string;
  name: string;
  territory: string;
  allocatedCrops: CropAllocation[];
}

export interface CropAllocation {
  cropId: string;
  cropName: string;
  harvestLocation: string;
  transportDestination: string;
  price: number;
}

export interface Territory {
  id: string;
  name: string;
  adminId: string;
  averagePrices: { [key: string]: number };
}
