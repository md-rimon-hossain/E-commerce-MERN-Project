/* eslint-disable react/prop-types */

function Container({ className = "", children }) {
  return <div className={`md:px-2 container-padding m-auto max-w-[1200px] w-full ${className}`}>{children}</div>;
}

export default Container;
