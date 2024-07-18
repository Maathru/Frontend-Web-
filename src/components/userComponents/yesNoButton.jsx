import { useState } from "react";

const YesNoButton = ({ onChange, value }) => {
  const handleCheckboxChange = () => {
    value = !value;
  };

  return (
    <>
      <label className="relative inline-flex cursor-pointer select-none items-center w-fit m-auto">
        <input
          type="checkbox"
          checked={value}
          onChange={() => {
            handleCheckboxChange();
            onChange(value);
          }}
          className="sr-only"
        />
        <div className="shadow-sm shadow-slate-500/40 flex h-12 w-32 items-center justify-center rounded-md">
          <span
            className={`flex h-9 w-14 items-center justify-center rounded ${
              value ? "bg-primary-purple text-white" : "text-body-color"
            }`}
          >
            yes
          </span>
          <span
            className={`flex h-9 w-14 items-center justify-center rounded ${
              !value ? "bg-primary-purple text-white" : "text-body-color"
            }`}
          >
            no
          </span>
        </div>
      </label>
    </>
  );
};

export default YesNoButton;
