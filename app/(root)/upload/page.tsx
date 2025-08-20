"use client";

import React, { useState } from "react";
import FormField from "@/components/FormField";
import FileInput from "@/components/FileInput";

const page = () => {
  const [error, setError] = useState(null); // For error while uploading video

  return (
    <div className="wrapper-md upload-page">
      <h1>Upload a Video</h1>

      {/* Check for Error if Error is True, then Display the Error */}

      {error && <div className="error-field">{error}</div>}

      {/* Create the Form to Handle Video Upload */}

      <form className="rounded-20 shadow-10 gap-6 w-full flex flex-col px-5 py-7.5">
        <FormField></FormField>
        <FileInput></FileInput>
      </form>
    </div>
  );
};

export default page;
