/* eslint-disable react/prop-types */

import { useSelector } from "react-redux";
import userDefaultImage from "../../assets/user_default_image.jpg"

function UserProfileBtn({  className = "" }) {
 const {  loginUserData } = useSelector((state) => state.auth);
  return (
    <div title="Your Profile" className="flex items-center flex-col">
      <img
        className="inline-block duration-200 hover:outline-dotted h-10 w-10 rounded-full"
        src={userDefaultImage}
        alt="User Profile"
      />
      <span className={`text-sm  font-medium text-gray-900 ${className}`}>
        {loginUserData.name}
      </span>
    </div>
  );
}

export default UserProfileBtn;
