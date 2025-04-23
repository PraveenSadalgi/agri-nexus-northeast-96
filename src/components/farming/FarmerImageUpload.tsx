
import React, { useRef, useState } from "react";
import { Button } from "../ui/button";

const FarmerImageUpload: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (ev: ProgressEvent<FileReader>) => {
      setImageUrl(ev.target?.result as string);
      window.localStorage.setItem("farmer_uploaded_image", ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <h3 className="font-semibold mb-2">Upload Crop Image</h3>
      {imageUrl && (
        <div className="mb-3">
          <img
            src={imageUrl}
            alt="Uploaded"
            className="w-full max-h-40 object-cover rounded border"
          />
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleImageChange}
      />
      <Button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="bg-green-700"
      >
        Upload Image
      </Button>
    </div>
  );
};

export default FarmerImageUpload;
