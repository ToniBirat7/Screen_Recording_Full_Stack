import React from "react";
import Image from "next/image";

const FileInput = ({
  id,
  label,
  accept,
  file,
  previewUrl,
  inputRef,
  onChange,
  onReset,
  type,
}: FileInputProps) => {
  return (
    <section className="file-input">
      <label htmlFor={id}>{label}</label>
      <input
        type="file"
        id={id}
        accept={accept}
        ref={inputRef}
        hidden
        onChange={onChange}
      ></input>

      {/* When there is no thumbnail, ternary operator */}
      {!previewUrl ? (
        <figure>
          <Image
            src="/assets/icons/upload.svg"
            alt="upload"
            width={24}
            height={24}
          />
          <p>Click to Upload your {id}</p>
        </figure>
      ) : (
        <div className=""></div>
      )}
    </section>
  );
};

export default FileInput;
