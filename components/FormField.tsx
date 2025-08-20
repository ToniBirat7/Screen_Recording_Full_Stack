import { string } from "better-auth";
import React from "react";

const FormField = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  as = "input",
  options = [],
}: FormFieldProps) => {
  
  // Dynamic Internal Component to Render the Input Filed Based on Type
  const InputToRender = ({ type }: { type: string }) => {
    if (type === "textarea") {
      return <textarea />;
    } else if (type === "select") {
      return <select />;
    } else {
      return <input />;
    }
  };

  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>

      {/* Based on the Type of Input Field i.e. as prop
      we will create a Dynamic Internal Component that returns the related input element */}

      <InputToRender type={as} />
    </div>
  );
};

export default FormField;
