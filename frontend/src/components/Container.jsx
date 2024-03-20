import React from "react";

function Container({ className, children }) {
  return <div className={`px-5 w-full ${className}`}>{children}</div>;
}

export default Container;
