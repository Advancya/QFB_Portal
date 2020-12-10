import React from "react";

const InvalidFieldError: React.FC<string> = (errorText) => {
  return (
    <div className="input-validation-error">
      <span>{errorText}</span>
    </div>
  );
};

export default InvalidFieldError;
