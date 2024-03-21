/* eslint-disable react/prop-types */

function Container({ className = "", children }) {
  return <div className={`px-5 m-auto max-w-[1200px] w-full ${className}`}>{children}</div>;
}

export default Container;
