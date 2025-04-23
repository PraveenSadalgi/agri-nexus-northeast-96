
import React, { useRef, useState } from "react";

const ImageUpload: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (ev: ProgressEvent<FileReader>) => {
      setImageUrl(ev.target?.result as string);
      // Save image in localStorage for demo purposes (not in production)
      window.localStorage.setItem("farmer_uploaded_image", ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      {imageUrl && (
        <div className="mb-3">
          <img
            src={imageUrl}
            alt="Uploaded"
            className="w-full max-h-48 object-cover rounded border"
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
      <button
        type="button"
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
        onClick={() => fileInputRef.current?.click()}
      >
        Upload Image
      </button>
    </div>
  );
};

export default ImageUpload;
