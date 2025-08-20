"use client";

import React, { useState } from "react";
import FormField from "@/components/FormField";
import FileInput from "@/components/FileInput";

const page = () => {
  const [error, setError] = useState(); // For error while uploading video

  return (
    <div className="wrapper-md upload-page">
      <h1>Upload a Video</h1>
      {error && <div className="error-field">{error}</div>}

      <FormField></FormField>
      <FileInput></FileInput>
    </div>
  );
};

export default page;
