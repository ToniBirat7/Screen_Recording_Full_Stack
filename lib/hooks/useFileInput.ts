import { ChangeEvent, useRef, useState } from "react";

export const useFileInput = (maxSize: number) => {
  const [file, setFile] = useState<File | null>(null); // Hold File Object
  const [previewUrl, setPreviewUrl] = useState(""); // Hold a Blob URL Created by URL.createObjectURL()
  const [duration, setduration] = useState(0); // Duration
  const inputRef = useRef<HTMLInputElement>(null); // Ref for the Input

  // Function that will be called when the a File is Uploaded
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Check if we've the file
    if (e.target.files?.[0]) {
      const selectedFile = e.target.files[0]; // Get the File

      // Check if the size of the file is of threshold size
      if (selectedFile.size > maxSize) return;

      // If the size is valid, remove the reference to the file
      if (previewUrl) URL.revokeObjectURL(previewUrl);

      // Store the file
      setFile(selectedFile);

      // Create ref to file (Blob) for preview faster without converting them to base64
      const objectUrl = URL.createObjectURL(selectedFile);

      // set the URL that points to the files binary data in memeory
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
        };
        video.src = objectUrl; // Set the source to Blob URL, which triggers preload followed by onloadedmetadata
      }
    }
  };

  const resetFile = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl("");
    setduration(0);

    if (inputRef.current) inputRef.current.value = "";
  };
};
