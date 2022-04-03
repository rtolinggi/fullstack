import React from "react";

const Input = ({
  classContainer,
  label,
  classLabel,
  leftIcon,
  inputType,
  placeholder,
  value,
  onChange,
  autoComplete,
  inputName,
  rightIcon = undefined,
  ...props
}) => {
  return (
    <>
      <div className={`relative flex flex-col w-full ${classContainer}`}>
        <label
          htmlFor={label}
          className={`text-xs text-gray-700 font-medium -tracking-tighter mb-1 ${classLabel}`}
        >
          {label}
        </label>
        {leftIcon}
        <input
          id={inputName}
          name={inputName}
          type={inputType}
          placeholder={placeholder}
          className="bg-slate-200/70 py-2 px-2 text-sm pl-8 font-normal text-slate-700 outline-none focus:border focus:border-teal-200 focus:ring focus:ring-teal-100 focus:bg-white rounded-md "
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          {...props}
        />
        {rightIcon}
      </div>
    </>
  );
};

export default Input;
