/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function IsAdmin({ children, isAdmin = true, }) {

  const { loginUserData } = useSelector((state) => state.auth);
  
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    //TODO: make it more easy to understand

    // if (authStatus ===true){
    //     navigate("/")
    // } else if (authStatus === false) {
    //     navigate("/login")
    // }

    //let authValue = authStatus === true ? true : false

    // *** love this logic ** 
    if (isAdmin && loginUserData.isAdmin !== isAdmin) {
      navigate("/");
    } else if (!isAdmin && loginUserData.isAdmin !== isAdmin) {
      navigate("/");
    }
    setLoader(false);
  }, [loginUserData.isAdmin, navigate, isAdmin]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}
