"use client";

import React, { ChangeEvent, use, useState } from "react";
import FormField from "@/components/FormField";
import FileInput from "@/components/FileInput";

const page = () => {
  const [error, setError] = useState(null); // For error while uploading video

  // State for form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    visibility: "public",
  });

  // Event Handler for Change in Form Data
  const handleInputChange = (e: ChangeEvent) => {
    const { name, value } = e.target; // Name is the name of the element and value will be changed value

    // Change the previous data with the latest changed data
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // State for the Video
  const video = {};

  // State for thumbnail
  const thumbnail = {};

  return (
    <div className="wrapper-md upload-page">
      <h1>Upload a Video</h1>

      {/* Check for Error if Error is True, then Display the Error */}

      {error && <div className="error-field">{error}</div>}

      {/* Create the Form to Handle Video Upload */}

      <form className="rounded-20 shadow-10 gap-6 w-full flex flex-col px-5 py-7.5">
        {/* First FormField Component */}

        <FormField
          id="title"
          label="Title"
          placeholder="Enter a clear and concise video title"
          value={formData.title}
          onChange={handleInputChange}
        />

        {/* Second FormField Component */}

        <FormField
          id="description"
          label="Description"
          placeholder="Describe what this video is about"
          value={formData.description}
          as="textarea"
          onChange={handleInputChange}
        />

        {/* First File Input for Video */}
        <FileInput
          id="video"
          label="Video"
          accept="video/*"
          file={video.file}
          previewUrl={video.previewUrl}
          inputRef={video.inputRef}
          onChange={video.handleFileChange}
          onReset={video.resetFile}
          type="video"
        />

        {/* Second File Input for Thumbnail */}
        <FileInput
          id="thumbnail"
          label="Thumbnail"
          accept="image/*"
          file={thumbnail.file}
          previewUrl={thumbnail.previewUrl}
          inputRef={thumbnail.inputRef}
          onChange={thumbnail.handleFileChange}
          onReset={thumbnail.resetFile}
          type="image"
        />

        {/* Visibility for Private and Public */}

        <FormField
          id="visibility"
          label="Visibility"
          value={formData.visibility}
          as="select"
          options={[
            { value: "public", label: "Public" },
            { value: "private", label: "Private" },
          ]}
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
};

export default page;
