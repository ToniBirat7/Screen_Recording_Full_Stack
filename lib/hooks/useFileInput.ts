import { ChangeEvent, useRef, useState } from "react";

export const useFileInput = (maxSize: number) => {
  const [file, setFile] = useState<File | null>(null); // File
  const [previewUrl, setPreviewUrl] = useState(""); // Url
  const [duration, setduration] = useState(0); // Duration
  const inputRef = useRef(null); // Ref for the Input

  // Function that will be called when the a File is Uploaded
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Check if we've the file
    if (e.target.files?.[0]) {
      const selectedFile = e.target.files[0]; // Get the File

      // Check if the size of the file is of threshold size
      if (selectedFile.size > maxSize) return;

      // If the size is valid, remove the reference to the file
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setFile(selectedFile);

      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);

      // Duration of the Video
      if (selectedFile.type.startsWith("video")) {
        const video = document.createElement("video");
        video.preload = "metadata";
        video.onloadedmetadata = () => {
          if (isFinite(video.duration) && video.duration > 0) {
            setduration(Math.round(video.duration));
          } else {
            setduration(0);
          }

          URL.revokeObjectURL(video.src);
        };
        video.src = objectUrl;
      }
    }
  };
};
