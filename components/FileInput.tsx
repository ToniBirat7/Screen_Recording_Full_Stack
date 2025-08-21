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
        <figure onClick={() => inputRef?.current?.click()}>
          <Image
            src="/assets/icons/upload.svg"
            alt="upload"
            width={24}
            height={24}
          />
          <p>Click to Upload your {id}</p>
        </figure>
      ) : (
        // If there is previewURL play it or show it
        <div className="">
          {type == "video" ? (
            <video src={previewUrl} controls></video>
          ) : (
            <Image src={previewUrl} alt="image" fill></Image>
          )}

          {/* Button for Reset */}

          <button type="button" onClick={onReset}>
            <Image
              src="/assets/icons/close.svg"
              width={16}
              height={16}
              alt="Reset Btn"
            ></Image>
          </button>

          {/* File Name */}
          <p>{file?.name}</p>
        </div>
      )}
    </section>
  );
};

export default FileInput;
