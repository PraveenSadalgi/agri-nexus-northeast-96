
import React, { useRef, useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Camera, Image, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FarmerImageUpload: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  
  // Load existing image on component mount
  useEffect(() => {
    const savedImage = window.localStorage.getItem("farmer_uploaded_image");
    if (savedImage) {
      setImageUrl(savedImage);
    }
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (ev: ProgressEvent<FileReader>) => {
      const result = ev.target?.result as string;
      setImageUrl(result);
      window.localStorage.setItem("farmer_uploaded_image", result);
    };
    reader.readAsDataURL(file);
  };
  
  const handleClearImage = () => {
    setImageUrl(null);
    window.localStorage.removeItem("farmer_uploaded_image");
  };

  return (
    <Card className="border-agri-200">
      <CardHeader className="bg-agri-600 text-white py-3 px-4">
        <CardTitle className="text-md flex items-center">
          <Camera className="h-4 w-4 mr-2" />
          Upload Crop Image
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {imageUrl ? (
          <div className="space-y-3">
            <div className="relative rounded-lg overflow-hidden border border-gray-200">
              <img
                src={imageUrl}
                alt="Uploaded"
                className="w-full h-48 object-cover"
              />
              <Button 
                variant="destructive" 
                size="sm"
                className="absolute top-2 right-2 p-1 h-8 w-8 rounded-full"
                onClick={handleClearImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="text-agri-600 border-agri-300"
              >
                <Camera className="mr-2 h-4 w-4" />
                Change Image
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-agri-400 transition-colors">
            <Image className="h-12 w-12 mx-auto text-gray-400" />
            <p className="mt-2 text-sm text-gray-600 mb-4">
              Upload a photo of your crop to share with administrators
            </p>
            <Button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-agri-600 hover:bg-agri-700"
            >
              <Camera className="mr-2 h-4 w-4" />
              Upload Image
            </Button>
          </div>
        )}
      
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />
      </CardContent>
    </Card>
  );
};

export default FarmerImageUpload;
