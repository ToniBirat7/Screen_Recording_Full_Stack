import { string } from "better-auth";
import { phoneNumber } from "better-auth/plugins";
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
  let inputElement = null;

  if (as === "textarea") {
    inputElement = (
      <textarea
        placeholder={placeholder}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
      />
    );
  } else if (as === "select") {
    inputElement = (
      <select id={id} name={id} value={value} onChange={onChange}>
        {options.map(({ label, value }) => (
          <option key={label} value={value}>
            {label}
          </option>
        ))}
      </select>
    );
  } else {
    inputElement = (
      <input
        placeholder={placeholder}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
      />
    );
  }

  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default FormField;
