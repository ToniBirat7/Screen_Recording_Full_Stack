"use client";

import React, { ChangeEvent, FormEvent, use, useState } from "react";
import FormField from "@/components/FormField";
import FileInput from "@/components/FileInput";
import { useFileInput } from "@/lib/hooks/useFileInput";
import { MAX_THUMBNAIL_SIZE, MAX_VIDEO_SIZE } from "@/constants";
import {
  getThumbnailUploadURL,
  getVideoUploadURL,
  saveVideoDetails,
} from "@/lib/action/video";
import { useRouter } from "next/navigation";

const page = () => {
  // If any error
  const [error, setError] = useState<string | null>(null); // For error while uploading video

  // Disable or Enable submit button
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Router for Navigation
  const router = useRouter();

  // State for the Video
  const video = useFileInput(MAX_VIDEO_SIZE);

  // State for thumbnail
  const thumbnail = useFileInput(MAX_THUMBNAIL_SIZE);

  // Handle File Upload to Bunny both Video and Thumbnail
  const uploadFileToBunny = (
    file: File,
    uploadUrl: string,
    accessKey: string
  ): Promise<void> => {
    return fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
        AccessKey: accessKey,
      },
      body: file,
    }).then((response) => {
      if (!response.ok) throw new Error("Upload Failed");
    });
  };

  // Handle Form Submit
  const handleSubmit = async (e: FormEvent) => {
    // Do not reload the page
    e.preventDefault();

    // Set True
    setIsSubmitting(true);

    // Try Catch for Submitting the Form
    try {
      // First check if video or thumbnail exists
      if (!video.file || !thumbnail.file) {
        setError("Please upload video and thumbnail");
        return;
      }

      // Check for the formData
      if (!formData.title || !formData.description) {
        setError("Please fill in all the details");
        return;
      }

      // After validation, finally we can proceed to uploading

      // 0 Get the Upload URL

      /*
      First we'll have to get the UploadURL from Bunny then we'll 
      use that URL to upload. Use getVideoURL function 
      */

      const {
        videoID,
        uploadUrl: videoUploadUrl, // Renaming
        accessKey: videoAccessKey, // Renaming
      } = await getVideoUploadURL();

      console.log(`Get Video URL`);
      console.log(
        `video ID ${videoID}, URL ${videoUploadUrl}, AccessKey ${videoAccessKey}`
      );

      /*
      Check if we've videoUrl
      */

      if (!videoID || !videoAccessKey)
        throw new Error("Failed to get video upload credentials");

      // 1. Upload video to Bunny

      /*
      Pass the video file, videoUploadURL, and AcceessKey
      */

      await uploadFileToBunny(video.file, videoUploadUrl, videoAccessKey);

      console.log(`Video Upload to Bunny`);

      // 2. Get Thumbnail Upload URL

      const {
        uploadUrl: thumbnailUploadUrl,
        cdnUrl: thumbnailCdnUrl,
        accessKey: thumbnailAccessKey, // Renaming
      } = await getThumbnailUploadURL(videoID);

      /*
      Check if we've thumbnailUrl
      */

      if (!thumbnailUploadUrl || !thumbnailAccessKey || !thumbnailCdnUrl)
        throw new Error("Failed to get thumbnail upload credentials");

      console.log(`Get Thumbnail URL`);
      console.log(
        `video ID ${thumbnailUploadUrl}, URL ${thumbnailCdnUrl}, AccessKey ${thumbnailAccessKey}`
      );

      // 3. Upload thumbnail to DB

      /*
      If there's attach the Thumbnail to the video
      */

      await uploadFileToBunny(
        thumbnail.file,
        thumbnailUploadUrl,
        thumbnailAccessKey
      );

      console.log(`Uploaded Thumb to Bunny`);

      // 4. Create a new DB entry for the video details (metadata) i.e. (urls, data)

      await saveVideoDetails({
        videoId: videoID,
        thumbnailUrl: thumbnailCdnUrl,
        ...formData, // Spread the form data that contains title, descirption, visibility and etc
        duration: video.duration,
      });

      console.log(`Upload to Database`);

      // 5. After Video Upload Change the Route to Specific Video Route

      router.push(`/video/${videoID}`);
    } catch (error) {
      console.log("Error Submitting Form");
    } finally {
      // Finally set to False after submitting
      setIsSubmitting(false);
    }
  };

  // State for form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    visibility: "public",
  });

  // Event Handler for Change in Form Data
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // Name is the name of the element and value will be changed value

    // Change the previous data with the latest changed data
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="wrapper-md upload-page">
      <h1>Upload a Video</h1>

      {/* Check for Error if Error is True, then Display the Error */}

      {error && <div className="error-field">{error}</div>}

      {/* Create the Form to Handle Video Upload */}

      <form
        className="rounded-20 shadow-10 gap-6 w-full flex flex-col px-5 py-7.5"
        onSubmit={handleSubmit}
      >
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

        {/* Submit button */}
        <button type="submit" disabled={isSubmitting} className="submit-button">
          {/* Btn Value */}
          {isSubmitting ? "Uploading" : "Upload Video"}
        </button>
      </form>
    </div>
  );
};

export default page;
