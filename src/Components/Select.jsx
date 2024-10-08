import React, { useId } from "react";

function Select({ options, label, className = "", required, ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && <label htmlFor={id}>{label}</label>}
      {required && <span
            className='text-red-600 text-xl'>*</span>}
      <select
        {...props}
        ref={ref}
        id={id}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
      >
        {options?.map((option) => (
          <option key={option._id? option._id : option} value={option._id ? option._id : option}>
            {option.name ? option.name : option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
