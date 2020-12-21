import React from "react";

const NoResult: React.FC<string> = (message: string) => {
  return (
    <div className="noResult">
      <span>{message}</span>
    </div>
  );
};

export default NoResult;
