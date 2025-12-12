import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import { RiCameraOffLine } from "react-icons/ri";
interface ImageUploaderProps {
  selectedImage: string | File | undefined;
  setSelectedImage: Dispatch<SetStateAction<string | File | undefined>>;
  isAssistant: boolean;
}
const ImageUploader: React.FC<ImageUploaderProps> = ({
  selectedImage,
  setSelectedImage,
  isAssistant,
}) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (isAssistant) {
      setSelectedImage(file);
      return;
    }
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Image = reader.result?.toString().split(",")[1];
        setSelectedImage(base64Image || "");
      };

      reader.readAsDataURL(file);
    }
  };
  return (
    selectedImage ? (
      <button
        type="button"
        className="rounded"
        onClick={() => setSelectedImage("")}
      >
        <RiCameraOffLine className="h-4 w-4 mr-1 text-black" />
      </button>
    ) : (
      <label className="cursor-pointer p-4">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-image"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
      </label>
    )
  );
};

export default ImageUploader;
