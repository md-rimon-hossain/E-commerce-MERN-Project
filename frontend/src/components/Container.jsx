/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React from "react";

function Container({ className = "", children }) {
  return <div className={`md:px-2 container-padding m-auto max-w-[1200px] w-full ${className}`}>{children}</div>;
}

export default Container;
