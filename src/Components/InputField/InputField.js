import React from "react";

const InputField = (props) => {
  const handleChange = (e) => {
    const { value } = e.target;
    props.onChange(value);
  };
  return (
    <div className="form-group">
      {props.label && <label htmlFor="field">{props.label}</label>}
      <input
        type={props.type}
        value={props.value}
        placeholder={props.placeholder}
        onChange={handleChange}
        className
      />
    </div>
  );
};

export default InputField;
